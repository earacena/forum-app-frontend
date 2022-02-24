import React from 'react';
import { Static } from 'runtypes';
import styled from 'styled-components';
import { Post as PostType } from '../../types';

const PostWrapper = styled.div`
  border: 1px red solid;
  border-radius: 8px;
  padding: 1em;
  margin: 0 auto;
  width: 60vw;
`;

interface PostProps {
  post: Static<typeof PostType>;
  isAuthor: boolean;
}

function Post({ post, isAuthor }: PostProps) {
  return (
    <PostWrapper>
      {`${post?.authorName} ${isAuthor ? '[Author]' : ''} on ${new Date(
        post.datePosted,
      ).toDateString()}`}
      <hr />
      {post.content}
    </PostWrapper>
  );
}

export default Post;
