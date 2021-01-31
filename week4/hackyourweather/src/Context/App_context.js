import { createContext, useState } from 'react';

export const AppContext = createContext({});
export const AppContextProvider = ({ children }) => {
  const [fetchCities, setFetchCities] = useState([]);

  const value = {
    fetchCities,
    setFetchCities,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
