import React from "react";
import { FaTrash } from "react-icons/fa";

interface HeaderProps {
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ setMessages, input, setInput }) => {
  return (
    <div className="top-0 left-0 w-full z-10 bg-white dark:bg-neutral-900 shadow-lg backdrop-blur-sm border-b border-white/30 p-4 rounded-t-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Generador de reportes IA
        </h1>
        <FaTrash
          className="text-gray-600 dark:text-white cursor-pointer transition-colors duration-300 ease-in-out"
          onClick={() => setMessages([])}
        />
      </div>
    </div>
  );
};

export default Header;
