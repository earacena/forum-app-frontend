import { TokenResponse } from '../types';

const baseUrl = 'http://localhost:3001/api/login';

interface Credentials {
  username: string;
  password: string;
}

interface LoginFields {
  credentials: Credentials;
}

const login = async ({ credentials }: LoginFields) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const tokenResponse = TokenResponse.check(await response.json());
    return tokenResponse;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default {
  login,
};
