"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPaperPlane, FaBars } from 'react-icons/fa';

const staticChats = [
  { id: 1, name: 'Sunil Kumar', lastMessage: 'Hey, how are you?', unread: 2 },
  { id: 2, name: 'Samarjit Singh', lastMessage: 'Can we discuss the project?', unread: 0 },
  { id: 3, name: 'Kamalesh', lastMessage: 'Thanks for your help!', unread: 1 },
];

const staticMessages = [
  { id: 1, sender: 'John Doe', content: 'Hi there! How can I help you today?', timestamp: '10:30 AM' },
  { id: 2, sender: 'You', content: 'Hello! I had a question about the internship program.', timestamp: '10:32 AM' },
  { id: 3, sender: 'John Doe', content: 'Sure, I\'d be happy to help. What would you like to know?', timestamp: '10:33 AM' },
];

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(staticChats[0]);
  const [message, setMessage] = useState('');
  const [showChatList, setShowChatList] = useState(true); // Toggle for mobile view

  return (
    <div className="flex h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="flex w-full p-4 space-x-4 relative">
        
        {/* Chat list (Toggles in mobile view) */}
        <div className={`absolute md:static md:w-1/3 z-20 bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-md overflow-hidden transition-all duration-300 transform ${showChatList ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-full md:w-1/3`}>
          <h2 className="text-xl font-semibold p-4 border-b border-blue-800 text-white flex justify-between">
            Chats
            {/* Toggle Button for Mobile */}
            <button
              className="md:hidden text-white text-lg focus:outline-none"
              onClick={() => setShowChatList(false)}
            >
              ✕
            </button>
          </h2>
          <div className="overflow-y-auto h-[calc(100vh-12rem)]">
            {staticChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border-b border-blue-800 cursor-pointer hover:bg-blue-800 hover:bg-opacity-30 transition-colors ${selectedChat.id === chat.id ? 'bg-blue-800 bg-opacity-50' : ''}`}
                onClick={() => {
                  setSelectedChat(chat);
                  setShowChatList(false); // Hide chat list on mobile when a chat is selected
                }}
              >
                <div className="font-semibold text-white">{chat.name}</div>
                <div className="text-sm text-blue-200">{chat.lastMessage}</div>
                {chat.unread > 0 && (
                  <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 flex flex-col bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-md overflow-hidden relative">
          {/* Show button to open chat list on mobile */}
          <button
            className="md:hidden absolute top-4 left-4 text-white focus:outline-none"
            onClick={() => setShowChatList(true)}
          >
            <FaBars className="text-xl" />
          </button>
          <div className="bg-blue-900 bg-opacity-50 p-4 border-b border-blue-800 ">
            <h2 className="text-xl font-semibold text-white sm:ml-8">{selectedChat.name}</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {staticMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  <div className="font-semibold">{msg.sender}</div>
                  <div>{msg.content}</div>
                  <div className="text-xs mt-1 opacity-70">{msg.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-900 bg-opacity-50 p-4 border-t border-blue-800">
            <div className="flex space-x-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-blue-800 bg-opacity-50 text-white placeholder-blue-300 border-blue-700 flex-1"
              />
              <Button onClick={() => setMessage('')} className="bg-blue-600 hover:bg-blue-700 text-white">
                <FaPaperPlane className="mr-2" /> Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
