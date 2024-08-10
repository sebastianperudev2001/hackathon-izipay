"use client"; // Mark this component as a Client Component

import React from "react";
import { Comment } from "semantic-ui-react";
import Image from "next/image";

// Define the type for the message props
interface TextMessageProps {
  msg: {
    from: "You" | "Bot"; // Assuming 'You' or 'Bot' are the only possible values
    type: "chart" | "text"; // Assuming 'chart' or 'text' are the only possible values
    [key: string]: any; // To accommodate other properties in msg
  };
}

//<img src="izipay.png" alt="Chat Icon" className="w-50 h-12 mx-auto" />;

const botUser = "avatar_1.png";
const botAvatar = "avatar_2.png";

const TextMessage: React.FC<TextMessageProps> = ({ msg }) => (
  <>
    <div className="avatar-placeholder">
      <img
        src={msg.from === "You" ? botUser : botAvatar}
        alt={`${msg.from === "You" ? "User" : "Bot"} Avatar`}
        width={40} // Specify the width of the avatar
        height={40} // Specify the height of the avatar
        className="avatar-image"
      />
    </div>
    <div className="comment-text">{msg.text}</div>
  </>
);

export default TextMessage;
