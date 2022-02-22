import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Number as RtNumber } from 'runtypes';
import { useAppSelector, useAppDispatch } from '../../hooks';
import threadService from '../../services/threadService';
import { setPosts } from '../post/postsSlice';

function Thread() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await threadService.getPostsOfThread(
          { id: RtNumber.check(Number(id)) },
        );
        dispatch(setPosts(fetchedPosts));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [id, dispatch]);

  return (
    <div>
      This will be a page for thread with id
      {` ${id}`}
      {posts.map((post) => <p key={post.id}>{`${post.content} * ${post.datePosted}`}</p>)}
    </div>
  );
}

export default Thread;
