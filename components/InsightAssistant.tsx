"use client";

import React, { useState, useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import "./Chat.css";
import html2canvas from "html2canvas";
import Header from "./chat/Header";
import MessageList from "./chat/messages/messageList/messageList";
import InputComponent from "./chat/input/input";

Chart.register(...registerables);

interface Message {
  text: string;
  from: string;
  type?: "chart";
  data?: any;
}

const useMessages = (initial = []) => {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : initial;
  });

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  return [messages, setMessages];
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useMessages();
  const [input, setInput] = useState<string>("");

  const downloadChart = (chartId: string) => {
    const chartElement = document.getElementById(`chart-${chartId}`);
    if (chartElement) {
      html2canvas(chartElement).then((canvas) => {
        const image = canvas.toDataURL("image/jpeg", 1.0);
        const link = document.createElement("a");
        link.href = image;
        link.download = `chart-${chartId}.jpg`;
        link.click();
      });
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const newMessage = { text, from: "You" };
    setMessages((messages: any) => [...messages, newMessage]);
    if (text.trim().toLowerCase().startsWith("#diagram")) {
      fetchStatistics(text.trim().substring(11));
    } else {
      sendTextMessage(text);
    }
    setInput("");
  };

  const sendTextMessage = async (text: string) => {
    try {
      const response = await axios.post("/api/message", { message: text });
      const replyMessage: Message = { text: response.data.reply, from: "Bot" };
      setMessages((messages: any) => [...messages, replyMessage]);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const fetchStatistics = async (query: string) => {
    try {
      const response = await axios.post("/api/statistics", { query });
      const chartData = {
        labels: response.data.labels,
        datasets: [
          {
            label: response.data.datasets[0].label,
            data: response.data.datasets[0].data,
            backgroundColor: response.data.datasets[0].data.map(
              (value: number) =>
                `rgba(${value % 255}, ${100 + (value % 155)}, 132, 0.6)`
            ),
            borderColor: response.data.datasets[0].data.map(
              (value: number) =>
                `rgba(${value % 255}, ${100 + (value % 155)}, 132, 1)`
            ),
            borderWidth: 1,
          },
        ],
      };
      const chartMessage: Message = {
        type: "chart",
        data: chartData,
        from: "Bot",
        text: "",
      };
      setMessages((messages: any) => [...messages, chartMessage]);
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
      setMessages((messages: any) => [
        ...messages,
        { text: "Failed to fetch statistics", from: "Bot" },
      ]);
    }
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col w-full h-full">
      <Header setMessages={setMessages} input={input} setInput={setInput} />
      <div className="flex-1 overflow-y-auto">
        <MessageList
          messages={messages}
          downloadChart={downloadChart}
          messagesEndRef={messagesEndRef}
        />
      </div>
      <InputComponent
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
