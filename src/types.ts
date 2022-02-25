import {
  Record as RtRecord,
  Number as RtNumber,
  String as RtString,
  Array as RtArray,
  Static as RtStatic,
  Union as RtUnion,
  InstanceOf as RtInstanceOf,
} from 'runtypes';

export const Post = RtRecord({
  id: RtNumber,
  threadId: RtNumber,
  userId: RtNumber,
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

export const Thread = RtRecord({
  id: RtNumber,
  userId: RtNumber,
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
export const ThreadArray = RtArray(Thread);

export type Posts = RtStatic<typeof PostArray>;
export type Threads = RtStatic<typeof ThreadArray>;
export const TokenResponse = RtRecord({
  token: RtString,
  id: RtNumber,
  username: RtString,
  name: RtString,
});

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
