import { createContext, useState } from "react";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token") || null
  );

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
