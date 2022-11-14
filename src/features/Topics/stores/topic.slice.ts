import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TopicsState, TopicsPayload, TopicPayload } from '../types/topics.types';

const initialState: TopicsState = {
  allTopics: null,
  currentTopic: null,
};

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    setTopics: (state: TopicsState, action: PayloadAction<TopicsPayload>) => ({
      ...state,
      allTopics: action.payload.topics,
    }),
    setCurrentTopic: (state: TopicsState, action: PayloadAction<TopicPayload>) => ({
      ...state,
      currentTopic: action.payload.topic,
    }),
    resetTopics: (state: TopicsState) => ({ ...state, allTopics: [] }),
    resetCurrentTopic: (state: TopicsState) => ({
      ...state,
      currentTopic: initialState.currentTopic,
    }),
  },
});

export const {
  setTopics, setCurrentTopic, resetTopics, resetCurrentTopic,
} = topicSlice.actions;

export default topicSlice.reducer;
