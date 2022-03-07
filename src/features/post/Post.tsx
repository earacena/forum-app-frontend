import React, { useState } from 'react';
import { Static } from 'runtypes';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import postService from '../../services/postService';
import { Post as PostType } from '../../types';
import { notify } from '../notification/Notification';
import { setPosts } from './posts.slice';
import PostEditForm from './PostEditForm';

interface PostWrapperProps {
  readonly threadAuthor: boolean;
  readonly author: boolean;
}

const PostWrapper = styled.div<PostWrapperProps>`
  border: ${(props) => (props.threadAuthor ? '2px grey dotted' : '')};
  border-radius: 8px;
  padding: 1em;
  margin: 1em auto;
  width: 60vw;
  background: ${(props) => (props.author ? 'papayawhip' : '')};
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
`;

const DeleteButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  padding: 0.4em;
  margin: 0;
  margin-left: 1em;
  color: lightgrey;
  background: black;
  border: none;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
    background: darkred;
    color: pink;
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.17);
    transform: translateY(2px);
  }
`;

const EditButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  padding: 0.4em;
  margin: 0;
  margin-left: 1em;
  color: lightgrey;
  background: black;
  border: none;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
    color: white;
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.17);
    transform: translateY(2px);
  }
`;

interface PostProps {
  post: Static<typeof PostType>;
  isThreadAuthor: boolean;
  isAuthor: boolean;
}

function Post({ post, isThreadAuthor, isAuthor }: PostProps) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);
  const auth = useAppSelector((state) => state.auth);

  const [beingEdited, setBeingEdited] = useState(false);

  const handleDelete = async () => {
    try {
      await postService.remove({ id: post.id, token: auth.token });
      dispatch(setPosts(posts.filter((p) => p.id !== post.id)));
      notify('message', 'Deleted a post', 4);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostWrapper threadAuthor={isThreadAuthor} author={isAuthor}>
      {`${post?.authorName} ${isThreadAuthor ? '[Author]' : ''} on ${new Date(
        post.datePosted,
      ).toDateString()}`}
      { isAuthor
        && !post.isOriginalPost
        && (
          <span>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            <EditButton onClick={() => setBeingEdited(!beingEdited)}>Edit</EditButton>
          </span>
        )}
      <hr />
      {!beingEdited && post.content}
      {beingEdited && (
        <PostEditForm
          postId={post.id}
          postContent={post.content}
          beingEdited={beingEdited}
          setBeingEdited={setBeingEdited}
        />
      )}
    </PostWrapper>
  );
}

export default Post;
