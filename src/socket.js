import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'

const socket = io(`http://localhost:5000`)

export const useSocket = () => {
    const [ChatRoomData, setChatRoomData] = useState(null)
    const [newUser, setNewUser] = useState('')
    const [newMessage, setNewMessage] = useState('')
    const [userDisconnect, setUserDisconnect] = useState('')

    useEffect(() => {

        socket.on('newError', error => {
            alert(error.message)
        })

        socket.on('ChatRoomData', data => {
            console.log('ChatRoomData',data);
            setChatRoomData(data)
        })

        socket.on('newUser', userName => {
            console.log('newUser');
            setNewUser(userName)
        })

        socket.on('newMessage', ({ message }) => {
            console.log('newMessage');
            setNewMessage(message)
        })

        socket.on('userId', newUserId  => {
            console.log('userId',newUserId);
            sessionStorage.setItem('userId',newUserId)
        })

        socket.on('userDisconnect', userName => {
            console.log('userDisconnect',userName);
            setUserDisconnect(userName)
        })

    }, [])

    const joinChatRoom = (userName, roomId) => {
        console.log('joinChatRoom');
        socket.emit('joinChatRoom', { userName, roomId })
    }
    const createChatRoom = (name) => {
        console.log('createChatRoom');
        socket.emit('createChatRoom', name)
    }
    const sendMessage = (textMessage, roomId) => {
        console.log('sendMessage');
        socket.emit('sendMessage', { textMessage, roomId, userId : sessionStorage.getItem('userId')  })
    }
    const reconnectToRoom = (userId) => {
        console.log('reconnectToRoom',userId);
        socket.emit('reconnectToRoom',  userId)
    }

    const disconnectUser = (userId,roomId) => {
        console.log('disconnectUser',userId,'------',roomId);
        socket.emit('disconnectUser',  {userId, roomId })
    }

    return {
        ChatRoomData,
        newUser,
        newMessage,
        userDisconnect,
        joinChatRoom,
        createChatRoom,
        sendMessage,
        reconnectToRoom,
        disconnectUser
    }
}