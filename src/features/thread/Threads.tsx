import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Number as RtNumber } from 'runtypes';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ThemeContext } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ThreadForm from './ThreadForm';
import { setThreads } from './thread.slice';
import topicService from '../../services/topicService';
import { setCurrentTopic } from '../topic/topic.slice';
import {
  ThreadsDiv,
  ThreadListWrapper,
  ThreadsTitle,
  ThreadsDescription,
  ThreadItemWrapper,
  ThreadTitle,
  LeftVerticalLine,
  DeleteThreadButton,
  ThreadRow,
} from './threads.style';
import { notify } from '../notification/Notification';
import threadService from '../../services/threadService';
import { Spin } from '../../components';

function Threads() {
  const dispatch = useAppDispatch();
  const threads = useAppSelector((state) => state.threads.allThreads);
  const topic = useAppSelector((state) => state.topics.currentTopic);
  const theme = useContext(ThemeContext);
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const topicId = RtNumber.check(Number(id));

  useEffect(() => {
    const fetchThreads = async () => {
      const fetchedThreads = await topicService.getThreadsOfTopic({
        id: topicId,
      });
      dispatch(setThreads(fetchedThreads));
    };

    fetchThreads();
  }, [dispatch, topicId]);

  useEffect(() => {
    const fetchTopic = async () => {
      const fetchedTopic = await topicService.getTopicById({ id: topicId });
      dispatch(setCurrentTopic(fetchedTopic));
    };

    if (!topic) {
      fetchTopic();
    }
  }, [dispatch, topicId, topic]);

  const openThread = (threadId: number) => {
    navigate(`/thread/${threadId}`);
  };

  const handleDelete = async (threadId: number) => {
    try {
      await threadService.remove({ token: auth.token, id: threadId });
      if (threads) {
        dispatch(setThreads(threads.filter((t) => t.id !== threadId)));
        notify('message', 'Deleted a thread.', 4);
      }
    } catch (error: unknown) {
      notify('error', 'Error while deleting thread.', 4);
    }
  };

  return (
    <ThreadsDiv>
      <ThreadsTitle>{topic?.title}</ThreadsTitle>
      <ThreadsDescription>{topic?.description}</ThreadsDescription>
      {threads === undefined && <Spin><AiOutlineLoading3Quarters style={{ color: theme.fg, fontSize: '40px' }} /></Spin>}
      {threads?.length === 0 && <span>There are no topics for discussion.</span>}
      <ThreadForm />
      <ThreadListWrapper>
        {threads?.map((thread) => (
          <ThreadRow key={thread.id}>
            <ThreadItemWrapper
              key={thread.id}
              onClick={() => openThread(thread.id)}
              author={auth.id === thread.userId}
            >
              <ThreadTitle>{thread.title}</ThreadTitle>
              <LeftVerticalLine>
                {new Date(thread.dateCreated).toDateString()}
              </LeftVerticalLine>
            </ThreadItemWrapper>
            {auth.id === thread.userId && (
              <DeleteThreadButton
                onClick={() => handleDelete(thread.id)}
              >
                Delete
              </DeleteThreadButton>
            )}
          </ThreadRow>
        ))}
      </ThreadListWrapper>
    </ThreadsDiv>
  );
}

export default Threads;
