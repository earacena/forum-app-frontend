import { Thread, ThreadArray } from '../types';

const baseUrl = 'http://localhost:3001/api/threads';

interface CreateFields {
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

const create = async ({ title }: CreateFields) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: title,
  });
  const createdThread = Thread.check(await response.json());
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

export default {
  getAll,
  create,
  remove,
};
