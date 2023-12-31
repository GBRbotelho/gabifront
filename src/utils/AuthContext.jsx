import React, { createContext, useContext, useState, useEffect } from "react";
import { verifyToken, useGetUserData } from "../services/authService"; // Adicione a função para obter dados do usuário
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // Adicione o estado para armazenar informações do usuário
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const tokenRenewed = await verifyToken();
      if (!tokenRenewed) {
        setToken("NO");
        localStorage.removeItem("token");
      }
      if (tokenRenewed.error) {
        setToken("NO");
        localStorage.removeItem("token");
      }

      if (!tokenRenewed.error) {
        setToken(tokenRenewed.token);
        const userData = await useGetUserData(tokenRenewed.token);
        setUser(userData);
      }
      setIsLoading(false);
    };

    checkToken();
  }, [token]);

  const loginWithToken = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const reloadUser = async () => {
    const token = localStorage.getItem("token");
    const userData = await useGetUserData(token);
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser,
        reloadUser,
        isLoading,
        loginWithToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
