import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Homepage from './components/home/Homepage';
import Chat from './components/chat/Chat';
import Profile from './components/profile/Profile';
import Login from './components/common/Login';

function App() {
  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/

  useEffect(() => {
    document.title = "gamerspace"
  }, []);

  return (
    <main>
      <style>{'body { background-color: #304155; }'}</style>
      <Switch>
        <Route path='/' component={Homepage} exact/>
        <Route path='/chat' component={Chat} exact/>
        <Route path='/profile' component={Profile} exact/>
        <Route path='/login' component={Login} exact/>
      </Switch>
    </main>
  )
}

export default App;
