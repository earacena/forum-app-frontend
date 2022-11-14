import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThreadsState, ThreadPayload, ThreadsPayload } from '../types/thread.types';

const initialState: ThreadsState = {
  allThreads: null,
  currentThread: null,
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads: (state: ThreadsState, action: PayloadAction<ThreadsPayload>) => ({
      ...state,
      allThreads: action.payload.threads,
    }),
    setCurrentThread: (state: ThreadsState, action: PayloadAction<ThreadPayload>) => ({
      ...state,
      currentThread: action.payload.thread,
    }),
    resetThreads: (state: ThreadsState) => ({
      ...state,
      allThreads: initialState.allThreads,
    }),
    resetCurrentThread: (state: ThreadsState) => ({
      ...state,
      currentThread: initialState.currentThread,
    }),
  },
});

export const {
  setThreads,
  setCurrentThread,
  resetThreads,
  resetCurrentThread,
} = threadsSlice.actions;

export default threadsSlice.reducer;
