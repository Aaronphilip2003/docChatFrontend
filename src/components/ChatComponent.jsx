import React, { useState } from 'react';
import { ChatIcon, PaperAirplaneIcon } from '@heroicons/react/solid';

const ChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChatWindow = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (message.trim() !== '') {
      const userMessage = { content: message, sender: 'user' };
      setMessages([...messages, userMessage]);
      setMessage('');
      console.log(message)

      try {
        const response = await fetch('http://localhost:8001/performSemanticSearch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: message }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const { answer } = await response.json();
        console.log(response.data)

        const apiMessage = { content: answer, sender: 'api' };
        setMessages(messages => [...messages, apiMessage]);
      } catch (error) {
        console.error("Failed to get answer from the API", error);
        const errorMessage = { content: "Sorry, couldn't fetch the answer.", sender: 'api' };
        setMessages(messages => [...messages, errorMessage]);
      }
    }
  };

  const handleSendMessage = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission and page reload
      sendMessage();
    }
  };

  const handleClickSendMessage = () => {
    sendMessage();
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {isOpen && (
        <div className="w-96 h-[600px] bg-white shadow-lg rounded-lg flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chat</h2>
            <button onClick={toggleChatWindow} className="focus:outline-none">Close</button>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 p-2 rounded ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 p-4 flex">
            <input
              type="text"
              className="flex-1 border rounded-md p-2 mr-2"
              placeholder="Type a message..."
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleSendMessage}
            />
            <button
              onClick={handleClickSendMessage}
              className="bg-blue-500 text-white rounded-full p-2 focus:outline-none"
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="h-5 w-5 transform rotate-90"/>
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={toggleChatWindow}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg focus:outline-none"
          aria-label="Open chat"
        >
          <ChatIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ChatComponent;
