import React, { useEffect, useState } from 'react';
import { useSocket } from '../socket'
import { useHistory } from 'react-router-dom'

function ChatRoom({ ChatRoomData }) {
    console.log('ChatRoom');
    const { newUser, newMessage, userDisconnect, sendMessage, disconnectUser } = useSocket()
    const [textMessage, setTextMessage] = useState('')
    const [usersNames, setUsersNames] = useState(ChatRoomData.usersNames)
    const [messages, setMessages] = useState(ChatRoomData.messages)
    const history = useHistory()

    useEffect(() => {                                   // добавляет имя нового пользователя в список
        if (newUser) {
            setUsersNames(prev => [...prev, newUser])
        }
    }, [newUser])

    useEffect(() => {                                   // добавляет новое сообщение
        if (newMessage) {
            setMessages(prev => [...prev, newMessage])
        }
    }, [newMessage])

    useEffect(() => {                                   // убирает имя отключившегося пользователя из списка
        if (userDisconnect) {
            setUsersNames(prev => prev.splice(prev.indexOf(userDisconnect), 1)
            )
        }
    }, [userDisconnect])

    const inputChange = event => setTextMessage(event.target.value)

    const sendNewMessage = () => {
        sendMessage(textMessage, ChatRoomData.roomId)
        setTextMessage('')
    }

    const exitButton = () => {
        disconnectUser(sessionStorage.getItem('userId'), ChatRoomData.roomId)
        sessionStorage.removeItem('userId')
        history.replace(`/`)

    }


    return (
        <div className="Chat-room">
            <div className="Chat-room__side-bar">
                <div className="Chat-room__ID-room">{`Id комнаты: ${ChatRoomData.roomId}`}</div>
                <div className="Chat-room__users-list">
                    <div>Список пользователей:</div>
                    <ul>
                        {usersNames.map((name) =>
                            <li className="Chat-room__users-item" key={name + ChatRoomData.roomId}>{name}</li>
                        )}
                    </ul>
                </div>
                <button className="Chat-room__button-exit" onClick={exitButton}>Выход</button>
            </div>
            <div className="Chat-room__chat">
                <div className="Chat-room__text-feld">
                    <ul className="Chat-room__message-list">
                        {messages.map((item) => <li 
                        className="Chat-room__message" 
                        key={item.date + item.userName} >
                            <div>{item.date} </div>
                            <div>{item.userName} </div>
                            <div>{item.textMessage} </div>
                            
                        </li>)

                        }
                    </ul>

                </div>
                <div className="Chat-room__input-feld">
                    <input type="text" className="Chat-room__input" value={textMessage} onChange={inputChange} />
                    <button className="Chat-room__button" onClick={sendNewMessage}>Отправить</button>
                </div>
            </div>


        </div>
    );
}

export default ChatRoom;