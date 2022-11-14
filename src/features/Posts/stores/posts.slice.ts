import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostsPayload, PostsState } from '../types/posts.types';

const initialState: PostsState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state: PostsState, action: PayloadAction<PostsPayload>) => action.payload.posts,
    resetPosts: () => initialState,
  },
});

export const {
  setPosts,
  resetPosts,
} = postsSlice.actions;

export default postsSlice.reducer;
