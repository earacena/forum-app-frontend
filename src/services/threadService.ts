import { ThreadArray } from '../types';

const baseUrl = 'http://localhost:3001/api/threads';

const getAll = async () => {
  try {
    const response = await fetch(baseUrl);
    const fetchedThreads = ThreadArray.check(await response.json());
    return fetchedThreads;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default {
  getAll,
};
