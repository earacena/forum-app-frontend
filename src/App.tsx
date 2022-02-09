import React, { useEffect, useState } from 'react';
import {
  PostArray,
  Posts,
  ThreadArray,
  Threads,
} from './types';

function App() {
  const [posts, setPosts] = useState<Posts>([]);
  const [threads, setThreads] = useState<Threads>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3001/api/posts');
      const fetchedPosts = PostArray.check(await response.json());
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchThreads = async () => {
      const response = await fetch('http://localhost:3001/api/threads');
      const fetchedThreads = ThreadArray.check(await response.json());
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
