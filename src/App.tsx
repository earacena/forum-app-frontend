import React from 'react';
import LoginForm from './features/loginForm/LoginForm';
import Notification from './features/notification/Notification';
import ThreadForm from './features/thread/ThreadForm';
import Threads from './features/thread/Threads';

function App() {
  return (
    <div className="App">
      <h1>Forum App</h1>
      <Notification />
      <LoginForm />
      <ThreadForm />
      <Threads />
    </div>
  );
}

export default App;
