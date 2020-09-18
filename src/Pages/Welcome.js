import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useSocket } from '../socket'


function Welcome({ RoomID }) {
  console.log('RoomIDWelcome', RoomID);
  const name = useRef('')
  const { joinChatRoom, createChatRoom } = useSocket()
  const history = useHistory()

  useEffect(() => {
    if (!!name && !!RoomID) {
      console.log('WelcomeuseEffect', name, RoomID);
      history.push(`/ChatRoom/?roomID=${RoomID}`)
    }

  }, [name, RoomID])

  const inputChange = event => name.current = event.target.value

  const buttonClick = () => !!RoomID ? joinChatRoom(name.current, RoomID) : createChatRoom(name.current)


  return (
    <div className="Welcome-page">
      <div className="Welcome-page__input-feld">
        <input className="Welcome-page__input" type='text' placeholder='Введите имя' onInput={inputChange} />
        <button className="Welcome-page__button" onClick={buttonClick}>Зайти в чат</button>
      </div>
    </div>
  );
}

export default Welcome;
