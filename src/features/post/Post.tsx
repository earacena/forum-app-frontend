import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Static } from 'runtypes';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import postService from '../../services/postService';
import { Post as PostType } from '../../types';
import { setPosts } from './posts.slice';

interface PostWrapperProps {
  readonly threadAuthor: boolean;
  readonly author: boolean;
}

const PostWrapper = styled.div<PostWrapperProps>`
  border: ${(props) => (props.threadAuthor ? '3px grey dotted' : '')};
  border-radius: 8px;
  padding: 1em;
  margin: 0 auto;
  width: 60vw;
  background: ${(props) => (props.author ? 'papayawhip' : '')};
`;

const DeleteButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  padding: 0.3em;
  margin: 0;
  margin-left: 1em;
  color: lightgrey;
  background: black;
  border: 1px black solid;

  &:hover {
    background: darkred;
    color: pink;
  }
`;

interface PostProps {
  post: Static<typeof PostType>;
  isThreadAuthor: boolean;
  isAuthor: boolean;
}

function Post({ post, isThreadAuthor, isAuthor }: PostProps) {
  const posts = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleDelete = async () => {
    try {
      await postService.remove({ id: post.id, token: auth.token });
      dispatch(setPosts(posts.filter((p) => p.id !== post.id)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostWrapper threadAuthor={isThreadAuthor} author={isAuthor}>
      {`${post?.authorName} ${isThreadAuthor ? '[Author]' : ''} on ${new Date(
        post.datePosted,
      ).toDateString()}`}
      {isAuthor && (<DeleteButton onClick={handleDelete}>Delete</DeleteButton>)}
      <hr />
      {post.content}
    </PostWrapper>
  );
}

export default Post;
