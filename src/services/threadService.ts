import { Thread, ThreadArray } from '../types';

const baseUrl = 'http://localhost:3001/api/threads';

interface CreateFields {
  token: string;
  title: string;
}

interface RemoveFields {
  id: number;
}

const getAll = async () => {
  const response = await fetch(baseUrl);
  const fetchedThreads = ThreadArray.check(await response.json());
  return fetchedThreads;
};

const create = async ({ token, title }: CreateFields) => {
  if (!token) {
    throw new Error('Cannot perform this action if not signed in');
  }

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (response.status === 400) {
    throw new Error('Bad Request while sending POST request for thread');
  }

  const createdThread = Thread.check(await response.json());
  return createdThread;
};

const remove = async ({ id }: RemoveFields) => {
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
};

export default {
  getAll,
  create,
  remove,
};
