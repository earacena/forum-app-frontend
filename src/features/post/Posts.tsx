import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { Posts as PostsType } from '../../types';
import Post from './Post';

interface PostsProps {
  posts: PostsType;
  threadAuthorId: number | undefined;
}

const PostList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  
`;

const PostItem = styled.li`
`;

function Posts({ posts, threadAuthorId }: PostsProps) {
  const auth = useAppSelector((state) => state.auth);

  return (
    <div>
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.id}>
            <Post
              post={post}
              isThreadAuthor={threadAuthorId ? threadAuthorId === post.userId : false}
              isAuthor={auth.id ? auth.id === post.userId : false}
            />
          </PostItem>
        ))}
      </PostList>
    </div>
  );
}

export default Posts;
