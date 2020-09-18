import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Welcome from './Pages/Welcome'
import ChatRoom from './Pages/ChatRoom'
import { useSocket } from './socket'
import './Styles/Main.scss'


function App() {

  const { ChatRoomData } = useSocket()

  console.log('ChatRoomDataAPP', ChatRoomData);

  return (
    <Router >
      <Switch>
        <Route path="/Welcome"  >
          <Welcome RoomID={!!ChatRoomData ? ChatRoomData.roomId : 0} />
        </Route>
        <Route path="/ChatRoom">
          {ChatRoomData ? <ChatRoom ChatRoomData={ChatRoomData} /> :
            <Welcome RoomID={decodeURIComponent(window.location.href).substring(decodeURIComponent(window.location.href).indexOf('roomID=') + 7)
            } />
          }
        </Route>
        <Redirect from='/' to='/Welcome' />
      </Switch>
    </Router>

  );
}

export default App;
