import React, { useState, useEffect } from "react";
import { useGetId, useUpdateData } from "../services/apiService";
import { useParams } from "react-router-dom";
import RegistrationForm from "../components/forms/RegistrationForm";

export default function ClientViewerPage() {
  const [tempClient, setTempClient] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [client, setClient] = useState({});
  const [treatment, setTreatment] = useState([]);
  const [consultation, setConsultation] = useState([]);
  const { id } = useParams();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const toggleCancel = () => {
    if (!isEditable) {
      setTempClient({ ...client });
    } else {
      setClient(tempClient);
    }
    setIsEditable(!isEditable);
  };

  const toggleSave = async () => {
    const token = localStorage.getItem("token");
    const update = await useUpdateData(id, "clients", client, token);
    const formattedDate = update.date
      ? new Date(update.date).toISOString().split("T")[0]
      : "";
    setClient({
      ...update,
      date: formattedDate,
    });
    setTempClient({
      ...update,
      date: formattedDate,
    });
    setIsEditable(!isEditable);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClient({
      ...client,
      [name]: value,
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");

        // Faz as duas chamadas de API simultaneamente
        const [clientData, treatmentsData] = await Promise.all([
          useGetId(id, "clients", token),
          useGetId(id, "services/client", token),
        ]);

        const formattedClientDate = clientData.date
          ? new Date(clientData.date).toISOString().split("T")[0]
          : "";

        setClient({
          ...clientData,
          date: formattedClientDate,
        });
        setTempClient({
          ...clientData,
          date: formattedClientDate,
        });

        setTreatment(treatmentsData);
      } catch (error) {
        console.error("Erro ao buscar clientes e tratamentos:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className=" min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Dados do Cliente
          </h2>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <div className=" flex justify-center">
                  <div className="bg-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="240"
                      height="240"
                    >
                      <path
                        d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                        fill="rgba(0,0,0,1)"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                  <div className="md:col-span-6">
                    <label htmlFor="full_name">Nome Completo</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      value={client.name || ""}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">CPF</label>
                    <input
                      name="cpf"
                      id="cpf"
                      placeholder="Preencha este campo"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      value={client.cpf || ""}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="phone">Telefone</label>
                    <div className="flex items-center">
                      <input
                        name="phone"
                        id="phone"
                        placeholder="Preencha este campo"
                        className={`h-10 border mt-1 rounded px-4 w-full bg-${
                          !isEditable ? "gray-100" : "white"
                        }`}
                        value={client.phone || ""}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      <a
                        href={`https://wa.me/${client.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`ml-2 text-2xl text-green-500 ${
                          !isEditable ? "scale-08" : ""
                        } transition-transform duration-200 pointer-events-${
                          isEditable ? "none" : "auto"
                        }`}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(0.8)")
                        }
                      >
                        <i className="ri-whatsapp-line"></i>
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="zipcode">Sexo</label>
                    <input
                      type="text"
                      name="gender"
                      id="gender"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      placeholder="Preencha este campo"
                      value={client.gender || ""}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email">Data de Nascimento</label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      value={client.date || ""}
                      onChange={handleChange}
                      placeholder="email@domain.com"
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-4">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      value={client.email || ""}
                      onChange={handleChange}
                      placeholder="email@domain.com"
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="address">Rua</label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      value={client.street || ""}
                      onChange={handleChange}
                      placeholder="Preencha este campo"
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">Bairro</label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      value={client.district || ""}
                      onChange={handleChange}
                      placeholder="Preencha este campo"
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="zipcode">Nº</label>
                    <input
                      type="text"
                      name="number"
                      id="number"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      placeholder="Preencha este campo"
                      value={client.number || ""}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="zipcode">CEP</label>
                    <input
                      type="text"
                      name="cep"
                      id="cep"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      placeholder="Preencha este campo"
                      value={client.cep || ""}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">Cidade</label>
                    <input
                      name="city"
                      id="city"
                      placeholder="Preencha este campo"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      value={client.city || ""}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="state">Estado</label>

                    <input
                      name="state"
                      id="state"
                      placeholder="Preencha este campo"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      value={client.state || ""}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-6 text-right">
                    <div className="inline-flex items-end gap-1">
                      {isEditable ? (
                        <>
                          <button
                            className=" bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                            onClick={toggleCancel}
                          >
                            <i className="ri-close-fill"></i>Cancelar
                          </button>
                          <button
                            className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={toggleSave}
                          >
                            <i className="ri-save-line"></i>Salvar
                          </button>
                        </>
                      ) : (
                        <button
                          className=" bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                          onClick={toggleEdit}
                        >
                          <i className="ri-pencil-fill"> </i>Editar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-full flex justify-between mt-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0"
                onClick={openModal}
              >
                Abrir Ficha Cadastral
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0"
                onClick={openModal}
              >
                Deletar Cliente
              </button>
            </div>
            {showModal && <RegistrationForm closeModal={closeModal} />}
            <div className="bg-gray-300 my-6 h-0.5"></div>
            <h2 className="font-semibold text-xl text-gray-600 mt-6">
              Tratamentos
            </h2>
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">Nome do tratamento</th>
                    <th className="px-4 py-3">Preço</th>
                    <th className="px-4 py-3">Sessões Completadas</th>
                    <th className="px-4 py-3">Total de Sessões</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {treatment.length > 0 ? (
                    treatment.map((treatment) => (
                      <tr key={treatment._id} className="text-gray-700">
                        <td className="px-4 py-3 border text-center">
                          {treatment.name}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          R$ {treatment.price}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          {consultation.length}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          {treatment.totalSessions}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          {treatment.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="px-4 py-3 text-gray-700 border"
                        colSpan="5"
                      >
                        Não foram encontrados tratamentos para esse cliente.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-300 my-6 h-0.5"></div>
            <h2 className="font-semibold text-xl text-gray-600 mt-6">
              Consultas
            </h2>
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">Data</th>
                    <th className="px-4 py-3">Hora</th>
                    <th className="px-4 py-3">Tratamento</th>
                    <th className="px-4 py-3">Sessão</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
