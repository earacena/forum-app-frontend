import { TopicItem } from '../features/ForumBuilder';
import { Forum as ForumType } from '../types';

const baseUrl = 'http://localhost:3001/api/forum';

type ForumCreateProps = {
  token: string,
  forumTitle: string,
  forumTopics: TopicItem[],
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

export default { create };
