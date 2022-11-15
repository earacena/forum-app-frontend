import { PostArray, ThreadArray, ThreadType } from '../types';

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/threads`;

type CreateProps = {
  token: string | undefined;
  title: string;
  topicId: number;
};

type RemoveProps = {
  token: string | undefined;
  id: number;
};

type ThreadPostsProps = {
  id: number;
};

type GetThreadProps = {
  id: number;
};

const getAll = async () => {
  const response = await fetch(baseUrl);
  const fetchedThreads = ThreadArray.check(await response.json());
  return fetchedThreads;
};

const create = async ({ token, title, topicId }: CreateProps) => {
  if (!token) {
    throw new Error('Cannot perform this action if not signed in');
  }

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, topicId }),
  });

  if (response.status === 400) {
    throw new Error('Bad Request while sending POST request for thread');
  }

  const createdThread = ThreadType.check(await response.json());
  return createdThread;
};

const remove = async ({ token, id }: RemoveProps) => {
  if (!token) {
    throw new Error('Cannot perform this action if not signed in');
  }

  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const getPostsOfThread = async ({ id }: ThreadPostsProps) => {
  if (Number.isNaN(id)) {
    throw new Error('invalid thread id number');
  }
  const response = await fetch(`${baseUrl}/${id}/posts`);
  const posts = PostArray.check(await response.json());
  return posts;
};

const getThread = async ({ id }: GetThreadProps) => {
  if (Number.isNaN(id)) {
    throw new Error('invalid thread number');
  }
  const response = await fetch(`${baseUrl}/${id}`);
  const fetchedThread = ThreadType.check(await response.json());
  return fetchedThread;
};

export default {
  getAll,
  create,
  remove,
  getPostsOfThread,
  getThread,
};
