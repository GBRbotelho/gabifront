import React, { useEffect } from "react";
import { useAuth } from "../../utils/AuthContext"; // Importe o useAuth
import Sidebar from "../menus/Sidebar";
import MainLayout from "./MainLayout";
import { useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const { token, isLoading, user } = useAuth(); // Obtenha o token e o isLoading do useAuth

  useEffect(() => {
    if (token === "NO") {
      navigate("/");
    } else if (user) {
      if (token && user.isEmailVerified === "NO") {
        navigate("/confirmation");
      }
    }
  }, [user, token, isLoading]);

  if (isLoading) {
    // Renderize algum indicador de carregamento, se necessário
    return <div>Carregando...</div>;
  }

  // O usuário está autenticado, renderize o layout do dashboard
  return (
    <>
      <Sidebar />
      <MainLayout>{children}</MainLayout>
    </>
  );
}

export default DashboardLayout;
