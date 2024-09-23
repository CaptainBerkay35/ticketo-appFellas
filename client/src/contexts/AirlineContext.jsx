import  { createContext, useContext, useState } from "react";

const AirlineContext = createContext();

export const useAirline = () => useContext(AirlineContext);

export const AirlineProvider = ({ children }) => {
  const [airlines, setAirlines] = useState([]);

  return (
    <AirlineContext.Provider value={{ airlines, setAirlines }}>
      {children}
    </AirlineContext.Provider>
  );
};

