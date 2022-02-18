import { Post, PostArray } from '../types';

const baseUrl = 'http://localhost:3001/api/posts';

interface CreateFields {
  content: string;
}

const getAll = async () => {
  const response = await fetch(baseUrl);
  const fetchedPosts = PostArray.check(await response.json());
  return fetchedPosts;
};

const create = async ({ content }: CreateFields) => {
  const response = await fetch(
    baseUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: content,
    },
  );
  const createdThread = Post.check(await response.json());
  return createdThread;
};

export default {
  getAll,
  create,
};
