import React from 'react';
import Welcome from './Components/Welcome'
import ChatRoom from './Components/ChatRoom'
import {useSocket} from './socket'


function App() {
 
  const { ChatRoomData} = useSocket()

 

  return (
    <div >
       <div>
         { !ChatRoomData && <Welcome  />}
       </div>
       <div>
         {!!ChatRoomData && <ChatRoom ChatRoomData={ChatRoomData}/>}
       </div>
    </div>
  );
}

export default App;
 