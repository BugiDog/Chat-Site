import React, {useEffect, useState} from 'react';
import io from 'socket.io-client'

const socket = io(`http://localhost:5000`)

export const useSocket = () => {
    const [ChatRoomData, setChatRoomData] = useState(null)

    useEffect(() => {
        socket.on('ChatRoomData', data => {
            setChatRoomData(data)
        })

    }, [])

    const joinChatRoom = (data) => {
        socket.emit('joinChatRoom',data)
    }

    return {
        ChatRoomData,
        joinChatRoom
    }
}