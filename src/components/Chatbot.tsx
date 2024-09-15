"use client";

import React, { useState, useEffect } from "react";
import { FaCommentAlt, FaTimes } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  
  interface ChatMessage {
    sender: string;
    message: string;
  }

  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Utility function to save chatLog to localStorage
  const saveChatLogToLocalStorage = (log: ChatMessage[]) => {
    localStorage.setItem("chatLog", JSON.stringify(log));
  };

  // Utility function to load chatLog from localStorage
  const loadChatLogFromLocalStorage = (): ChatMessage[] => {
    const storedChatLog = localStorage.getItem("chatLog");
    return storedChatLog ? JSON.parse(storedChatLog) : [];
  };

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const storedChatLog = loadChatLogFromLocalStorage();
    setChatLog(storedChatLog);
  }, []);

  // Save chat history to localStorage whenever chatLog changes
  useEffect(() => {
    if (chatLog.length > 0) {
      saveChatLogToLocalStorage(chatLog);
    }
  }, [chatLog]);

  // Function to handle sending the user's message and getting the bot's response
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newChatLog = [...chatLog, { sender: "user", message: userMessage }];
    setChatLog(newChatLog);
    setUserMessage(""); // Clear the input field
    setLoading(true);

    try {
      
      const genAI = new GoogleGenerativeAI("AIzaSyDEoOE4ydMhkIZgrXlCng8j51tm8XI4_dU");
      
      
      const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContentStream(userMessage);	
      
      const response = await result.response;
      const text = response.text();
      
      // Assume the response object provides text response
      const responseText = text || "I'm not sure how to respond.";

      // Update the chat log with the bot's response
      const updatedChatLog = [
        ...newChatLog,
        { sender: "bot", message: responseText },
      ];
      setChatLog(updatedChatLog);

      // Save the updated chat log to localStorage
      saveChatLogToLocalStorage(updatedChatLog);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorChatLog = [
        ...newChatLog,
        { sender: "bot", message: "Sorry, something went wrong." },
      ];
      setChatLog(errorChatLog);

      // Save the error state to localStorage
      saveChatLogToLocalStorage(errorChatLog);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="bg-blue-600 w-16 h-16 rounded-full shadow-lg text-white flex items-center justify-center hover:bg-blue-700 focus:outline-none"
          onClick={toggleChat}
        >
          {isOpen ? <FaTimes size={24} /> : <FaCommentAlt size={24} />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 z-50 w-96 bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-800 p-4">
            <h2 className="text-xl font-semibold">Chatbot</h2>
          </div>
          <div className="p-4 flex-grow h-96 overflow-y-auto">
            {/* Display chat log */}
            {chatLog.map((chat, index) => (
              <div
                key={index}
                className={`mb-4 ${chat.sender === "user" ? "text-right" : "text-left"}`}
              >
                <p
                  className={`${
                    chat.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  } inline-block p-2 rounded-md`}
                >
                  {chat.message}
                </p>
              </div>
            ))}
            {loading && (
              <div className="text-gray-500 text-center">
                Bot is responding...
              </div>
            )}
          </div>
          <div className="p-4 bg-gray-800">
            <Input
              type="text"
              placeholder="Type a message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            />
            <Button
              onClick={handleSendMessage}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
