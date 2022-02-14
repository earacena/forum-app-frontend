import React from 'react';
import styled from 'styled-components';

const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  color: white;
  background: white;
  border: 1px black solid;
  border-radius: 3px;
  justify-content: center;
  margin: 1em 5em 2em 5em;
  padding: 1em;
`;

const Input = styled.input`
  padding: 1em;
  margin: 1em 6em 1em 6em;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

interface ButtonProps {
  readonly primary: boolean;
}

const Button = styled.button<ButtonProps>`
  background: ${(props) => (props.primary ? 'black' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  border-radius: 3px;
  font-size: 1em;
  padding: 1em;
  margin: 1em 10em 0.5em 10em;
  border: 2px solid black;
`;

function LoginForm() {
  return (
    <LoginFormWrapper>
      <Input placeholder="Enter Username" type="text" />
      <Input placeholder="Enter Password" type="password" />
      <Button primary>Login</Button>
      <Button primary={false}>Register</Button>
    </LoginFormWrapper>
  );
}

export default LoginForm;
