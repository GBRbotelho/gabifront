import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext"; // Importe o useAuth
import Sidebar from "../menus/Sidebar";
import MainLayout from "./MainLayout";
import { useNavigate } from "react-router-dom";
import { FlashMessageProvider } from "../../utils/FlashMessageContext";
import { useGetAll, useUpdateData } from "../../services/apiService";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const { token, isLoading, user } = useAuth(); // Obtenha o token e o isLoading do useAuth
  const [products, setProducts] = useState();

  useEffect(() => {
    if (token === "NO") {
      navigate("/");
    } else if (user) {
      if (token && user.isEmailVerified === "NO") {
        navigate("/confirmation");
      }
    }
  }, [user, token]);

  useEffect(() => {
    const FetchProducts = async () => {
      const tokenLocal = localStorage.getItem("token");
      const data = await useGetAll("products", tokenLocal);
      setProducts(data);
    };
    FetchProducts(); // Adicione os parênteses para chamar a função
  }, []);

  useEffect(() => {
    const updateProducts = async () => {
      if (products) {
        products.map(async (productItem) => {
          const DateToday = new Date();
          const ValidateDate = new Date(productItem.validade);
          ValidateDate.setDate(ValidateDate.getDate() + 1);

          console.log(DateToday);
          console.log(ValidateDate);
          if (
            ValidateDate < DateToday &&
            productItem.status !== "Indisponivel"
          ) {
            productItem.status = "Indisponivel";
            await useUpdateData(
              productItem._id,
              "products",
              productItem,
              token
            );
          }
        });
      }
    };

    updateProducts();
  }, [products]);

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
