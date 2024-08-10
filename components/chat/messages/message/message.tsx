"use client"; // Mark this component as a Client Component

import React from "react";
import ChartMessage from "../chartMessage/chartMessage";
import TextMessage from "../textMessage/textMessage";

// Define the types for the props
interface MessageProps {
  msg: {
    from: "You" | "Bot"; // Assuming 'You' or 'Bot' are the only possible values
    type: "chart" | "text"; // Assuming 'chart' or 'text' are the only possible values
    [key: string]: any; // To accommodate other properties in msg
  };
  downloadChart: (chartId: string) => void; // Assuming downloadChart is a function with no arguments and no return value
}

const Message: React.FC<MessageProps> = ({ msg, downloadChart }) => (
  <div className={`message ${msg.from === "You" ? "user" : "bot"} `}>
    {msg.type === "chart" ? (
      <ChartMessage msg={msg} downloadChart={downloadChart} />
    ) : (
      <TextMessage msg={msg} />
    )}
  </div>
);

export default Message;
