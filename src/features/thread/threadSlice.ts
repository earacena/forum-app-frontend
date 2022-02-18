import { createSlice } from '@reduxjs/toolkit';
import { Threads } from '../../types';

const initialState: Threads = [];

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads: (state, action) => action.payload,
    resetThreads: () => initialState,
  },
});

export const {
  setThreads,
  resetThreads,
} = threadsSlice.actions;

export default threadsSlice.reducer;
