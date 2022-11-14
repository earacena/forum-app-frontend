import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthenticatedUserPayload,
  UserState,
} from '../types/auth.types';

const initialState: UserState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticatedUser: (state: UserState, action: PayloadAction<AuthenticatedUserPayload>) => ({
      ...state,
      user: action.payload.user,
    }),
    removeAuthenticatedUser: () => initialState,
  },
});

export const {
  setAuthenticatedUser,
  removeAuthenticatedUser,
} = authSlice.actions;

export default authSlice.reducer;
