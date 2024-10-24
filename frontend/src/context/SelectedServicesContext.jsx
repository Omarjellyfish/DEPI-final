import React, { createContext, useState } from "react";

export const SelectedServicesContext = createContext();

export const SelectedServicesProvider = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  return (
    <SelectedServicesContext.Provider
      value={{ selectedServices, setSelectedServices, totalCost, setTotalCost }}
    >
      {children}
    </SelectedServicesContext.Provider>
  );
};
