import React from 'react';
import styled from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';
import { removeAuthenticatedUser } from './features/auth/authSlice';
import LoginForm from './features/loginForm/LoginForm';
import Notification, { notify } from './features/notification/Notification';
import Thread from './features/thread/Thread';
import Threads from './features/thread/Threads';
import { useAppDispatch, useAppSelector } from './hooks';

const NavButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  padding: 0.6em;
  margin-left: 0.1em;
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

  return (
    <div className="App">
      <h1>Forum App</h1>
      <nav>
        <Link to="/">
          <NavButton>Threads</NavButton>
        </Link>
        {!auth.token && (
          <Link to="/login">
            <NavButton>Log In</NavButton>
          </Link>
        )}
        {auth.token && (
          <span>
            {` ${auth.name} `}
            <NavButton onClick={handleLogOut}>Log Out</NavButton>
          </span>
        )}
      </nav>
      <Notification />

      <Routes>
        <Route path="/" element={<Threads />} />
        <Route path="/thread/:id" element={<Thread />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
