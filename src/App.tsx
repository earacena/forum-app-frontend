import React from 'react';
import styled from 'styled-components';
import { removeAuthenticatedUser } from './features/auth/authSlice';
import LoginForm from './features/loginForm/LoginForm';
import Notification, { notify } from './features/notification/Notification';
import ThreadForm from './features/thread/ThreadForm';
import Threads from './features/thread/Threads';
import { useAppDispatch, useAppSelector } from './hooks';

const LogOutButton = styled.button`
  cursor: pointer;
  border-radius: 30px;
  padding: 0.6em;
  color: lightgrey;
  background: black;
  border: 1px black solid;
`;

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(removeAuthenticatedUser());
    notify('message', 'Successfully logged out. Goodbye!', 4);
  };

  const loggedInUser = () => (
    <div>
      {`${auth.name} logged in `}
      <LogOutButton onClick={handleLogOut}>Log Out</LogOutButton>
    </div>
  );

  return (
    <div className="App">
      <h1>Forum App</h1>
      {!auth.token && <LoginForm />}
      {auth.token && loggedInUser()}
      <Notification />
      <ThreadForm />
      <Threads />
    </div>
  );
}

export default App;
