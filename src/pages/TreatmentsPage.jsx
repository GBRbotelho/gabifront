// DashboardPage.js
import React, { useState, useEffect } from "react";
import { useGetAll, useDeleteData } from "../services/apiService";
import { Link } from "react-router-dom";
import { useLoading } from "../utils/LoadingContext";

function TreatmentsPage() {
  const token = localStorage.getItem("token");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [treatments, setTreatments] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    async function fetchTreatmentsData() {
      try {
        showLoading();
        const [clientData, treatmentsData, servicesData] = await Promise.all([
          useGetAll("clients", token),
          useGetAll("treatments", token),
          useGetAll("services", token),
        ]);
        setTreatments(treatmentsData);
        setClients(clientData);
        setServices(servicesData);
        hideLoading();
      } catch (error) {
        hideLoading();
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchTreatmentsData();
  }, []);

  const toggleDeleteTreatment = async (consultationId) => {
    showLoading();
    const consultations = await useGetAll("consultations", token);
    if (
      consultations.filter(
        (consultationItem) => consultationItem.service === consultationId
      ).length > 0
    ) {
      setError("Existe consultas com esse tratamento");
      hideLoading();
    } else {
      await useDeleteData(consultationId, "treatments", token);
      reloadTreatments();
      hideLoading();
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
              className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
              onClick={handleSearchClick}
            >
              <i className="ri-search-line"></i>
            </button>
            <div
              className={`dropdown-menu shadow-md shadow-black/5 z-30  max-w-xs w-full bg-white rounded-md border border-gray-100 ${
                isSearchOpen ? "block" : "hidden"
              }`}
            >
              <form action="" className="p-4 border-b border-b-gray-100">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                    placeholder="Search..."
                  />
                  <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"></i>
                </div>
              </form>
            </div>
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
            {treatments.length > 0 ? (
              treatments.map((treatment, index) => (
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
                <td className="px-4 py-3 text-gray-700 border" colSpan="5">
                  Não foram encontrados tratamentos cadastrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </section>
  );
}

export default TreatmentsPage;
