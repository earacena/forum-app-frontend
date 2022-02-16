import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../features/notification/notificationSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
