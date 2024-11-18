import React, { createContext, useState, useContext } from "react";

// Create the ColorContext
const ColorContext = createContext();

// ColorContextProvider component
const ColorContextProvider = ({ children }) => {
  const [color, setColor] = useState("bg-gray-950");

  // Function to toggle the color
  const toggleColor = () => {
    setColor((prevColor) =>
      prevColor === "bg-gray-950" ? "bg-white" : "bg-gray-950"
    );
  };

  return (
    <ColorContext.Provider value={{ color, toggleColor }}>
      {children} {/* Render children here */}
    </ColorContext.Provider>
  );
};

// Custom hook to use the ColorContext
export const useColor = () => useContext(ColorContext);

export default ColorContextProvider;
