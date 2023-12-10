import React, { useEffect } from "react";
import { useAuth } from "../../utils/AuthContext"; // Importe o useAuth
import Sidebar from "../menus/Sidebar";
import MainLayout from "./MainLayout";
import { useNavigate } from "react-router-dom";
import { FlashMessageProvider } from "../../utils/FlashMessageContext";

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
  }, [user, token]);

  return (
    <>
      <FlashMessageProvider>
        <Sidebar />
        <MainLayout>{children}</MainLayout>
      </FlashMessageProvider>
    </>
  );
}

export default DashboardLayout;
