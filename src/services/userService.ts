import { User } from '../types';

const baseUrl = 'http://localhost:3001/api/users';

interface GetUserByIdFields {
  id: number;
}

interface CreateUserFields {
  name: string;
  username: string;
  password: string;
}

const getUserById = async ({ id }: GetUserByIdFields) => {
  const response = await fetch(`${baseUrl}/${id}`);
  const user = User.check(await response.json());
  return user;
};

const create = async ({ name, username, password }: CreateUserFields) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, username, password }),
  });
  const user = User.check(await response.json());
  return user;
};

export default {
  getUserById,
  create,
};
