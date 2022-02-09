import { PostArray } from '../types';

const baseUrl = 'http://localhost:3001/api/posts';

const getAll = async () => {
  try {
    const response = await fetch(baseUrl);
    const fetchedPosts = PostArray.check(await response.json());
    return fetchedPosts;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default {
  getAll,
};
