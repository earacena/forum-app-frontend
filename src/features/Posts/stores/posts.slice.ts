import { createSlice } from '@reduxjs/toolkit';
import { Posts } from '../../../types';

const initialState: Posts = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => action.payload,
    resetPosts: () => initialState,
  },
});

export const {
  setPosts,
  resetPosts,
} = postsSlice.actions;

export default postsSlice.reducer;
