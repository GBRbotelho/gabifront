import React, { createContext, useContext, useState, useEffect } from "react";
import { verifyToken, useGetUserData } from "../services/authService"; // Adicione a função para obter dados do usuário

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // Adicione o estado para armazenar informações do usuário
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const tokenRenewed = await verifyToken();
      setIsLoading(false);

      if (tokenRenewed) {
        setToken(tokenRenewed);
        const tokenLocal = localStorage.getItem("token");
        const userData = await useGetUserData(tokenLocal);
        console.log(userData);
        setUser(userData); // Defina as informações do usuário no estado
      }
    };

    checkToken();
  }, []);

  const loginWithToken = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isLoading, loginWithToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
