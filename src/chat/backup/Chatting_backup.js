import React, { useEffect, useRef, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chatting({
  socket,
  username,
  room
}) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageRef = useRef()

  const chatHour = new Date(Date.now()).getHours()
  const chatMinute = new Date(Date.now()).getMinutes()

  const sendMessage =
    async () => {
      if (currentMessage !== '') {
        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time:
            (chatHour < 10 ? `0${chatHour}` : chatHour) +
            ':' +
            (chatMinute < 10 ? `0${chatMinute}` : chatMinute)
        };
        await socket.emit('send_message', messageData);
        setMessageList(
          (list) => [...list, messageData]
        );
        setCurrentMessage('')
      }
    };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      // console.log(data);
      setMessageList(
        (list) => [...list, data]
      );
    })
  }, [socket]);

  var className = room

  if (room === "App") {
    className = 'App 특화'
  } else if (room === "JSA") {
    className = 'JS 특화 A'
  } else if (room === "JSB") {
    className = 'JS 특화 B'
  } else if (room === "SprA") {
    className = 'Spring 특화 A'
  } else if (room === "SprB") {
    className = 'Spring 특화 B'
  } else if (room === "SAMUL") {
    className = '사물지능'
  } else if (room === "UNUH") {
    className = '언어지능'
  } else if (room === "SIGAK") {
    className = '시각지능'
  } else if (room === "CLDA") {
    className = '클라우드 A'
  } else if (room === "CLDB") {
    className = '클라우드 B'
  }

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>&lt; {className} &gt; 채팅 방 / {username} 로그인 중</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messageList.map((messageContent) => {
            return (
              <div
                className='message'
                id={username === messageContent.author ? 'you' : 'other'}>
                <div>
                  <div className='message-content'>
                    <p>{messageContent.message}</p>
                  </div>
                  <div className='message-meta'>
                    <p id='time'>{messageContent.time}</p>
                    <p id='author'>{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          type='text'
          placeholder='Say Hi!'
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            };
          }}
          ref={messageRef}
        />
        <button
          onClick={sendMessage}
        >
          &#9658;
        </button>
      </div>
    </div>
  );
}

export default Chatting;