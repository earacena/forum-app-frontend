import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';
import { removeAuthenticatedUser, setAuthenticatedUser } from './features/auth/auth.slice';
import LoginForm from './features/loginForm/LoginForm';
import Notification, { notify } from './features/notification/Notification';
import Thread from './features/thread/Thread';
import Threads from './features/thread/Threads';
import Topics from './features/topic/Topics';
import { useAppDispatch, useAppSelector } from './hooks';
import RegisterForm from './features/registerForm/RegisterForm';

const NavButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  padding: 0.6em;
  margin-left: 0.1em;
  color: lightgrey;
  background: black;
  border: 1px black solid;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
  }
  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.1);
    transform: translateY(2px);
  }
`;

const AppHeader = styled.h1`
  text-align: center;
`;

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  // Check if user session already exists
  useEffect(() => {
    const forumAppUserJSON = window.localStorage.getItem('forumAppUser');
    if (forumAppUserJSON) {
      const forumAppUser = JSON.parse(forumAppUserJSON);
      dispatch(setAuthenticatedUser(forumAppUser));
    }
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(removeAuthenticatedUser());
    window.localStorage.removeItem('forumAppUser');
    notify('message', 'Successfully logged out. Goodbye!', 4);
  };

  return (
    <div className="App">
      <AppHeader>Forum App</AppHeader>
      <nav style={{ margin: '1em' }}>
        <Link to="/">
          <NavButton>Topics</NavButton>
        </Link>
        {!auth.token && (
          <Link to="/login">
            <NavButton>Log In</NavButton>
          </Link>
        )}
        {!auth.token && (
          <Link to="/register">
            <NavButton>Register</NavButton>
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
        <Route path="/" element={<Topics />} />
        <Route path="/topic/:id" element={<Threads />} />
        <Route path="/thread/:id" element={<Thread />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
