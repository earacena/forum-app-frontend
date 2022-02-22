import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Number as RtNumber, Static } from 'runtypes';
import { Thread as ThreadType } from '../../types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import threadService from '../../services/threadService';
import { setPosts } from '../post/postsSlice';
import Posts from '../post/Posts';

function Thread() {
  const dispatch = useAppDispatch();
  const [thread, setThread] = useState<Static<typeof ThreadType>>();
  const posts = useAppSelector((state) => state.posts);
  const { id } = useParams();

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const fetchedThread = await threadService.getThread({
          id: RtNumber.check(Number(id)),
        });
        setThread(fetchedThread);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPosts = async () => {
      try {
        const fetchedPosts = await threadService.getPostsOfThread({
          id: RtNumber.check(Number(id)),
        });
        dispatch(setPosts(fetchedPosts));
      } catch (error) {
        console.log(error);
      }
    };

    fetchThread();
    fetchPosts();
  }, [id, dispatch]);

  return (
    <div>
      <h3>{thread?.title}</h3>
      <Posts posts={posts} authorId={thread?.userId} />
    </div>
  );
}

export default Thread;
