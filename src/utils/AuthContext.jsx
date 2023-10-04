import React, { createContext, useContext, useState, useEffect } from "react";
import { verifyToken } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const tokenRenewed = await verifyToken();
      setIsLoading(false);

      if (tokenRenewed) {
        setToken(tokenRenewed);
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
