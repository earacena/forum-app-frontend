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
import AppWrapper from './components/AppWrapper';

type ThemeProps = {
  header: string,
  fg: string,
  bg: string,
  topic: {
    bg: string,
    fg: string,
    title: string,
    description: string,
    seperator: string,
  },
  button: {
    fg: string,
    bg: string,
    border: string,
    borderRadius: string,
  }
};

type ThemesProps = {
  light: ThemeProps,
  dark: ThemeProps,
};

const AppHeader = styled.h1`
  color: ${(props) => props.theme.header}
`;

function App() {
  const dispatch = useAppDispatch();
  const [themeMode, setThemeMode] = useState<string>('');

  const themes: ThemesProps = {
    light: {
      header: 'dark',
      fg: 'black',
      bg: 'white',
      topic: {
        bg: 'white',
        fg: 'white',
        title: 'black',
        description: 'darkgray',
        seperator: 'darkgray',
      },
      button: {
        fg: 'white',
        bg: 'black',
        border: '1px black solid',
        borderRadius: '8px',
      },
    },
    dark: {
      header: 'white',
      fg: '#303030',
      bg: '#141414',
      topic: {
        bg: '#303030',
        fg: 'white',
        title: 'white',
        description: 'lightgray',
        seperator: 'lightgray',
      },
      button: {
        fg: 'white',
        bg: 'gray',
        border: '1px black solid',
        borderRadius: '8px',
      },
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
    <AppWrapper>
      <ThemeProvider theme={themeMode === 'light' ? themes.light : themes.dark}>
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
      </ThemeProvider>
    </AppWrapper>
  );
}

export default App;
