import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../features/notification/notificationSlice';
import authReducer from '../features/auth/authSlice';
import threadsReducer from '../features/thread/threadSlice';
import postsReducer from '../features/post/postsSlice';
import topicsReducer from '../features/topic/topic.slice';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    topics: topicsReducer,
    threads: threadsReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
