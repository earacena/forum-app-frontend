import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action) => action.payload,
    removeAuthenticatedUser: () => initialState,
  },
});

export const {
  setAuthenticatedUser,
  removeAuthenticatedUser,
} = authSlice.actions;

export default authSlice.reducer;
