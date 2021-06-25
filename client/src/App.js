import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, useMemo, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Homepage from './components/home/Homepage';
import Chat from './components/chat/Chat';
import Profile from './components/profile/Profile';
import LoginPage from './components/startup/LoginPage';
import StartupPage from './components/startup/StartupPage';
import UserContext from './components/common/UserContext';
import SearchPage from './components/searchpage/SearchPage';
import Notifications from './components/notifications/Notifications';
import Friends from './components/friends/Friends';

function App() {

  const [user, setUser] = useState({})

  const provideUser = useMemo(() => ({ user, setUser }, [user, setUser]));

  const getLoggedInUser = () => {
    fetch('/api/users/getLoggedInUser')
      .then(res => res.json())
      .then(res => setUser(res))
      .catch(err => err)
  }

  useEffect(() => {
    document.title = "gamerspace"
    getLoggedInUser();
  }, []);

  return (
    <main>
      <style>{'body { height: 100%; margin: 0; overflow-y: scroll'}</style>
      <Switch>
        <UserContext.Provider value={provideUser}>
          <Route path='/' component={StartupPage} exact />
          <Route path='/home' component={Homepage} exact />
          <Route path='/chat' component={Chat} exact />
          <Route path='/profile/:username' component={Profile} exact />
          <Route path='/login' component={LoginPage} exact />
          <Route path='/search/:searchterm' component={SearchPage} exact />
          <Route path='/search/:searchterm' component={SearchPage} exact />
          <Route path='/friends' component={Friends} exact />
          <Route path='/notifications' component={Notifications} exact />
        </UserContext.Provider>
      </Switch>
    </main>
  )
}

export default App;
