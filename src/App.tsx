import React from 'react';
import LoginForm from './features/loginForm/LoginForm';
import Notification from './features/notification/Notification';
import Threads from './features/thread/Threads';

function App() {
  return (
    <div className="App">
      <h1>Forum App</h1>
      <Notification />
      <LoginForm />
      <Threads />
    </div>
  );
}

export default App;
