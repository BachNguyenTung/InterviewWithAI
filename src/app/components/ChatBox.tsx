'use client';

import { useEffect, useRef, useState } from 'react';
import { Message } from '../types/chat';

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        content: newMessage.trim(),
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage('');
    }
  };

  return (
    <div className='flex h-full flex-col rounded-lg bg-gray-800 shadow-lg'>
      {/* Header cố định */}
      <div className='border-b border-gray-700 p-4'>
        <h2 className='text-xl font-semibold text-white'>Chat</h2>
      </div>

      {/* Messages Container với scroll */}
      <div ref={chatContainerRef} className='max-h-[calc(100vh-250px)] flex-1 space-y-4 overflow-y-auto p-4'>
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] text-wrap break-all rounded-lg p-3 ${
                message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'
              }`}
            >
              <p>{message.content}</p>
              <span className='text-xs opacity-70'>{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form cố định ở dưới */}
      <form onSubmit={handleSubmit} className='mt-auto border-t border-gray-700 p-4'>
        <div className='flex flex-col space-x-2 md:flex-row'>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className='flex-1 rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Type a message...'
          />
          <button
            type='submit'
            className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
