import { createSlice } from '@reduxjs/toolkit';
import { Forums, Forum } from '../../../types';

type ForumsState = {
  allForums: Forums | undefined;
  currentForum: Forum | undefined;
};

const initialState: ForumsState = {
  allForums: undefined,
  currentForum: undefined,
};

const forumsSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {
    setForums: (state, action) => ({ ...state, allForums: action.payload.forums }),
    setCurrentForum: (state, action) => action.payload.forum,
  },
});

export const {
  setForums,
  setCurrentForum,
} = forumsSlice.actions;

export default forumsSlice.reducer;
