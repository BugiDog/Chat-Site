import React, { useRef, useEffect } from 'react';
import { useSocket } from '../socket'


function Welcome() {
  const roomId = useRef(false)
  const name = useRef('')
  const { joinChatRoom, createChatRoom } = useSocket()

  useEffect(() => {
    const url = decodeURIComponent(window.location.href)
    const index = url.indexOf('roomID=')
    if (index != -1) {
      roomId.current = url.substring(index + 7)
      console.log('roomId= ', roomId.current);
    }
  }, [])

  const inputChange = event => name.current = event.target.value

  const buttonClick = () => roomId.current ? joinChatRoom(name.current, roomId.current) : createChatRoom(name.current)


  return (
    <div >
      <div>
        <input type='text' placeholder='Введите имя' onInput={inputChange} />
        <button onClick={buttonClick}>Зайти в чат</button>
      </div>
    </div>
  );
}

export default Welcome;
