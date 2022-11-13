import { User, UserArray } from '../types';

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users`;

interface GetUserByIdFields {
  id: number;
}

interface CreateUserFields {
  name: string;
  username: string;
  password: string;
}

const getAll = async () => {
  const response = await fetch(`${baseUrl}/`);
  const users = UserArray.check(await response.json());
  return users;
};

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
  getAll,
  getUserById,
  create,
};
