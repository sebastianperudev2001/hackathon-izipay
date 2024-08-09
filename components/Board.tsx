"use client";

import React, { useState } from "react";
import { LeaderboardData } from "@/data";
import Profiles from "./Profiles";

const Board: React.FC = () => {
  const [period, setPeriod] = useState<number>(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPeriod(Number(e.currentTarget.dataset.id));
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <h1 className="mb-4 text-dark">Leaderboard</h1>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleClick}
            data-id="7"
            className="border border-color-light px-8 py-2 rounded-full bg-transparent cursor-pointer hover:bg-color-dark hover:text-color-light"
          >
            Última semana
          </button>
          <button
            onClick={handleClick}
            data-id="30"
            className="border border-color-light px-8 py-2 rounded-full bg-transparent cursor-pointer hover:bg-color-dark hover:text-color-light"
          >
            Último mes
          </button>
          <button
            onClick={handleClick}
            data-id="0"
            className="border border-color-light px-8 py-2 rounded-full bg-transparent cursor-pointer hover:bg-color-dark hover:text-color-light"
          >
            Todo el tiempo
          </button>
        </div>

        <Profiles Leaderboard={between(LeaderboardData, period)} />
      </div>
    </div>
  );
};

const between = (data: typeof LeaderboardData, period: number) => {
  const today = new Date();
  const previous = new Date(today);
  previous.setDate(previous.getDate() - (period + 1));

  const filtered = data.filter((val) => {
    const userDate = new Date(val.dt);
    if (period === 0) return val;
    return previous <= userDate && today >= userDate;
  });

  // sort in descending order
  return filtered.sort((a, b) => b.score - a.score);
};

export default Board;
