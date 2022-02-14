import React from 'react';
import LoginForm from './components/LoginForm';
import Threads from './components/Thread/Threads';

function App() {
  return (
    <div className="App">
      <h1>Forum App</h1>
      <LoginForm />
      <Threads />
    </div>
  );
}

export default App;
