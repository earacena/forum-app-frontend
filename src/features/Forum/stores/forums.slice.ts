import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ForumPayload, ForumsPayload, ForumsState } from '../types/forum.types';

const initialState: ForumsState = {
  allForums: null,
  currentForum: null,
};

const forumsSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {
    setForums: (state: ForumsState, action: PayloadAction<ForumsPayload>) => ({
      ...state,
      allForums: action.payload.forums,
    }),
    setCurrentForum: (state: ForumsState, action: PayloadAction<ForumPayload>) => ({
      ...state,
      currentForum: action.payload.forum,
    }),
  },
});

export const {
  setForums,
  setCurrentForum,
} = forumsSlice.actions;

export default forumsSlice.reducer;
