import { Thread, Threads } from '../../../types';

export type ThreadsState = {
  allThreads: Threads | null;
  currentThread: Thread | null;
};

export type ThreadsPayload = {
  threads: Threads,
};

export type ThreadPayload = {
  thread: Thread,
};
