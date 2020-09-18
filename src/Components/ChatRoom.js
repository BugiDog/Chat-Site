import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../socket'

function ChatRoom({ ChatRoomData }) {
    const [textMessage, setTextMessage] = useState('')
    const [usersNames, setUsersNames] = useState(ChatRoomData.usersNames)
    const [messages, setMessages] = useState(ChatRoomData.messages)
    const { newUser, newMessage, sendMessage } = useSocket()


    useEffect(() => {
        if (newUser) {
            setUsersNames([...usersNames,newUser]) 
        }
    }, [newUser])

    useEffect(() => {
        if (newMessage) {
            setMessages([...messages,newMessage])
        }
    }, [newMessage])

    useEffect(() => {
        const url = decodeURIComponent(window.location.href)
        const index = url.indexOf('roomID=')
        if (index === -1) {
            window.history.pushState(null, null, `?roomID=${ChatRoomData.roomId}`)
        }
    }, [])

    const inputChange = event => setTextMessage(event.target.value)

    const sendNewMessage = () =>{
        sendMessage(textMessage,ChatRoomData.roomId)
        setTextMessage('')
        //inputChange({target :{value:''}})
    }

    return (
        <div className="Chat-room">
            <div className="Chat-room__side-bar">
                <div className="Chat-room__ID-room">{`Id комнаты:${ChatRoomData.roomId}`}</div>
                <div className="Chat-room__users-list">
                <ul>
                    {usersNames.map((name)=>
                        <li key={name+ChatRoomData.roomId}>{name}</li>
                    )}
                </ul>
                </div>
            </div>
            <div className="Chat-room__chat">
                <div className="Chat-room__text-feld">
                   <ul>
                       {messages.map((item)=><li>{`${item.date}   ${item.userName}     ${item.textMessage} `} </li>) 
                           
                       }
                   </ul>

                </div>
                <div className="Chat-room__input-feld">
                    <input type="text" className="Chat-room__input" value={textMessage} onInput={inputChange}/>
                    <button className="Chat-room__button" onClick={sendNewMessage}>Отправить</button>
                </div>
            </div>


        </div>
    );
}

export default ChatRoom;