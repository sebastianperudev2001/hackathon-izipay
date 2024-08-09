import React, { useState, useEffect } from "react";

interface ChangingProgressProviderProps {
  values: number[];
  interval?: number;
  children: (value: number) => React.ReactNode;
}

const ChangingProgressProvider: React.FC<ChangingProgressProviderProps> = ({
  values,
  interval = 1000,
  children,
}) => {
  const [valuesIndex, setValuesIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValuesIndex((prevIndex) => (prevIndex + 1) % values.length);
    }, interval);

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, [values, interval]);

  return <>{children(values[valuesIndex])}</>;
};

export default ChangingProgressProvider;
