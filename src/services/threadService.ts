import { ThreadArray } from '../types';

const baseUrl = 'http://localhost:3001/api/threads';

const getAll = async () => {
  const response = await fetch(baseUrl);
  const fetchedThreads = ThreadArray.check(await response.json());
  return fetchedThreads;
};

export default {
  getAll,
};
