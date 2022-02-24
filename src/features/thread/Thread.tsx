import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Number as RtNumber, Static } from 'runtypes';
import styled from 'styled-components';
import { Thread as ThreadType } from '../../types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import threadService from '../../services/threadService';
import { setPosts } from '../post/postsSlice';
import Posts from '../post/Posts';
import PostForm from '../post/PostForm';

const ThreadTitle = styled.h3`
  text-align: center;
`;

function Thread() {
  const dispatch = useAppDispatch();
  const [thread, setThread] = useState<Static<typeof ThreadType>>();
  const posts = useAppSelector((state) => state.posts);

  const { id } = useParams();
  const threadId = RtNumber.check(Number(id));

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const fetchedThread = await threadService.getThread({
          id: threadId,
        });
        setThread(fetchedThread);
      } catch (error) {
        console.log(error);
      }
    };

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

    fetchThread();
    fetchPosts();
  }, [threadId, dispatch]);

  return (
    <div>
      <ThreadTitle>{thread?.title}</ThreadTitle>
      <Posts posts={posts} authorId={thread?.userId} />
      <PostForm threadId={threadId} />
    </div>
  );
}

export default Thread;
