"use client"; // Mark this component as a Client Component

import React from "react";
import Message from "../message/message";

interface MessageProps {
  from: "You" | "Bot"; // Updated to match Message component
  type: "chart" | "text"; // Updated to match Message component
  [key: string]: any; // To accommodate other properties
}

interface MessageListProps {
  messages: MessageProps[];
  downloadChart: (chartId: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  downloadChart,
  messagesEndRef,
}) => (
  <div className="top-10 flex flex-col w-full p-4 overflow-y-auto max-h-[90%]">
    {messages.map((msg, index) => (
      <Message key={index} msg={msg} downloadChart={downloadChart} />
    ))}
    <div ref={messagesEndRef} />
  </div>
);

export default MessageList;
