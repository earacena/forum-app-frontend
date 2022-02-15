import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../hooks';
import { setNotificationMessage } from '../reducers/notificationReducer';

const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  padding: 1em;
`;

const Input = styled.input`
  padding: 1em;
  margin: 1em;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

interface ButtonProps {
  readonly primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  background: ${(props) => (props.primary ? 'black' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  border-radius: 3px;
  font-size: 1em;
  padding: 1em;
  margin: 1em;
  border: 2px solid black;

  &:hover {
    background: ${(props) => ((props.primary) ? 'darkgrey' : 'grey')};
    color: ${(props) => ((props.primary) ? 'black' : 'white')};
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

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    dispatch(setNotificationMessage({
      type: 'message',
      message: `Sent credentials: ${JSON.stringify({ username, password })}`,
    }));
  };

  return (
    <LoginFormWrapper>
      <Input
        placeholder="Enter Username"
        type="text"
        onChange={handleUsernameChange}
      />
      <Input
        placeholder="Enter Password"
        type="password"
        onChange={handlePasswordChange}
      />
      <Button primary type="submit" onClick={handleSubmit}>Log in</Button>
      <Button type="submit" value="Log in">Register</Button>
    </LoginFormWrapper>
  );
}

export default LoginForm;
