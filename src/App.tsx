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
import { NavBar, AppWrapper } from './components';
import AdminPanel from './features/adminPanel/AdminPanel';

export type ThemeProps = {
  header: string,
  fg: string,
  bg: string,
  colorAccent: string,
  topic: {
    bg: string,
    fg: string,
    title: string,
    description: string,
    separator: string,
  },
  thread: {
    bg: string,
    fg: string,
    title: string,
    description: string,
    descriptionWeight: string,
    separator: string,
  },
  post: {
    bg: string,
    fg: string,
    title: string,
    description: string,
    separator: string,
    postAuthorFg: string,
  },
  button: {
    fg: string,
    bg: string,
    border: string,
    borderRadius: string,
  },
  form: {
    bg: string,
    inputBg: string,
  }
};

type ThemesProps = {
  light: ThemeProps,
  dark: ThemeProps,
};

const themes: ThemesProps = {
  light: {
    header: 'dark',
    fg: 'black',
    bg: 'white',
    colorAccent: 'hsla(1, 83%, 63%, 1)',
    topic: {
      bg: 'white',
      fg: 'white',
      title: 'black',
      description: 'darkgray',
      separator: 'darkgray',
    },
    thread: {
      bg: 'white',
      fg: 'white',
      title: 'black',
      description: 'black',
      descriptionWeight: '300',
      separator: 'darkgray',
    },
    post: {
      bg: 'white',
      fg: 'white',
      title: 'black',
      description: 'darkgray',
      separator: 'darkgray',
      postAuthorFg: 'white',
    },
    button: {
      fg: 'white',
      bg: 'black',
      border: '1px black solid',
      borderRadius: '8px',
    },
    form: {
      bg: 'white',
      inputBg: 'white',
    },
  },
  dark: {
    header: 'white',
    fg: 'white',
    bg: '#141414',
    colorAccent: 'hsla(1, 83%, 63%, 1)',
    topic: {
      bg: '#1c1c1c',
      fg: 'white',
      title: 'white',
      description: 'lightgray',
      separator: 'lightgray',
    },
    thread: {
      bg: '#1c1c1c',
      fg: 'white',
      title: 'white',
      description: 'lightgray',
      descriptionWeight: '300',
      separator: 'lightgray',
    },
    post: {
      bg: '#1c1c1c',
      fg: 'white',
      title: 'white',
      description: 'lightgray',
      separator: 'lightgray',
      postAuthorFg: '#454545',
    },
    button: {
      fg: 'white',
      bg: '#1c1c1c',
      border: '1px black solid',
      borderRadius: '8px',
    },
    form: {
      bg: '#1c1c1c',
      inputBg: '#0d0d0d',
    },
  },
};

const AppHeader = styled.h1`
  color: ${(props) => props.theme.header}
`;

function App() {
  const dispatch = useAppDispatch();
  const [themeMode, setThemeMode] = useState<string>('');

  // Set the App wide background color
  useEffect(() => {
    document.body.style.backgroundColor = themeMode === 'light' ? themes.light.bg : themes.dark.bg;
  }, [themeMode]);

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
