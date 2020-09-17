import React, {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client'

const socket = io(`http://localhost:5000`)

export const useSocket = () => {
    const [ChatRoomData, setChatRoomData] = useState(null)
    const [newUser, setNewUser] =useState('')
    useEffect(() => {

        socket.on('error', error =>{
            alert(error.message)
        })

        socket.on('ChatRoomData', data => {
            setChatRoomData(data)
        })

        socket.on('newUser',(userName)=>{
            console.log(userName);
            setNewUser(userName)
           
        })

    }, [])

    const joinChatRoom = (userName, roomId) => {
        socket.emit('joinChatRoom',{userName, roomId})
    }
    const createChatRoom = (name) => {
        socket.emit('createChatRoom',name)
    }

    return {
        ChatRoomData,
        newUser,
        joinChatRoom,
        createChatRoom
    }
}