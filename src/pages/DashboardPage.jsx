// DashboardPage.js
import React, { useEffect, useState } from "react";
import { useGetAll } from "../services/apiService";
import { Link } from "react-router-dom";
import ModalFiltrosDashboard from "../components/forms/filtros/ModalFiltrosDashboard";
import { useLoading } from "../utils/LoadingContext";

function DashboardPage() {
  const [filters, setFilters] = useState(false);
  const [consultations, setConsultations] = useState([]);
  const [clients, setClients] = useState([]);
  const [initialDate, setInitialDate] = useState(
    new Date()
      .toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" })
      .split("-")
      .map((part, index) => (index === 0 ? part : part.padStart(2, "0")))
      .join("-")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [concluidos, setConcluidos] = useState(false);
  const [faltas, setFaltas] = useState(false);
  const [agendados, setAgendados] = useState(true);
  const { showLoading, hideLoading } = useLoading();

  const sixDaysLater = new Date();
  sixDaysLater.setDate(sixDaysLater.getDate() + 6);
  const [finalDate, setFinalDate] = useState(
    sixDaysLater.toISOString().split("T")[0]
  );
  const token = localStorage.getItem("token");
  const DateFilter = consultations
    .filter((consultationItem) => {
      const consultationDate = new Date(consultationItem.date).getTime();
      const startDate = initialDate ? new Date(initialDate).getTime() : null;
      const endDate = finalDate ? new Date(finalDate).getTime() : null;

      return (
        (!startDate || consultationDate >= startDate) &&
        (!endDate || consultationDate <= endDate)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (dateA === dateB) {
        // Se as datas são iguais, comparar pelos horários
        const timeA = new Date(`1970-01-01T${a.time}`).getTime();
        const timeB = new Date(`1970-01-01T${b.time}`).getTime();
        return timeA - timeB;
      }

      return dateA - dateB;
    })
    .filter((consultationItem) => {
      return (
        (concluidos && consultationItem.status === "Concluído") ||
        (agendados && consultationItem.status === "Agendado") ||
        (faltas && consultationItem.status === "Faltou")
      );
    })

    .filter((consultationItem) => {
      const formattedDate = new Date(
        new Date(consultationItem.date).getTime() + 24 * 60 * 60 * 1000
      ).toLocaleDateString("pt-BR");

      // Obtenha o nome do cliente usando a filtragem nos clientes
      const clientName =
        clients.find((clientItem) => clientItem._id === consultationItem.client)
          ?.name || "";

      // Converta para minúsculas antes de comparar
      const searchTermLower = searchTerm.toLowerCase();

      // Converta clientName e status para minúsculas antes de comparar
      const clientNameLower = clientName.toLowerCase();
      const statusLower = consultationItem.status?.toLowerCase() || "";

      // Adicione verificações para evitar erros se as propriedades estiverem indefinidas
      return (
        (formattedDate && formattedDate.includes(searchTermLower)) ||
        (consultationItem.time &&
          consultationItem.time.includes(searchTermLower)) ||
        (clientNameLower && clientNameLower.includes(searchTermLower)) ||
        (statusLower && statusLower.includes(searchTermLower))
      );
    });

  useEffect(() => {
    async function fetchTreatmentsData() {
      try {
        showLoading();
        const [clientData, consultationData] = await Promise.all([
          useGetAll("clients", token),
          useGetAll("consultations", token),
        ]);
        setConsultations(consultationData);
        setClients(clientData);
        hideLoading();
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchTreatmentsData();
  }, []);

  function toggleFilters() {
    setFilters(!filters);
  }

  return (
    <section className="container mx-auto p-6 font-mono">
      <h2 className="font-semibold text-xl text-gray-600">Consultas</h2>
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

            <li className="mr-1">
              <button
                type="button"
                className="text-black rounded bg-gray-200 w-28 h-9 hover:bg-gray-50 hover:text-gray-600"
                onClick={toggleFilters}
              >
                <i className="ri-equalizer-line px-2"></i>Filtros
              </button>
            </li>
          </ul>
        </div>
        {filters && (
          <ModalFiltrosDashboard
            toggleFilters={toggleFilters}
            initialDate={initialDate}
            setInitialDate={setInitialDate}
            finalDate={finalDate}
            setFinalDate={setFinalDate}
            concluidos={concluidos}
            setConcluidos={setConcluidos}
            agendados={agendados}
            setAgendados={setAgendados}
            faltas={faltas}
            setFaltas={setFaltas}
          />
        )}

        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3 text-center">Data da Consulta</th>
                <th className="px-4 py-3 text-center">Horario</th>
                <th className="px-4 py-3 text-center">Nome do Cliente</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Options</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {DateFilter.length > 0 ? (
                DateFilter.map((consultationItem, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="px-4 py-3 text-ms border text-center">
                      {new Date(
                        new Date(consultationItem.date).getTime() +
                          24 * 60 * 60 * 1000
                      ).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-ms border text-center">
                      {consultationItem.time}
                    </td>
                    <td className="px-4 py-3 text-ms border text-center">
                      {clients
                        .filter(
                          (clientItem) =>
                            clientItem._id === consultationItem.client
                        )
                        .map((item) => item.name)}
                    </td>
                    {consultationItem.status === "Concluído" && (
                      <td className="px-4 py-3 border text-center">
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                          {consultationItem.status}
                        </span>
                      </td>
                    )}
                    {consultationItem.status === "Faltou" && (
                      <td className="px-4 py-3 border text-center">
                        <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                          {consultationItem.status}
                        </span>
                      </td>
                    )}
                    {consultationItem.status === "Agendado" && (
                      <td className="px-4 py-3 border text-center">
                        <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-sm">
                          {consultationItem.status}
                        </span>
                      </td>
                    )}
                    <td
                      className="px-2 py-3 border options-cell"
                      style={{ width: "50px" }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`/dashboard/clientes/view/${consultationItem.client}`}
                          className="w-8 h-8 text-green-500 transform hover:scale-110 transition-transform"
                        >
                          <i className="ri-eye-line text-3xl"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-3 text-gray-700 border" colSpan="5">
                    Não foram encontrados consultas para{" "}
                    {searchTerm ? `"${searchTerm}" nesse ` : `esse`} periodo de
                    tempo.
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

export default DashboardPage;
