import React, { useEffect, useState } from 'react';
import postService from './services/postService';
import threadService from './services/threadService';
import { Posts, Threads } from './types';

function App() {
  const [posts, setPosts] = useState<Posts>([]);
  const [threads, setThreads] = useState<Threads>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await postService.getAll();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchThreads = async () => {
      const fetchedThreads = await threadService.getAll();
      setThreads(fetchedThreads);
    };

    fetchThreads();
  }, []);

  return (
    <div className="App">
      <h1>Forum App</h1>
      <h3>threads</h3>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>{thread.title}</li>
        ))}
      </ul>
      <h3>posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
