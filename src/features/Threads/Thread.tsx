import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Number as RtNumber } from 'runtypes';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Posts, PostForm, setPosts } from '../Posts';
import { setCurrentThread } from './stores/thread.slice';
import { setCurrentTopic } from '../topic';
import threadService from '../../services/threadService';
import topicService from '../../services/topicService';
import { ThreadWrapper } from './styles/threads.style';

const ThreadTitle = styled.h3`
  color: ${(props) => props.theme.fg};
  font-weight: 400;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  color: ${(props) => props.theme.button.fg};
  background: ${(props) => props.theme.button.bg};
  border: 1px black solid;
  border-radius: 20px;
  padding: 12px;
  margin: 0.5em;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);
  font-size: 20px;

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
    border: 1px solid ${(props) => props.theme.colorAccent};
  }
  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.1);
    transform: translateY(2px);
  }
`;

const TopOfThread = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Spacer = styled.span`
  flex: 1;
`;

function Thread() {
  const dispatch = useAppDispatch();
  const thread = useAppSelector((state) => state.threads.currentThread);
  const posts = useAppSelector((state) => state.posts);
  const currentTopic = useAppSelector((state) => state.topics.currentTopic);
  const navigate = useNavigate();
  const { id } = useParams();
  const threadId = RtNumber.check(Number(id));

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const fetchedThread = await threadService.getThread({
          id: threadId,
        });
        dispatch(setCurrentThread(fetchedThread));
      } catch (error) {
        console.log(error);
      }
    };
    fetchThread();
  }, [dispatch, threadId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await threadService.getPostsOfThread({
          id: threadId,
        });
        dispatch(setPosts(fetchedPosts));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [threadId, dispatch]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        if (thread?.topicId) {
          const topic = await topicService.getTopicById({ id: thread?.topicId });
          dispatch(setCurrentTopic(topic));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!currentTopic) {
      fetchTopic();
    }
  }, [currentTopic, thread?.topicId, dispatch]);

  const handleBackClick = () => {
    if (!currentTopic) {
      return;
    }
    navigate(`/topic/${currentTopic.id}`);
  };

  return (
    <ThreadWrapper>
      <TopOfThread>
        <Spacer>
          <BackButton onClick={handleBackClick}>
            <BiArrowBack />
          </BackButton>
        </Spacer>
        <ThreadTitle>{thread?.title}</ThreadTitle>
        <Spacer />
      </TopOfThread>
      <Posts posts={posts} threadAuthorId={thread?.userId} />
      <PostForm threadId={threadId} />
    </ThreadWrapper>
  );
}

export default Thread;
