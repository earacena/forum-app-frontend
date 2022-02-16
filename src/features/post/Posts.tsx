import React, { useEffect, useState } from 'react';
import postService from '../../services/postService';
import { Posts as PostsType } from '../../types';

function Posts() {
  const [posts, setPosts] = useState<PostsType>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await postService.getAll();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h3>Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
