import { createSlice } from '@reduxjs/toolkit';

const initialState: UserAuthentication = {
  token: '',
  username: '',
  name: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action) => action.payload,
    removeAuthenticatedUser: () => initialState,
  },
});

export interface UserAuthentication {
  token: string;
  username: string;
  name: string;
}

export const {
  setAuthenticatedUser,
  removeAuthenticatedUser,
} = authSlice.actions;
export default authSlice.reducer;
