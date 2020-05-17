import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GetUsers, InsertUser, Qr, Email } from './components';
import KommunicateChat from './chat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GetUsers />
        <InsertUser />
        <Qr />
        <Email/>
        <KommunicateChat/>
      </header>
    </div>
  );
}

export default App;
