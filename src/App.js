import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Welcome from './Pages/Welcome'
import ChatRoom from './Pages/ChatRoom'
import './Styles/Main.scss'
import { useSocket } from './socket'

function App() {
  console.log('App');
   const {ChatRoomData} = useSocket()

  return (
    <Router >
      <Switch>
        <Route path="/Welcome"  >
        <Welcome />
        </Route>
        <Route path="/ChatRoom">
          { ChatRoomData ? <ChatRoom ChatRoomData={ChatRoomData} /> : <Welcome/>}
        </Route>
        <Redirect from='/' to='/Welcome' />
      </Switch>
    </Router>

  );
}

export default App;
