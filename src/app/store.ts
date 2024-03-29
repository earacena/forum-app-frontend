import { configureStore } from '@reduxjs/toolkit';
import { notificationReducer } from '../features/Notification';
import { authReducer } from '../features/auth';
import { threadsReducer } from '../features/Threads';
import { postsReducer } from '../features/Posts';
import { topicsReducer } from '../features/Topics';
import { forumsReducer } from '../features/Forum';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    topics: topicsReducer,
    threads: threadsReducer,
    posts: postsReducer,
    forums: forumsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
