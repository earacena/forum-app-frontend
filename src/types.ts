import {
  Record as RtRecord,
  Number as RtNumber,
  String as RtString,
  Array as RtArray,
  Static as RtStatic,
  Union as RtUnion,
  InstanceOf as RtInstanceOf,
  Boolean as RtBoolean,
} from 'runtypes';

export const Post = RtRecord({
  id: RtNumber,
  threadId: RtNumber,
  userId: RtNumber,
  isOriginalPost: RtBoolean,
  authorName: RtString,
  content: RtString,
  datePosted: RtUnion(
    RtInstanceOf(Date),
    RtString.withConstraint((x: string) => {
      // Must be parsable into a Date object
      if (!x || x === null || typeof x !== 'string' || Number.isNaN(Date.parse(x))) {
        return false;
      }

      return true;
    }),
  ),
});

export const ThreadType = RtRecord({
  id: RtNumber,
  userId: RtNumber,
  topicId: RtNumber,
  dateCreated: RtString.withConstraint((x: string) => {
    // Must be parsable into a Date object
    if (!x || x === null || typeof x !== 'string' || Number.isNaN(Date.parse(x))) {
      return false;
    }

    return true;
  }),
  title: RtString,
});

export const PostArray = RtArray(Post);
export const ThreadArray = RtArray(ThreadType);

export type Posts = RtStatic<typeof PostArray>;

export type Thread = RtStatic<typeof ThreadType>;
export type Threads = RtStatic<typeof ThreadArray>;

export const UserAuthenticationType = RtRecord({
  token: RtString,
  id: RtNumber,
  username: RtString,
  name: RtString,
  roles: RtArray(
    RtRecord({
      userId: RtNumber,
      forumId: RtNumber,
      role: RtString,
    }),
  ),
});

export type UserAuthentication = RtStatic<typeof UserAuthenticationType>;

export const User = RtRecord({
  id: RtNumber,
  name: RtString,
  username: RtString,
  passwordHash: RtString,
  dateRegistered: RtUnion(
    RtInstanceOf(Date),
    RtString.withConstraint((x: string) => {
      // Must be parsable into a Date object
      if (!x || x === null || typeof x !== 'string' || Number.isNaN(Date.parse(x))) {
        return false;
      }
      return true;
    }),
  ),
});

export const UserArray = RtArray(User);

export const Topic = RtRecord({
  id: RtNumber,
  userId: RtNumber,
  title: RtString,
  description: RtString,
  dateCreated: RtUnion(
    RtInstanceOf(Date),
    RtString.withConstraint((x: string) => {
      // Must be parsable into  date string
      if (!x
        || x === null
        || typeof x !== 'string'
        || Number.isNaN(Date.parse(x))
      ) {
        return false;
      }

      return true;
    }),
  ),
});

export const TopicArray = RtArray(Topic);

export const ForumType = RtRecord({
  id: RtNumber,
  userId: RtNumber,
  title: RtString,
  dateCreated: RtUnion(
    RtInstanceOf(Date),
    RtString.withConstraint((x: string) => {
      // Must be parsable into a Date object
      if (!x || x === null || typeof x !== 'string' || Number.isNaN(Date.parse(x))) {
        return false;
      }
      return true;
    }),
  ),
});

export const ForumArray = RtArray(ForumType);
export type Forum = RtStatic<typeof ForumType>;
export type Forums = RtStatic<typeof ForumArray>;

interface ObjectKeys {
  [key: string]: string | number;
}

export interface TopicItem extends ObjectKeys {
  topicId: number,
  topicTitle: string,
  topicDescription: string,
}
