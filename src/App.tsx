import React, { useEffect, useState } from 'react';
import * as RT from 'runtypes';

const Post = RT.Record({
  id: RT.Number,
  threadId: RT.Number,
  userId: RT.Number,
  content: RT.String,
  datePosted: RT.String,
});
const Posts = RT.Array(Post);

const Thread = RT.Record({
  id: RT.Number,
  userId: RT.Number,
  dateCreated: RT.String,
  title: RT.String,
});
const Threads = RT.Array(Thread);

function App() {
  const [posts, setPosts] = useState<RT.Static<typeof Posts>>([]);
  const [threads, setThreads] = useState<RT.Static<typeof Threads>>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3001/api/posts');
      const fetchedPosts = Posts.check(await response.json());
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchThreads = async () => {
      const response = await fetch('http://localhost:3001/api/threads');
      const fetchedThreads = Threads.check(await response.json());
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
