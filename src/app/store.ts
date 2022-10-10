import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../features/Notification/stores/notification.slice';
import authReducer from '../features/auth/stores/auth.slice';
import threadsReducer from '../features/Threads/thread.slice';
import postsReducer from '../features/Posts/stores/posts.slice';
import topicsReducer from '../features/topic/stores/topic.slice';

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
