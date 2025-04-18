import { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
const GlobalProvider = ({ children }) => {
  const [name, setName] = useState("John Doe");

  return (
    <GlobalContext.Provider value={{ name, setName }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
