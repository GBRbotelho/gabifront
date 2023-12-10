import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetId, useGetAll } from "../services/apiService";
import { useLoading } from "../utils/LoadingContext";

export default function TreatmentViewerPage() {
  const [client, setClient] = useState({});
  const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState({});
  const [products, setProducts] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { clientid, treatmentid } = useParams();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    async function fetchTreatmentsData() {
      showLoading();
      try {
        const [
          clientData,
          treatmentsData,
          servicesData,
          consultationsData,
          productsData,
        ] = await Promise.all([
          useGetId(clientid, "clients", token),
          useGetId(treatmentid, "treatments", token),
          useGetAll("services", token),
          useGetId(clientid, "consultations/client", token),
          useGetAll("products", token),
        ]);
        setTreatment(treatmentsData);
        setClient(clientData);
        setServices(servicesData);
        setConsultations(consultationsData);
        setProducts(productsData);
        hideLoading();
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchTreatmentsData();
  }, []);

  return (
    <div className=" min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Dados do Tratamento
          </h2>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-3">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                  <div className="md:col-span-2">
                    <label htmlFor="name">Nome do Cliente</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      disabled={isEditable}
                      value={client.name || ""}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="cpf">CPF</label>
                    <input
                      name="cpf"
                      id="cpf"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      disabled={isEditable}
                      value={client.cpf || ""}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="name">Email</label>
                    <div className="flex items-center">
                      <input
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-white"
                        disabled={isEditable}
                        value={client.email || ""}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="name">Serviço</label>
                    <div className="flex items-center">
                      <input
                        name="name"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-white"
                        disabled={isEditable}
                        value={services
                          .filter(
                            (serviceItem) => serviceItem._id === treatment.name
                          )
                          .map((item) => item.name)}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <label htmlFor="price">Valor</label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      disabled={isEditable}
                      value={`R$ ${treatment.price}`}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label htmlFor="sessionsCompleted">
                      Sessões Concluídas
                    </label>
                    <input
                      type="text"
                      name="sessionsCompleted"
                      id="sessionsCompleted"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      disabled={isEditable}
                      value={treatment.sessionsCompleted}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label htmlFor="totalSessions">Nº Total de Sessões</label>
                    <input
                      type="text"
                      name="totalSessions"
                      id="totalSessions"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      disabled={isEditable}
                      value={treatment.totalSessions}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label htmlFor="status">Status</label>
                    <input
                      type="text"
                      name="status"
                      id="status"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      disabled={isEditable}
                      value={treatment.status}
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label htmlFor="description">Descrição do Tratamento</label>
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      className="h-20 border mt-1 rounded px-4 w-full bg-white"
                      disabled={isEditable}
                      value={treatment.description || ""}
                    />
                  </div>

                  <div className="md:col-span-6 text-right">
                    <div className="flex justify-between gap-1">
                      <button
                        className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate(-1)}
                      >
                        <i className="ri-arrow-go-back-fill"></i> Voltar
                      </button>
                    </div>
                  </div>
                </div>
                <h2 className="font-semibold text-xl text-gray-600 mt-6">
                  Consultas
                </h2>
                {consultations.filter(
                  (consultation) => consultation.service === treatment._id
                ).length > 0 ? (
                  consultations
                    .filter(
                      (consultation) => consultation.service === treatment._id
                    )
                    .map((consultation) => {
                      return (
                        <div key={consultation._id}>
                          <div className="bg-gray-300 my-6 h-0.5"></div>
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 col-span-1 md:grid-cols-3 ">
                              <div className="md:col-span-1">
                                <label htmlFor="date">Data</label>
                                <input
                                  type="date"
                                  name="date"
                                  id="date"
                                  className="h-10 border mt-1 rounded px-4 w-full bg-white text-center"
                                  disabled={isEditable}
                                  value={
                                    consultation.date
                                      ? new Date(consultation.date)
                                          .toISOString()
                                          .split("T")[0]
                                      : ""
                                  }
                                />
                              </div>
                              <div className="md:col-span-1">
                                <label htmlFor="time">Horario</label>
                                <input
                                  type="text"
                                  name="time"
                                  id="time"
                                  className="h-10 border mt-1 rounded px-4 w-full bg-white text-center"
                                  disabled={isEditable}
                                  value={consultation.time}
                                />
                              </div>
                              <div className="md:col-span-1">
                                <label htmlFor="status">Status</label>
                                <input
                                  type="text"
                                  name="status"
                                  id="status"
                                  className="h-10 border mt-1 rounded px-4 w-full bg-white text-center"
                                  disabled={isEditable}
                                  value={consultation.status}
                                />
                              </div>

                              <div className="md:col-span-3">
                                <label htmlFor="description">
                                  Descrição da Consulta
                                </label>
                                <textarea
                                  type="text"
                                  name="description"
                                  id="description"
                                  className="h-20 border mt-1 rounded px-4 w-full bg-white"
                                  disabled={isEditable}
                                  value={consultation.description || ""}
                                />
                              </div>
                            </div>
                            <div className="md:col-span-1">
                              <label htmlFor="products">
                                Informações dos produtos usados na consulta
                              </label>
                              <table className="w-full border border-collapse">
                                <thead>
                                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3 text-center">
                                      Nome
                                    </th>
                                    <th className="px-4 py-3 text-center">
                                      Lote
                                    </th>
                                    <th className="px-4 py-3 text-center">
                                      Validade
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {consultation.products.length > 0 ? (
                                    consultation.products.map((productId) => {
                                      const productItem = products.find(
                                        (product) => product._id === productId
                                      );

                                      if (!productItem) {
                                        return null;
                                      }

                                      return (
                                        <tr
                                          key={productItem._id}
                                          className="border"
                                        >
                                          <td className="px-4 py-3 text-center">
                                            {productItem.name}
                                          </td>
                                          <td className="px-4 py-3 text-center">
                                            {productItem.lote}
                                          </td>
                                          <td className="px-4 py-3 text-center">
                                            {new Date(
                                              new Date(
                                                productItem.validade
                                              ).getTime() +
                                                24 * 60 * 60 * 1000
                                            ).toLocaleDateString("pt-BR")}
                                          </td>
                                        </tr>
                                      );
                                    })
                                  ) : (
                                    <tr>
                                      <td
                                        className="px-4 py-3 text-gray-700 border"
                                        colSpan="4"
                                      >
                                        Não foram encontrados produtos
                                        selecionados.
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div>
                    <div className="bg-gray-300 my-6 h-0.5"></div>
                    <p>Não há consultas para esse tratamento</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
