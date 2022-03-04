import { createSlice } from '@reduxjs/toolkit';
import { Static as RtStatic } from 'runtypes';
import { TopicArray, Topic } from '../../types';

interface TopicsState {
  allTopics: RtStatic<typeof TopicArray>,
  currentTopic: RtStatic<typeof Topic> | undefined,
}

const initialState: TopicsState = {
  allTopics: [],
  currentTopic: undefined,
};

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    setTopics: (state, action) => ({ ...state, allTopics: action.payload }),
    setCurrentTopic: (state, action) => ({ ...state, currentTopic: action.payload }),
    resetTopics: (state) => ({ ...state, allTopics: [] }),
    resetCurrentTopic: (state) => ({ ...state, currentTopic: initialState.currentTopic }),
  },
});

export const {
  setTopics,
  setCurrentTopic,
  resetTopics,
  resetCurrentTopic,
} = topicSlice.actions;

export default topicSlice.reducer;
