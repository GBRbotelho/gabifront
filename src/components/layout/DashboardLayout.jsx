import React from "react";
import { useAuth } from "../../utils/AuthContext"; // Importe o useAuth
import Sidebar from "../menus/Sidebar";
import MainLayout from "./MainLayout";
import { useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const { token, isLoading } = useAuth(); // Obtenha o token e o isLoading do useAuth

  if (isLoading) {
    // Renderize algum indicador de carregamento, se necessário
    return <div>Carregando...</div>;
  }

  if (!token) {
    navigate("/");
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
