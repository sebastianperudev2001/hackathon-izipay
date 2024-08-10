"use client";

import React, { useState, useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
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
const API_URL = "https://o3cymx4ff8.execute-api.us-east-1.amazonaws.com/api/";

const useMessages = (initial = []) => {
  const [messages, setMessages] = useState(initial);

  return [messages, setMessages];
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useMessages([]);
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
      console.log("Sending message:", text);

      // Perform the POST request using fetch
      const response = await fetch(`${API_URL}charts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: text }),
      });

      // Check if response is OK (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();

      console.log("Received response:", data);

      // Create reply message
      const replyMessage: Message = { text: data.reply, from: "Bot" };

      // Update messages state
      setMessages((messages: any) => [...messages, replyMessage]);
    } catch (error) {
      // Log the error
      console.error("Failed to send message:", error);
    }
  };

  const fetchStatistics = async (query: string) => {
    try {
      console.log("Sending request to /api/statistics with query:", query);

      // Perform the POST request using fetch
      const response = await fetch(`${API_URL}charts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      // Check if response is OK (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();

      console.log("Received response:", data);

      // Check if response data has the expected structure
      if (!data.labels || !data.datasets) {
        throw new Error("Unexpected response data structure");
      }

      // Prepare chart data
      const chartData = {
        labels: data.labels,
        datasets: [
          {
            label: data.datasets[0].label,
            data: data.datasets[0].data,
            backgroundColor: data.datasets[0].data.map(
              (value: number) =>
                `rgba(${value % 255}, ${100 + (value % 155)}, 132, 0.6)`
            ),
            borderColor: data.datasets[0].data.map(
              (value: number) =>
                `rgba(${value % 255}, ${100 + (value % 155)}, 132, 1)`
            ),
            borderWidth: 1,
          },
        ],
      };

      // Create chart message
      const chartMessage: Message = {
        type: "chart",
        data: chartData,
        from: "Bot",
        text: "",
      };

      // Update messages state
      setMessages((messages: any) => [...messages, chartMessage]);
    } catch (error) {
      // Log the error
      console.error("Failed to fetch statistics:", error);

      // Update messages state with error message
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
