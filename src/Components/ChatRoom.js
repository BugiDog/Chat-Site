import React, {useEffect, useRef} from 'react';
import {useSocket} from '../socket'

function ChatRoom({ChatRoomData}) {

    const { newUser} = useSocket()

    useEffect(()=>{
       if (newUser) {
           ChatRoomData.usersNames.push(newUser)
            console.log(ChatRoomData.usersNames);
         } 
    },[newUser])
   
    useEffect(()=>{
        const url = decodeURIComponent(window.location.href)
        const index = url.indexOf('roomID=')
        if (index === -1) {
            window.history.pushState(null, null, `?roomID=${ChatRoomData.roomId}`)
          }
     
    },[])

  return (
    <div >
       <div>
       ChatRoom
       </div>
    </div>
  );
}

export default ChatRoom;