import React, { useEffect } from "react";
import { useAuth } from "../../utils/AuthContext"; // Importe o useAuth
import Sidebar from "../menus/Sidebar";
import MainLayout from "./MainLayout";
import { useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { isLoading, user } = useAuth(); // Obtenha o token e o isLoading do useAuth

  useEffect(() => {
    if (!token) {
      // Verifique se o token ou o usuário é nulo
      navigate("/");
    }
    if (user) {
      if (user.isEmailVerified === false) {
        navigate("/confirmation");
      }
    }
  });

  return (
    <>
      {isLoading && <div>Carregando...</div>}
      {!isLoading && (
        <>
          <Sidebar />
          <MainLayout>{children}</MainLayout>
        </>
      )}
    </>
  );
}

export default DashboardLayout;
