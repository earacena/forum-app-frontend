import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../features/notification/notificationSlice';
import authReducer from '../features/auth/authSlice';
import threadsReducer from '../features/thread/threadSlice';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    threads: threadsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
