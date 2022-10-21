import { ForumType, ForumArray } from '../types';
import type { TopicItem } from '../types';

const baseUrl = 'http://localhost:3001/api/forums';

type ForumCreateProps = {
  token: string,
  forumTitle: string,
  forumTopics: TopicItem[],
};

const getAll = async () => {
  const response = await fetch(baseUrl);
  const fetchedForums = ForumArray.check(await response.json());

  return fetchedForums;
};

const create = async ({ token, forumTitle, forumTopics }: ForumCreateProps) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ forumTitle, forumTopics }),
  });
  const createdForum = ForumType.check(await response.json());
  return createdForum;
};

export default { create, getAll };
