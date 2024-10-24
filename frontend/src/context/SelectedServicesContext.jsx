import React, { createContext, useState } from "react";

export const SelectedServicesContext = createContext();

export const SelectedServicesProvider = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  
  // Define state variables with their setters
  const [year, setSelectedYear] = useState(2024);
  const [month, setSelectedMonth] = useState(10);
  const [day, setSelectedDay] = useState(1);
  const [timeSlot, setSelectedTimeSlot] = useState("05:00 PM");

  return (
    <SelectedServicesContext.Provider
      value={{
        selectedServices,
        setSelectedServices,
        totalCost,
        setTotalCost,
        year, 
        setSelectedYear, 
        month, 
        setSelectedMonth, 
        day, 
        setSelectedDay, 
        timeSlot, 
        setSelectedTimeSlot 
      }}
    >
      {children}
    </SelectedServicesContext.Provider>
  );
};
