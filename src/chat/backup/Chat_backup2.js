import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import io from 'socket.io-client';
import Chatting from './Chatting';

const socket = io.connect('http://localhost:3001')

const Chat = (
  classKey
) => {
  // const [username, setUsername] = useState('');
  // const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem('name') !== '' && classKey.classKey !== '') {
      socket.emit('join_room', classKey.classKey);
      setShowChat(true);
    }
  }, [])


  console.log(classKey.classKey)

  return (
    <div className='ChatMain'>
      <Chatting
        socket={socket}
        username={window.sessionStorage.getItem('name')}
        room={classKey.classKey}
      />
    </div>
  );
};

export default Chat;