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

  const API_URL = "https://o3cymx4ff8.execute-api.us-east-1.amazonaws.com/api/";

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage = { type: "visitor" as const, text: inputMessage };
    setMessages([...messages, userMessage]);
    setInputMessage("");

    try {
      // Call the Lambda function with the inputMessage as the body
      const response = await fetch(`${API_URL}messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputMessage }),
      });

      // Check if the response is ok
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Get the response from the Lambda function
      const data = await response.json();
      const fullResponse = data.result || "Sorry, I couldn't get a response.";

      // Add the operator's response to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "operator" as const, text: fullResponse },
      ]);
    } catch (error) {
      console.error("Error calling Lambda function:", error);
      // Handle the error appropriately
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "operator" as const, text: "Sorry, something went wrong." },
      ]);
    }
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
          <img src="izipay.png" alt="Chat Icon" className="w-50 h-12 mx-auto" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
