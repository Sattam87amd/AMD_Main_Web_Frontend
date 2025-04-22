'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot } from 'lucide-react'; // Lucide icon

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const response = await fetch('https://amd-api.code4bharat.com/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      const reply = data.reply || 'No reply received.';

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: reply },
      ]);
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, an error occurred.' },
      ]);
    }
  };

  const renderMarkdownBold = (text) => {
    return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Floating plugin icon when chat is closed
  if (!isOpen) {
    return (
      <div
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '80px',
          height: '80px',
          borderRadius: '70%',
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Bot size={40} />
      </div>
    );
  } 

  // Expanded chat window
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '360px',
        height: '500px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px',
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <strong>AMD Assistant</strong>
        <button
          onClick={toggleChat}
          style={{
            background: 'transparent',
            color: '#fff',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          backgroundColor: '#f8f8f8',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '12px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: msg.sender === 'user' ? '#007bff' : '#111' }}>
              {msg.sender === 'user' ? 'You' : 'AMD Bot'}
            </div>
            <div style={{ lineHeight: '1.5', fontSize: '15px' }}>{renderMarkdownBold(msg.text)}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: 'flex',
          borderTop: '1px solid #ccc',
          padding: '12px',
          backgroundColor: '#fff',
        }}
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Ask me anything..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '15px',
            marginRight: '8px',
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
