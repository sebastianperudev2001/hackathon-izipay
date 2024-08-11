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
        <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white leading-tight tracking-wide underline decoration-blue-500 decoration-4">
          Leaderboard
        </h1>

        <div className="flex justify-center gap-4 mb-5">
          <button
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={handleClick}
            data-id="7"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Último semana
            </span>
          </button>

          <button
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={handleClick}
            data-id="30"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Último mes
            </span>
          </button>

          <button
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={handleClick}
            data-id="0"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Todo el tiempo
            </span>
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
