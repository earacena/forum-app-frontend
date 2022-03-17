import { createSlice } from '@reduxjs/toolkit';

const initialState: UserAuthentication = {
  id: 0,
  token: '',
  username: '',
  name: '',
  role: '',
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
  id: number;
  token: string;
  username: string;
  name: string;
  role: string;
}

export const {
  setAuthenticatedUser,
  removeAuthenticatedUser,
} = authSlice.actions;
export default authSlice.reducer;
