import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { setAuthenticatedUser } from './features/auth/auth.slice';
import LoginForm from './features/loginForm/LoginForm';
import Notification from './features/notification/Notification';
import Thread from './features/thread/Thread';
import Threads from './features/thread/Threads';
import Topics from './features/topic/Topics';
import { useAppDispatch } from './hooks';
import RegisterForm from './features/registerForm/RegisterForm';
import NavBar from './components/NavBar';
import AdminPanel from './features/adminPanel/AdminPanel';

const AppHeader = styled.h1`
  text-align: center;
`;

function App() {
  const dispatch = useAppDispatch();

  // Check if user session already exists
  useEffect(() => {
    const forumAppUserJSON = window.localStorage.getItem('forumAppUser');
    if (forumAppUserJSON) {
      const forumAppUser = JSON.parse(forumAppUserJSON);
      dispatch(setAuthenticatedUser(forumAppUser));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader>Forum App</AppHeader>
      <NavBar />
      <Notification />

      <Routes>
        <Route path="/" element={<Topics />} />
        <Route path="/topic/:id" element={<Threads />} />
        <Route path="/thread/:id" element={<Thread />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
