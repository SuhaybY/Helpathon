import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GetUsers, CreateHackathon } from './components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GetUsers />
        <CreateHackathon />
      </header>
    </div>
  );
}

export default App;
