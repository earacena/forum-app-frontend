import { isMissingDeclaration } from 'typescript';
import { Post, PostArray } from '../types';

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/posts`;

type CreateProps = {
  token: string | undefined;
  threadId: number;
  content: string;
  isOriginalPost: boolean;
};

type RemoveProps = {
  token: string | undefined;
  id: number;
};

type UpdateProps = {
  id: number;
  content: string;
  token: string | undefined;
};

const getAll = async () => {
  const response = await fetch(baseUrl);
  const fetchedPosts = PostArray.check(await response.json());
  return fetchedPosts;
};

const create = async ({
  token,
  threadId,
  content,
  isOriginalPost,
}: CreateProps) => {
  if (!token) {
    throw new Error('postService.create() - token missing');
  }

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ threadId, content, isOriginalPost }),
  });
  const createdThread = Post.check(await response.json());
  return createdThread;
};

const remove = async ({ token, id }: RemoveProps) => {
  if (!token) {
    throw new Error('postService.remove() - token missing');
  }

  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const update = async ({ token, id, content }: UpdateProps) => {
  if (!token) {
    throw new Error('postService.update() - token missing');
  }

  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  const updatedPost = Post.check(await response.json());
  return updatedPost;
};

export default {
  getAll,
  create,
  remove,
  update,
};
