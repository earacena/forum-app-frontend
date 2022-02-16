import { TokenResponse } from '../types';

const baseUrl = 'http://localhost:3001/api/login';

interface Credentials {
  username: string;
  password: string;
}

const login = async (credentials: Credentials) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  console.log(response);
  const responseJson = await response.json();
  if (responseJson.error) {
    throw new Error(`${responseJson.error}`);
  } else {
    const tokenResponse = TokenResponse.check(responseJson);
    return tokenResponse;
  }
};

export default {
  login,
};
