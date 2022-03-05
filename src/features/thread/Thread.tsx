import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Number as RtNumber } from 'runtypes';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../hooks';
import threadService from '../../services/threadService';
import { setPosts } from '../post/posts.slice';
import Posts from '../post/Posts';
import PostForm from '../post/PostForm';
import topicService from '../../services/topicService';
import { setCurrentTopic } from '../topic/topic.slice';
import { setCurrentThread } from './thread.slice';

const ThreadTitle = styled.h3`
  align-self: center; 
`;

const BackButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  color: lightgrey;
  background: black;
  border: 1px white solid;
  border-radius: 20px;
  padding: 0.6em;
  margin: 0.5em;
`;

const TopOfThread = styled.div`
  display: flex;
  justify-content: space-evenly;
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
    <div>
      <TopOfThread>
        <BackButton onClick={handleBackClick}>Back</BackButton>
        <ThreadTitle>{thread?.title}</ThreadTitle>
        <BackButton style={{ visibility: 'hidden' }}>Back</BackButton>
      </TopOfThread>
      <Posts posts={posts} threadAuthorId={thread?.userId} />
      <PostForm threadId={threadId} />
    </div>
  );
}

export default Thread;
