import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Homepage from './components/home/Homepage';
import Chat from './components/chat/Chat';
import Profile from './components/profile/Profile';
import LoginPage from './components/startup/LoginPage';
import StartupPage from './components/startup/StartupPage';

function App() {

  useEffect(() => {
    document.title = "gamerspace"
  }, []);

  return (
    <main>
      <style>{'body { height: 100%; margin: 0;'}</style>
      <Switch>
        <Route path='/' component={StartupPage} exact/>
        <Route path='/home' component={Homepage} exact/>
        <Route path='/chat' component={Chat} exact/>
        <Route path='/profile' component={Profile} exact/>
        <Route path='/login' component={LoginPage} exact/>
      </Switch>
    </main>
  )
}

export default App;
