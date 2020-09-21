import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useSocket } from '../socket'


function Welcome() {
  console.log('Welcome');
  const [name, setName] = useState('')
  const [RoomId, setRoomId] = useState('')
  const { ChatRoomData,joinChatRoom, createChatRoom, reconnectToRoom} = useSocket()
  const history = useHistory()

  useEffect(() => {
    const url = decodeURIComponent(window.location.href)
    if (sessionStorage.getItem('userId')) {
      reconnectToRoom(sessionStorage.getItem('userId'))
    } else if (url.includes('roomID=')){
      setRoomId(url.substring(url.indexOf('roomID=') + 7))
    }
  },[])

  useEffect(() => {
    if (ChatRoomData) {
      console.log('useEffectWelcome', name, ChatRoomData.roomId);
      history.replace(`/ChatRoom/?roomID=${ChatRoomData.roomId}`)
    }
  }, [ChatRoomData])

  const inputChange = event => {
    if (event.target.value.length <= 12) setName(event.target.value)
  }

  const buttonClick = () => RoomId ? joinChatRoom(name, RoomId) : createChatRoom(name)


  return (
    <div className="Welcome-page">
      <div className="Welcome-page__input-feld">
        <input className="Welcome-page__input" type='text' placeholder='Введите имя' value={name} onChange={inputChange} />
        <button className="Welcome-page__button" onClick={buttonClick}>Зайти в чат</button>
      </div>
    </div>
  );
}

export default Welcome;
