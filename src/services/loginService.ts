import { UserAuthenticationType } from '../types';

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/login`;

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
  const responseJson = await response.json();
  if (responseJson.error) {
    throw new Error(`${responseJson.error}`);
  } else {
    const userAuthResponse = UserAuthenticationType.check(responseJson);
    return userAuthResponse;
  }
};

export default {
  login,
};
