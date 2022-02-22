import React, { useEffect, useState } from 'react';
import postService from '../../services/postService';
import { Posts as PostsType } from '../../types';
import Post from './Post';

interface PostsProps {
  posts: PostsType;
  authorId: number | undefined;
}

function Posts({ posts, authorId }: PostsProps) {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Post post={post} isAuthor={authorId ? authorId === post.userId : false} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
