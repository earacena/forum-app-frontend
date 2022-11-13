import { Post, PostArray } from '../types';

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/posts`;

interface CreateFields {
  token: string;
  threadId: number;
  content: string;
  isOriginalPost: boolean;
}

interface RemoveFields {
  token: string;
  id: number;
}

interface UpdateFields {
  id: number;
  content: string;
  token: string;
}

const getAll = async () => {
  const response = await fetch(baseUrl);
  const fetchedPosts = PostArray.check(await response.json());
  return fetchedPosts;
};

const create = async ({
  token,
  threadId,
  content,
  isOriginalPost,
}: CreateFields) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ threadId, content, isOriginalPost }),
  });
  const createdThread = Post.check(await response.json());
  return createdThread;
};

const remove = async ({ token, id }: RemoveFields) => {
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const update = async ({ token, id, content }: UpdateFields) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  const updatedPost = Post.check(await response.json());
  return updatedPost;
};

export default {
  getAll,
  create,
  remove,
  update,
};
