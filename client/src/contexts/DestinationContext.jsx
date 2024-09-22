import { createContext, useContext, useState } from "react";

const DestinationContext = createContext();

export const useDestination = () => useContext(DestinationContext);

export const DestinationProvider = ({ children }) => {
  const [destinations, setDestinations] = useState([]);

  return (
    <DestinationContext.Provider value={{ destinations, setDestinations }}>
      {children}
    </DestinationContext.Provider>
  );
};
