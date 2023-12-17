import React, { createContext, useContext, useState, useEffect } from "react";
import { useGetAll } from "../services/apiService";
import { useLoading } from "./LoadingContext";
import { useAuth } from "./AuthContext";
import { useFlashMessage } from "./FlashMessageContext";

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const { showLoading, hideLoading } = useLoading();
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const { logout } = useAuth();
  const showMessage = useFlashMessage();

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      try {
        const token = localStorage.getItem("token");
        const [
          usersData,
          clientsData,
          consultationsData,
          treatmentsData,
          servicesData,
          productsData,
        ] = await Promise.all([
          useGetAll("users", token),
          useGetAll("clients", token),
          useGetAll("consultations", token),
          useGetAll("treatments", token),
          useGetAll("services", token),
          useGetAll("products", token),
        ]);

        setUsers(usersData);
        setClients(clientsData);
        setTreatments(treatmentsData);
        setConsultations(consultationsData);
        setServices(servicesData);
        setProducts(productsData);
        hideLoading();
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        hideLoading();
      }
    };

    fetchData();
  }, []);

  const reload = async (setState, subroute) => {
    const data = await useGetAll(subroute, token);
    if (data.error === 450) {
      logout();
      showMessage("Faça login novamente, por conta da inatividade!", "error");
    } else {
      setState(data);
    }
  };

  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        clients,
        setClients,
        treatments,
        setTreatments,
        consultations,
        setConsultations,
        services,
        setServices,
        products,
        setProducts,
        reload,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
