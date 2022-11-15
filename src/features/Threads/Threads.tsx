import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Number as RtNumber } from 'runtypes';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ThemeContext } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ThreadForm from './components/ThreadForm/ThreadForm';
import { setThreads } from './stores/thread.slice';
import topicService from '../../services/topicService';
import { setCurrentTopic } from '../Topics';
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
} from './styles/threads.style';
import { notify } from '../Notification';
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
      dispatch(setThreads({ threads: fetchedThreads }));
    };

    fetchThreads();
  }, [dispatch, topicId]);

  useEffect(() => {
    const fetchTopic = async () => {
      const fetchedTopic = await topicService.getTopicById({ id: topicId });
      dispatch(setCurrentTopic({ topic: fetchedTopic }));
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
      await threadService.remove({ token: auth.user?.token, id: threadId });
      if (threads) {
        dispatch(setThreads({ threads: threads.filter((t) => t.id !== threadId) }));
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
      <ThreadForm />
      {threads === undefined && <Spin><AiOutlineLoading3Quarters style={{ color: theme.fg, fontSize: '40px' }} /></Spin>}
      {threads?.length === 0 && <span>There are no topics for discussion.</span>}
      <ThreadListWrapper>
        {threads?.map((thread) => (
          <ThreadRow key={thread.id}>
            <ThreadItemWrapper
              key={thread.id}
              onClick={() => openThread(thread.id)}
              author={auth.user?.id === thread.userId}
            >
              <ThreadTitle>{thread.title}</ThreadTitle>
              <LeftVerticalLine>
                {new Date(thread.dateCreated).toDateString()}
              </LeftVerticalLine>
            </ThreadItemWrapper>
            {auth.user?.id === thread.userId && (
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
