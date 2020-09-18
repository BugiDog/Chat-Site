import React, {useEffect, useState} from 'react';
import io from 'socket.io-client'

const socket = io(`http://localhost:5000`)

export const useSocket = () => {
    const [ChatRoomData, setChatRoomData] = useState(null)
    const [newUser, setNewUser] = useState('')
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {

        socket.on('newError', error =>{
            alert(error.message)
        })

        socket.on('ChatRoomData', data => {
            setChatRoomData(data)
        })

        socket.on('newUser',(userName)=>{
            setNewUser(userName)      
        })
        
        socket.on('newMessage',({message})=>{
            setNewMessage(message)
        })

    }, [])

    const joinChatRoom = (userName, roomId) => {
        socket.emit('joinChatRoom',{userName, roomId})
    }
    const createChatRoom = (name) => {
        socket.emit('createChatRoom',name)
    }
    const sendMessage = (textMessage,roomId) =>{
        socket.emit('sendMessage',{textMessage,roomId})
    }

    return {
        ChatRoomData,
        newUser,
        newMessage,
        joinChatRoom,
        createChatRoom,
        sendMessage
    }
}