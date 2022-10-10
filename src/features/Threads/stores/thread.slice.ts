import { createSlice } from '@reduxjs/toolkit';
import { Static as RtStatic } from 'runtypes';
import { Thread, ThreadArray, Threads } from '../../../types';

interface ThreadsState {
  allThreads: RtStatic<typeof ThreadArray> | undefined;
  currentThread: RtStatic<typeof Thread> | undefined;
}

const initialState: ThreadsState = {
  allThreads: undefined,
  currentThread: undefined,
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads: (state, action) => ({ ...state, allThreads: action.payload }),
    setCurrentThread: (state, action) => ({ ...state, currentThread: action.payload }),
    resetThreads: (state) => ({ ...state, allThreads: initialState.allThreads }),
    resetCurrentThread: (state) => ({ ...state, currentThread: initialState.currentThread }),
  },
});

export const {
  setThreads,
  setCurrentThread,
  resetThreads,
  resetCurrentThread,
} = threadsSlice.actions;

export default threadsSlice.reducer;
