// DashboardPage.js
import React, { useEffect, useState } from "react";
import { useGetAll } from "../services/apiService";
import { Link } from "react-router-dom";

function DashboardPage() {
  const [consultations, setConsultations] = useState([]);
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchTreatmentsData() {
      try {
        const [clientData, consultationData] = await Promise.all([
          useGetAll("clients", token),
          useGetAll("consultations", token),
        ]);
        setConsultations(consultationData);
        setClients(clientData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchTreatmentsData();
  }, []);
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="flex items-center w-full overflow-y-auto">
        <ul className="ml-auto flex items-center">
          <li className="mr-1 dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
            >
              <i className="ri-search-line"></i>
            </button>
          </li>
        </ul>
      </div>

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
            {consultations.length > 0 ? (
              consultations.map((consultationItem, index) => (
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
                    {" "}
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
                  Não foram encontrados tratamentos cadastrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DashboardPage;
