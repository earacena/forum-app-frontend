import { ThreadArray, Topic, TopicArray } from '../types';

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/topics`;

interface TopicIdFields {
  id: number;
}

interface TopicThreadsFields {
  id: number;
}

interface TopicCreateFields {
  token: string;
  title: string;
  description: string;
}

type GetTopicsOfForumProps = {
  forumId: number;
};

const getAll = async () => {
  const response = await fetch(baseUrl);
  const fetchedTopics = TopicArray.check(await response.json());
  return fetchedTopics;
};

const getTopicById = async ({ id }: TopicIdFields) => {
  if (Number.isNaN(id)) {
    throw new Error('invalid topic id number');
  }

  const response = await fetch(`${baseUrl}/${id}`);
  const topic = Topic.check(await response.json());
  return topic;
};

const getThreadsOfTopic = async ({ id }: TopicThreadsFields) => {
  if (Number.isNaN(id)) {
    throw new Error('invalid topic id number');
  }
  const response = await fetch(`${baseUrl}/${id}/threads`);
  const threads = ThreadArray.check(await response.json());
  return threads;
};

const create = async ({ token, title, description }: TopicCreateFields) => {
  if (!token) {
    throw new Error('Cannot perform this action if not signed in');
  }

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  });

  if (response.status === 400) {
    throw new Error('Bad Request while sending POST request for thread');
  }

  const createdThread = Topic.check(await response.json());
  return createdThread;
};

const getTopicsOfForum = async ({ forumId }: GetTopicsOfForumProps) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/forum/${forumId}/topics`);
  const topics = TopicArray.check(await response.json());
  return topics;
};

export default {
  getAll,
  getTopicById,
  getThreadsOfTopic,
  getTopicsOfForum,
  create,
};
