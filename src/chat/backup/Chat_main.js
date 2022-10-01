import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

const socket = io.connect('http://localhost:3001')

const Chat = (
  classKey
) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageRef = useRef()
  const chatHour = new Date(Date.now()).getHours()
  const chatMinute = new Date(Date.now()).getMinutes()

  useEffect(() => {
    if (window.sessionStorage.getItem('name') !== '' && classKey.classKey !== '') {
      socket.emit('join_room', classKey.classKey);
    }
  }, [])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      // console.log(data);
      setMessageList(
        (list) => [...list, data]
      );
    })
  }, [socket]);

  const sendMessage =
    async () => {
      if (currentMessage !== '') {
        const messageData = {
          room: classKey.classKey,
          author: window.sessionStorage.getItem('name'),
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

  var className = classKey.classKey

  if (classKey.classKey === "App") {
    className = 'App 특화'
  } else if (classKey.classKey === "JSA") {
    className = 'JS 특화 A'
  } else if (classKey.classKey === "JSB") {
    className = 'JS 특화 B'
  } else if (classKey.classKey === "SprA") {
    className = 'Spring 특화 A'
  } else if (classKey.classKey === "SprB") {
    className = 'Spring 특화 B'
  } else if (classKey.classKey === "SAMUL") {
    className = '사물지능'
  } else if (classKey.classKey === "UNUH") {
    className = '언어지능'
  } else if (classKey.classKey === "SIGAK") {
    className = '시각지능'
  } else if (classKey.classKey === "CLDA") {
    className = '클라우드 A'
  } else if (classKey.classKey === "CLDB") {
    className = '클라우드 B'
  }

  console.log(classKey.classKey)

  return (
    <div className='ChatMain'>
      <div className='chat-window'>
        <div className='chat-header'>
          <p>&lt; {className} &gt; 채팅 방 / {window.sessionStorage.getItem('name')} 로그인 중</p>
        </div>
        <div className='chat-body'>
          <ScrollToBottom className='message-container'>
            {messageList.map((messageContent) => {
              return (
                <div
                  className='message'
                  id={window.sessionStorage.getItem('name') === messageContent.author ? 'you' : 'other'}>
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
    </div>
  );
};

export default Chat;