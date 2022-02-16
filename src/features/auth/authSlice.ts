import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticatedUser(state, action) {
      return action.payload;
    },
    removeAuthenticatedUser() {
      return initialState;
    },
  },
});

export const {
  setAuthenticatedUser,
  removeAuthenticatedUser,
} = authSlice.actions;

export default authSlice.reducer;
