import { Post, PostArray } from '../types';

const baseUrl = 'http://localhost:3001/api/posts';

interface CreateFields {
  threadId: number;
  content: string;
}

interface RemoveFields {
  id: number;
}

interface UpdateFields {
  id: string;
  content: string;
}

const getAll = async () => {
  const response = await fetch(baseUrl);
  const fetchedPosts = PostArray.check(await response.json());
  return fetchedPosts;
};

const create = async ({ threadId, content }: CreateFields) => {
  const response = await fetch(
    baseUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threadId, content }),
    },
  );
  const createdThread = Post.check(await response.json());
  return createdThread;
};

const remove = async ({ id }: RemoveFields) => {
  await fetch(
    `${baseUrl}/${id}`,
    {
      method: 'DELETE',
    },
  );
};

const update = async ({ id, content }: UpdateFields) => {
  const response = await fetch(
    `${baseUrl}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: content,
    },
  );

  const updatedPost = Post.check(await response.json());
  return updatedPost;
};

export default {
  getAll,
  create,
  remove,
  update,
};
