import React from 'react';
import { useAppSelector } from '../../hooks';
import { Posts as PostsType } from '../../types';
import Post from './Post';
import { PostList, PostItem } from './styles/posts.styles';

interface PostsProps {
  posts: PostsType;
  threadAuthorId: number | undefined;
}

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
              isAuthor={auth.user?.id ? auth.user?.id === post.userId : false}
            />
          </PostItem>
        ))}
      </PostList>
    </div>
  );
}

export default Posts;
