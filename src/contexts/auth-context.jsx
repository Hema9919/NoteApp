import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  const handleSetToken = (token) => {
    localStorage.setItem("userToken", token);
    setToken(token);
  };

  const handleRemoveToken = () => {
    localStorage.removeItem("userToken");
    setToken(null);
  };

  const values = {
    token,
    handleSetToken,
    handleRemoveToken,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;