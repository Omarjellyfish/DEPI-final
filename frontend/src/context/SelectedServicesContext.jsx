import React, { createContext, useState } from "react";

export const SelectedServicesContext = createContext();

export const SelectedServicesProvider = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0); // Add totalCost state

  return (
    <SelectedServicesContext.Provider
      value={{ selectedServices, setSelectedServices, totalCost, setTotalCost }} // Provide totalCost and its setter
    >
      {children}
    </SelectedServicesContext.Provider>
  );
};
