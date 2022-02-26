import React from 'react';
import { Static } from 'runtypes';
import styled from 'styled-components';
import { Post as PostType } from '../../types';

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

interface PostProps {
  post: Static<typeof PostType>;
  isThreadAuthor: boolean;
  isAuthor: boolean;
}

function Post({ post, isThreadAuthor, isAuthor }: PostProps) {
  return (
    <PostWrapper threadAuthor={isThreadAuthor} author={isAuthor}>
      {`${post?.authorName} ${isThreadAuthor ? '[Author]' : ''} on ${new Date(
        post.datePosted,
      ).toDateString()}`}
      <hr />
      {post.content}
    </PostWrapper>
  );
}

export default Post;
