// DashboardPage.js
import React, { useState, useEffect } from "react";
import { useGetAll, useDeleteData } from "../services/apiService";
import { Link } from "react-router-dom";
import { useLoading } from "../utils/LoadingContext";
import ModalFiltrosTratamentos from "../components/forms/filtros/ModalFiltrosTratamentos";
import { useData } from "../utils/DataContext";
import { useFlashMessage } from "../utils/FlashMessageContext";

function TreatmentsPage() {
  const token = localStorage.getItem("token");
  const {
    treatments,
    setTreatments,
    clients,
    setClients,
    services,
    setServices,
    consultations,
    setConsultations,
    reload,
  } = useData();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [filters, setFilters] = useState(false);
  const [andamentos, setAndamentos] = useState(true);
  const [concluidos, setConcluidos] = useState(false);
  const [selectService, setSelectService] = useState("all");
  const [selectTime, setSelectTime] = useState("all");
  const showMessage = useFlashMessage();

  const filteredTreatment = treatments
    .filter((treatmentItem) => {
      return (
        (concluidos && treatmentItem.status === "Concluído") ||
        (andamentos && treatmentItem.status === "Em andamento")
      );
    })
    .filter((treatmentItem) => {
      if (selectService === "all") {
        return true;
      } else {
        return (
          treatmentItem.name ===
          services.find((serviceItem) => serviceItem._id === selectService)._id
        );
      }
    })
    .filter((treatmentItem) => {
      if (selectTime === "all") {
        return true;
      } else if (selectTime === "1session") {
        return (
          treatmentItem.totalSessions - treatmentItem.sessionsCompleted === 1
        );
      }
    });

  useEffect(() => {
    reload(setTreatments, "treatments");
    reload(setClients, "clients");
    reload(setServices, "services");
  }, []);

  const toggleDeleteTreatment = async (consultationId) => {
    showLoading();
    await reload(setConsultations, "consultations");
    if (
      consultations.filter(
        (consultationItem) => consultationItem.service === consultationId
      ).length > 0
    ) {
      hideLoading();
      showMessage("Existe consultas com esse tratamento", "error");
    } else {
      await useDeleteData(consultationId, "treatments", token);
      reloadTreatments();
      hideLoading();
      showMessage("Tratamento Deletado com sucesso!", "success");
    }
  };

  const reloadTreatments = async () => {
    showLoading();
    try {
      const token = await localStorage.getItem("token");
      const data = await useGetAll("treatments", token); // Passe o token na chamada
      setTreatments(data);
      hideLoading();
    } catch (error) {
      console.error("Erro ao buscar tratamentos:", error);
      hideLoading();
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsSearchOpen(!isSearchOpen);
  };
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="flex items-center w-full overflow-y-auto">
        <ul className="ml-auto flex items-center">
          <li className="mr-1 dropdown">
            <button
              type="button"
              className="text-black rounded bg-gray-200 w-28 h-9 hover:bg-gray-50 hover:text-gray-600"
              onClick={() => setFilters(true)}
            >
              <i className="ri-equalizer-line px-2"></i>Filtros
            </button>
          </li>
        </ul>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="px-4 py-3 text-center">Nome do Cliente</th>
              <th className="px-4 py-3 text-center">Serviço</th>
              <th className="px-4 py-3 text-center">Sessões Concluídas</th>
              <th className="px-4 py-3 text-center">Total de Sessões</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Options</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredTreatment.length > 0 ? (
              filteredTreatment.map((treatment, index) => (
                <tr key={index} className="text-gray-700">
                  <td
                    className="px-4 py-3 border text-center"
                    key={`clientId_${treatment._id}`}
                  >
                    {clients
                      .filter(
                        (clientItem) => clientItem._id === treatment.clientId
                      )
                      .map((item) => item.name)}
                  </td>
                  <td
                    className="px-4 py-3 text-ms border text-center"
                    key={`name_${treatment._id}`}
                  >
                    {services
                      .filter(
                        (serviceItem) => serviceItem._id === treatment.name
                      )
                      .map((item) => item.name)}
                  </td>
                  <td
                    className="px-4 py-3 text-ms border text-center"
                    key={`sessionsCompleted_${treatment._id}`}
                  >
                    {treatment.sessionsCompleted}
                  </td>
                  <td
                    className="px-4 py-3 text-ms border text-center"
                    key={`totalSessions_${treatment._id}`}
                  >
                    {treatment.totalSessions}
                  </td>
                  {treatment.status === "Concluído" && (
                    <td className="px-4 py-3 border text-center">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {treatment.status}
                      </span>
                    </td>
                  )}
                  {treatment.status === "Em andamento" && (
                    <td className="px-4 py-3 border text-center">
                      <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-sm">
                        {treatment.status}
                      </span>
                    </td>
                  )}
                  <td
                    className="px-2 py-3 border options-cell"
                    style={{ width: "50px" }}
                    key={`options_${treatment._id}`}
                  >
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/dashboard/tratamentos/${treatment.clientId}/${treatment._id}`}
                        className="w-8 h-8 text-green-500 transform hover:scale-110 transition-transform"
                      >
                        <i className="ri-eye-line text-3xl"></i>
                      </Link>
                      <button
                        className="w-8 h-8 text-red-500 transform hover:scale-110 transition-transform"
                        onClick={() => {
                          toggleDeleteTreatment(treatment._id);
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
                <td className="px-4 py-3 text-gray-700 border" colSpan="6">
                  Não foram encontrados tratamentos cadastrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filters && (
        <ModalFiltrosTratamentos
          setFilters={setFilters}
          andamentos={andamentos}
          setAndamentos={setAndamentos}
          concluidos={concluidos}
          setConcluidos={setConcluidos}
          services={services}
          selectService={selectService}
          setSelectService={setSelectService}
          selectTime={selectTime}
          setSelectTime={setSelectTime}
        />
      )}
    </section>
  );
}

export default TreatmentsPage;
