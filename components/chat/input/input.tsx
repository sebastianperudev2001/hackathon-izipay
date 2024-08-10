"use client"; // Mark this component as a Client Component

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import React from "react";
import { Input, Icon } from "semantic-ui-react";

interface InputComponentProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (text: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  input,
  setInput,
  sendMessage,
}) => {
  const placeholders = [
    "¿Cuáles son las ventas totales de este mes?",
    "¿Cómo se comparan las ventas de este trimestre con el trimestre pasado?",
    "¿Qué productos tienen las mayores ventas en el último año?",
    "¿Cuál es la tendencia de ventas de los últimos seis meses?",
    "¿Cómo se distribuyen las ventas por región geográfica?",
    "¿Cuál es el producto con el mayor incremento en ventas este mes?",
    "¿Cómo varían las ventas entre los diferentes canales de distribución?",
    "¿Cuál es el promedio de ventas diarias en el último mes?",
    "¿Qué días de la semana tienen las mayores ventas?",
    "¿Cómo se han comportado las ventas en comparación con las proyecciones del año?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    sendMessage(input);
  };

  return (
    <>
      <div className="absolute mb-5 bottom-0 left-0 right-0 h-16 z-20 flex justify-center items-center px-4">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={(e) => setInput(e.target.value)}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default InputComponent;
