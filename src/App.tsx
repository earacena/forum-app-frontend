import React from 'react';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Threads from './components/Thread/Threads';

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
