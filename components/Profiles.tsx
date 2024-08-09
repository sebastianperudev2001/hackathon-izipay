"use client";

import React from "react";

interface LeaderboardEntry {
  img: string;
  name: string;
  location: string;
  score: number;
}

interface ProfilesProps {
  Leaderboard: LeaderboardEntry[];
}

const Profiles: React.FC<ProfilesProps> = ({ Leaderboard }) => {
  return <div id="profile">{Item(Leaderboard)}</div>;
};

const Item = (data: LeaderboardEntry[]) => {
  return (
    <>
      {data.map((value, index) => (
        <div className="flex justify-between gap-4 text-left mb-8" key={index}>
          <div className="flex items-center">
            <img
              src={value.img}
              alt={value.name}
              className="w-1/5 rounded-full"
            />
            <div className="p-4">
              <h3 className="text-emerald-300">{value.name}</h3>
              <span className="text-blue-200">{value.location}</span>
            </div>
          </div>
          <div className="flex items-center text-red-500">
            <span>{value.score}</span>
          </div>
        </div>
      ))}
    </>
  );
};
export default Profiles;
