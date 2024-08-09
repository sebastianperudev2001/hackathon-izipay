"use client"; // Mark this component as a Client Component

import { todo } from "node:test";
import React, { useState } from "react";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { type: "visitor" | "operator"; text: string }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleToggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const userMessage = { type: "visitor" as const, text: inputMessage };
    setMessages([...messages, userMessage]);
    setInputMessage("");

    // TODO: LLAMAR LAMBDA PARA OBTENER RESPUESTA
    const fullResponse = "Hello! How can I assist you today?";
    let currentText = "";
    let i = 0;

    // Add an initial empty operator message to start streaming
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "operator" as const, text: currentText },
    ]);

    const interval = setInterval(() => {
      if (i < fullResponse.length) {
        currentText += fullResponse[i];
        i++;

        // Update the last message (operator's message) in the messages array
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { type: "operator" as const, text: currentText },
        ]);
      } else {
        clearInterval(interval);
      }
    }, 20); // Adjust the speed of the streaming by changing the interval time
  };

  return (
    <div className="fixed bottom-8 right-8">
      {isOpen && (
        <div className="flex flex-col bg-gray-100 w-[28rem] h-[35rem] shadow-lg rounded-t-lg overflow-hidden">
          <div className="flex items-center justify-between bg-gradient-to-r from-purple-800 to-purple-600 p-4 rounded-t-lg">
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-full"
                src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                alt="avatar"
              />
              <div className="ml-3">
                <h4 className="text-white font-bold">IziBot</h4>
                <p className="text-white text-sm">
                  Hola, pregunta lo que necesites saber sobre tus ventas y
                  performance comercial en Izipay 🚀
                </p>
              </div>
            </div>
            <button
              onClick={handleToggleChatbox}
              className="text-white font-bold"
            >
              &times;
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 p-2 w-full rounded-lg ${
                  message.type === "visitor"
                    ? "bg-gray-300 self-start rounded-tl-lg rounded-bl-lg"
                    : "bg-purple-700 text-white self-end rounded-tr-lg rounded-br-lg"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-purple-800 to-purple-600 p-4 flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 p-2 rounded-full text-black"
              placeholder="Escribe un mensaje..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-white text-purple-600 font-bold rounded-full p-2"
            >
              Send
            </button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button
          onClick={handleToggleChatbox}
          className="bg-white p-3 rounded-full shadow-lg"
        >
          <img
            src="izipay.png"
            alt="Chat Icon"
            className="w-full h-12 mx-auto"
          />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
