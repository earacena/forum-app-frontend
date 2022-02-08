import React, { useEffect, useState } from 'react';
// import { Post } from './types';
import RT, { Static } from 'runtypes';

const Post = RT.Record({
  id: RT.Number,
  threadId: RT.Number,
  userId: RT.Number,
  content: RT.String,
  datePosted: RT.InstanceOf(Date),
});

const Posts = RT.Array(Post);

type Posts = Static<typeof Posts>;

function App() {
  const [posts, setPosts] = useState<Posts>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3001/api/posts');
      const fetchedPosts = Posts.check(await response.json());
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1>Forum App</h1>
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
