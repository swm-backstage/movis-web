// App.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f5;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  max-width: 400px;
  border: 2px solid #007BFF;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const MessageDisplay = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #555;
  max-width: 400px;
  text-align: center;
`;

const App = () => {
  const [receivedMessage, setReceivedMessage] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) {
        setReceivedMessage(event.data);
      }
    };

    document.addEventListener('message', handleMessage);

    return () => {
      document.removeEventListener('message', handleMessage);
    };
  }, []);

  const sendMessageToNative = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(inputValue);
    }
  };

  return (
    <Container>
      <Title>React Native - WebView 통신</Title>
      <Input
        type="text"
        placeholder="React Native로 메시지 보내기"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={sendMessageToNative}>React Native로 전송</Button>
      <MessageDisplay>
        <strong>React Native로부터 수신된 메시지:</strong> {receivedMessage}
      </MessageDisplay>
    </Container>
  );
};

export default App;