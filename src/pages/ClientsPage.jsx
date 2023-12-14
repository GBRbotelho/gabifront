import React, { useState, useEffect } from "react";
import {
  fetchClients,
  deleteClient,
  useGetId,
  useGetAll,
  useDeleteData,
} from "../services/apiService";
import { Link } from "react-router-dom";
import { useForm } from "../utils/useForm";
import ModalFiltrosClients from "../components/forms/filtros/ModalFiltrosClients";
import { useFlashMessage } from "../utils/FlashMessageContext";
import { useLoading } from "../utils/LoadingContext";

function ClientsPage() {
  const token = localStorage.getItem("token");
  const [consultations, setConsultations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [filters, setFilters] = useState(false);
  const [selectTime, setSelectTime] = useState("all");
  const [selectMonth, setSelectMonth] = useState("all");
  const showMessage = useFlashMessage();
  const { showLoading, hideLoading } = useLoading();

  const FilteredData = clients
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((clientItem) => {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      console.log(normalizedSearchTerm);

      // Verifica se o termo de pesquisa está presente em qualquer um dos campos
      return (
        clientItem.name.toLowerCase().includes(normalizedSearchTerm) ||
        new Date(new Date(clientItem.date).getTime() + 24 * 60 * 60 * 1000)
          .toLocaleDateString("pt-BR")
          .includes(normalizedSearchTerm) ||
        useForm(clientItem.phone, "telefone").includes(normalizedSearchTerm) ||
        (clientItem.email &&
          clientItem.email.toLowerCase().includes(normalizedSearchTerm))
      );
    })
    .filter((clientItem) => {
      const consultationsClient = consultations.filter((consultationItem) => {
        return (
          consultationItem.client === clientItem._id &&
          consultationItem.status === "Concluído"
        );
      });

      if (selectTime === "all") {
        return clientItem;
      }
      if (selectTime === "1month") {
        const OneMonthBefore = new Date();
        OneMonthBefore.setMonth(OneMonthBefore.getMonth() - 1);
        if (
          consultationsClient.filter((consultationItem) => {
            console.log(new Date(consultationItem.date));
            console.log(OneMonthBefore);
            return new Date(consultationItem.date) < OneMonthBefore;
          }).length > 0
        ) {
          return clientItem;
        }
      }

      if (selectTime === "6months") {
        const OneMonthBefore = new Date();
        OneMonthBefore.setMonth(OneMonthBefore.getMonth() - 6);
        if (
          consultationsClient.filter((consultationItem) => {
            console.log(new Date(consultationItem.date));
            console.log(OneMonthBefore);
            return new Date(consultationItem.date) < OneMonthBefore;
          }).length > 0
        ) {
          return clientItem;
        }
      }

      if (selectTime === "12months") {
        const OneMonthBefore = new Date();
        OneMonthBefore.setMonth(OneMonthBefore.getMonth() - 12);
        if (
          consultationsClient.filter((consultationItem) => {
            console.log(new Date(consultationItem.date));
            console.log(OneMonthBefore);
            return new Date(consultationItem.date) < OneMonthBefore;
          }).length > 0
        ) {
          return clientItem;
        }
      }
    })
    .filter((clientItem) => {
      const birthdayMonth = new Date(clientItem.date).getMonth() + 1;

      if (selectMonth === "all") {
        return true; // Não filtra por mês
      }

      const selectedMonth = parseInt(selectMonth);

      return birthdayMonth === selectedMonth;
    });

  useEffect(() => {
    async function fetchClientsData() {
      try {
        showLoading();
        const [clientsData, consultationsData] = await Promise.all([
          await useGetAll("clients", token),
          await useGetAll("consultations", token),
        ]);
        setClients(clientsData);
        setConsultations(consultationsData);
        hideLoading();
      } catch (error) {
        hideLoading();
        console.error("Erro ao buscar clientes:", error);
      }
    }

    fetchClientsData();
  }, []);

  const reloadClients = async () => {
    showLoading();
    const response = await useGetAll("clients", token);
    setClients(response);
    hideLoading();
  };

  const handleDeleteClient = async (clientId) => {
    try {
      showLoading();
      const consultations = await useGetId(
        clientId,
        "consultations/client",
        token
      );

      if (
        consultations.filter(
          (consultationItem) => consultationItem.status === "Agendado"
        ).length > 0
      ) {
        hideLoading();
        showMessage(
          "Não pode excluir este cliente, porque existe consultas pendentes!",
          "error"
        );
      } else {
        await useDeleteData(clientId, "consultations/client", token);
        await useDeleteData(clientId, "treatments/client", token);

        const response = await useDeleteData(clientId, "clients", token);
        reloadClients();
      }
    } catch (error) {
      hideLoading();
      console.error("Erro ao excluir cliente:", error);
    }
  };

  return (
    <section className="container mx-auto p-6 font-mono">
      <h2 className="font-semibold text-xl text-gray-600">Clientes</h2>
      <div className="bg-white p-3.5 rounded-3xl shadow-lg">
        <div className="flex items-center py-1">
          <ul className="w-full flex flex-col lg:flex-row justify-between">
            <li className="flex border items-center mb-2 lg:mb-0">
              <div className="relative">
                <input
                  type="text"
                  className="px-2 text-gray-400 w-38 h-8 rounded pl-8 flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
                  placeholder="Procurar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="ri-search-line absolute left-2 top-1 h-4"></i>
              </div>
            </li>
            <div className="flex">
              <li className="mr-1">
                <button
                  type="button"
                  className="text-black rounded bg-gray-200 w-28 h-9 hover:bg-gray-50 hover:text-gray-600"
                  onClick={() => setFilters(true)}
                >
                  <i className="ri-equalizer-line px-2"></i>Filtros
                </button>
              </li>
              <Link
                to="/dashboard/clientes/add"
                className=" text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-green-600"
              >
                <i className="ri-user-add-fill"></i>
              </Link>
            </div>
          </ul>
        </div>
        {filters && (
          <ModalFiltrosClients
            setModalFiltersClients={setFilters}
            selectTime={selectTime}
            setSelectTime={setSelectTime}
            selectMonth={selectMonth}
            setSelectMonth={setSelectMonth}
          />
        )}

        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Data de Nascimento</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Options</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {FilteredData.length > 0 ? (
                FilteredData.map((client, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="px-4 py-3 border" key={`name_${client.id}`}>
                      {client.name}
                    </td>
                    <td className="px-4 py-3 border" key={`date_${client.id}`}>
                      {new Date(
                        new Date(client.date).getTime() + 24 * 60 * 60 * 1000
                      ).toLocaleDateString("pt-BR")}
                    </td>
                    <td
                      className="px-4 py-3 text-ms font-semibold border relative"
                      key={`phone_${client.id}`}
                    >
                      <div className="flex">
                        <p className="">{useForm(client.phone, "telefone")}</p>
                        <a href={`https://wa.me/${client.phone}`}>
                          <i
                            className="ri-whatsapp-line absolute right-5 text-green-500 text-2xl scale-75 transition-transform"
                            onMouseOver={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.transform = "scale(0.75)")
                            }
                          ></i>
                        </a>
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 text-ms font-semibold border"
                      key={`email_${client.id}`}
                    >
                      {client.email}
                    </td>
                    <td
                      className="px-2 py-3 border options-cell"
                      style={{ width: "50px" }}
                      key={`options_${client.id}`}
                    >
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/dashboard/clientes/view/${client._id}`}
                          className="w-8 h-8 text-green-500 transform hover:scale-110 transition-transform"
                        >
                          <i className="ri-eye-line text-3xl"></i>
                        </Link>
                        <button
                          className="w-8 h-8 text-red-500 transform hover:scale-110 transition-transform"
                          onClick={() => {
                            handleDeleteClient(client._id);
                          }}
                        >
                          <i className="ri-delete-bin-5-line text-3xl"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-3 text-gray-700 border" colSpan="5">
                    Não foram encontrados clientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ClientsPage;
