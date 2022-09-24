import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
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

type ThemeProps = {
  light: {
    fg: string,
    bg: string,
  },
  dark: {
    fg: string,
    bg: string
  },
};

const AppHeader = styled.h1`
  text-align: center;
  margin: 0;
`;

function App() {
  const dispatch = useAppDispatch();
  const [themeMode, setThemeMode] = useState<string>('');

  const themes: ThemeProps = {
    light: {
      fg: 'black',
      bg: 'white',
    },
    dark: {
      fg: 'white',
      bg: 'black',
    },
  };

  // Set the App wide background color
  useEffect(() => {
    document.body.style.backgroundColor = themeMode === 'light' ? themes.light.bg : themes.dark.bg;
  }, [themeMode, themes.dark.bg, themes.light.bg]);

  // Check if user session already exists
  useEffect(() => {
    const forumAppUserJSON = window.localStorage.getItem('forumAppUser');
    if (forumAppUserJSON) {
      const forumAppUser = JSON.parse(forumAppUserJSON);
      dispatch(setAuthenticatedUser(forumAppUser));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={themeMode === 'light' ? themes.light : themes.dark}>
      <div>
        <AppHeader>Forum App</AppHeader>
        <NavBar
          themeMode={themeMode}
          setThemeMode={setThemeMode}
        />
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
    </ThemeProvider>
  );
}

export default App;
