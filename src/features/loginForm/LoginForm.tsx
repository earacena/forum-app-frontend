import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { setAuthenticatedUser } from '../auth/authSlice';
import loginService from '../../services/loginService';
import { notify } from '../notification/Notification';

const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  padding: 1em;
  margin: 1em;
`;

const Input = styled.input`
  padding: 1em;
  margin: 1em;
  border: 1px black solid;
  border-radius: 3px;
`;

interface ButtonProps {
  readonly primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  background: ${(props) => (props.primary ? 'black' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  border-radius: 3px;
  font-size: 1em;
  padding: 1em;
  margin: 1em;
  border: 2px solid black;
  box-shadow: 1px 1px 4px 2px grey;

  &:hover {
    background: ${(props) => (props.primary ? 'darkgrey' : 'grey')};
    color: ${(props) => (props.primary ? 'black' : 'white')};
  }
`;

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleUsernameChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => setUsername(target.value);

  const handlePasswordChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => setPassword(target.value);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const credentials = { username, password };
      const token = await loginService.login(credentials);

      if (token) {
        const message = token.name
          ? `Successfully signed in, welcome ${token.name}`
          : `Successfully signed in, welcome ${token.username}`;

        dispatch(setAuthenticatedUser(token));
        notify('message', message, 4);
      }
    } catch (error) {
      notify('error', 'Incorrect username or password, try again.', 4);
    }
  };

  return (
    <LoginFormWrapper>
      <Input
        placeholder="Username"
        type="text"
        onChange={handleUsernameChange}
        value={username}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={handlePasswordChange}
        value={password}
      />
      <Button primary type="submit" onClick={handleSubmit}>
        Log in
      </Button>
      <Button type="submit" value="Log in">
        Register
      </Button>
    </LoginFormWrapper>
  );
}

export default LoginForm;
