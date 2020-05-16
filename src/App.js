import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GetUsers, InsertUser, Qr } from './components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GetUsers />
        <InsertUser />
        <Qr />
      </header>
    </div>
  );
}

export default App;
