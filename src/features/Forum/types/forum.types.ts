import { Forums, Forum } from '../../../types';

export type ForumsState = {
  allForums: Forums | null;
  currentForum: Forum | null;
};

export type ForumPayload = {
  forum: Forum,
};

export type ForumsPayload = {
  forums: Forums,
};
