import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Number as RtNumber } from 'runtypes';
import { BiArrowBack } from 'react-icons/bi';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Posts, PostForm, setPosts } from '../Posts';
import { setCurrentThread } from './stores/thread.slice';
import { setCurrentTopic } from '../Topics';
import threadService from '../../services/threadService';
import topicService from '../../services/topicService';
import { ThreadWrapper } from './styles/threads.style';
import {
  TopOfThread,
  Spacer,
  BackButton,
  ThreadTitle,
} from './styles/thread.style';

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
        dispatch(setCurrentThread({ thread: fetchedThread }));
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
        dispatch(setPosts({ posts: fetchedPosts }));
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
          dispatch(setCurrentTopic({ topic }));
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
