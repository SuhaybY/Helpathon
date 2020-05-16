import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GetUsers, CreateHackathon, TestButton } from './components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GetUsers />
        <CreateHackathon />
        <TestButton />
      </header>
    </div>
  );
}

export default App;
