import { Topic, Topics } from '../../../types';

export type TopicsState = {
  allTopics: Topics | null,
  currentTopic: Topic | null,
};

export type TopicPayload = {
  topic: Topic;
};

export type TopicsPayload = {
  topics: Topics;
};
