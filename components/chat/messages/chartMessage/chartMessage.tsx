"use client"; // Mark this component as a Client Component

import React from "react";
import { Comment, Icon } from "semantic-ui-react";
import { Bar } from "react-chartjs-2";
import barChartOptions from "./barChatOptions";
import botAvatar from "../../../../public/avatar_1.png";

// Define types for the props
interface ChartMessageProps {
  msg: {
    from: "You" | "Bot"; // Assuming 'You' or 'Bot' are the only possible values
    type: "chart" | "text"; // Assuming 'chart' or 'text' are the only possible values
    [key: string]: any; // To accommodate other properties in msg
  };
  downloadChart: (chartId: string) => void; // Function expects a string argument
}

const ChartMessage: React.FC<ChartMessageProps> = ({ msg, downloadChart }) => (
  <>
    <img className="avatar-placeholder" src="avatar_1.png" />
    <div className="chart-container">
      <Bar
        id={`chart-${msg.id}`}
        data={msg.data}
        options={barChartOptions(msg.data)}
      />
      <Icon
        name="download"
        className="download-icon"
        onClick={() => downloadChart(msg.id)}
      />
    </div>
  </>
);

export default ChartMessage;
