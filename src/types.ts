export {};

// Common aliases
type Id = number;
type ThreadId = Id;
type UserId = Id;
type PostId = Id;

// Post aliases
type PostContent = string;
type DatePosted = Date;

// Thread aliases
type ThreadTitle = string;
type DateCreated = Date;

// User aliases
type Username = string;
type Name = string;
type DateRegistered = Date;
type PasswordHash = string;

// Object types
interface Post {
  id: PostId;
  threadId: ThreadId;
  userId: UserId;
  content: PostContent;
}

interface Thread {
  id: ThreadId;
  userId: UserId;
  dateCreated: DateCreated;
  title: ThreadTitle;
}

interface User {
  id: UserId;
  username: Username;
  name: Name;
  dateRegistered: DateRegistered;
  passwordHash: PasswordHash;
}