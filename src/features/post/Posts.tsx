import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Posts as PostsType } from '../../types';
import Post from './Post';

interface PostsProps {
  posts: PostsType;
  authorId: number | undefined;
}

const PostList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  
`;

const PostItem = styled.li`
`;

function Posts({ posts, authorId }: PostsProps) {
  return (
    <div>
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.id}>
            <Post
              post={post}
              isAuthor={authorId ? authorId === post.userId : false}
            />
          </PostItem>
        ))}
      </PostList>
    </div>
  );
}

export default Posts;
