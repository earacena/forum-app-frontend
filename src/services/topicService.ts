import { ThreadArray, Topic, TopicArray } from '../types';

const baseUrl = 'http://localhost:3001/api/topics';

interface TopicIdFields {
  id: number;
}

interface TopicThreadsFields {
  id: number;
}

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

export default {
  getAll,
  getTopicById,
  getThreadsOfTopic,
};
