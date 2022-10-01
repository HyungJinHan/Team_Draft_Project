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
  const roomRef = useRef();
  const usernameRef = useRef();

  useEffect(() => {
    // const joinRoom = () => {
    if (window.sessionStorage.getItem('name') !== '' && classKey.classKey !== '') {
      socket.emit('join_room', classKey.classKey);
      setShowChat(true);
    }
    // }
  }, [])


  console.log(classKey.classKey)

  return (
    <div className='ChatMain'>
      {!showChat ? (
        <div className='joinChatContainer'>
          <h3>Join A Chat</h3>
          <input
            type='text'
            placeholder='ID'
            // onChange={(e) => {
            //   // setUsername(e.target.value);
            //   setUsername(window.sessionStorage.getItem('name'));
            // }}
            value={window.sessionStorage.getItem('name')}
            ref={usernameRef}
          // onKeyPress={(e) => {
          //   e.key === 'Enter' && joinRoom();
          // }}
          />
          <input
            type='text'
            placeholder='Room ID'
            // onChange={(e) => {
            //   setRoom(classKey.classKey);
            // }}
            value={classKey.classKey}
            ref={roomRef}
          // onKeyPress={(e) => {
          //   e.key === 'Enter' && joinRoom();
          // }}
          />
          {/* <button
            onClick={joinRoom}
          >
            Join A Room
          </button> */}
        </div>
      ) : (
        <Chatting
          socket={socket}
          username={window.sessionStorage.getItem('name')}
          room={classKey.classKey}
        />
      )}
    </div>
  );
};

export default Chat;