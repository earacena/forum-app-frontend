import { User } from '../types';

const baseUrl = 'http://localhost:3001/api/users';

interface GetUserByIdFields {
  id: number;
}

const getUserById = async ({ id }: GetUserByIdFields) => {
  const response = await fetch(`${baseUrl}/${id}`);
  const user = User.check(await response.json());
  return user;
};

export default {
  getUserById,
};
