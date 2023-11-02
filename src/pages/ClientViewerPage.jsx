import React, { useState, useEffect } from "react";
import {
  useGetId,
  useUpdateData,
  useDeleteData,
  useGetAll,
} from "../services/apiService";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import RegistrationForm from "../components/forms/RegistrationForm";
import ModalTreatment from "../components/forms/ModalTreatment";
import ModalConsultation from "../components/forms/ModalConsultation";
import OpenConsultation from "../components/forms/OpenConsultation";
import OpenTreatment from "../components/forms/OpenTreatment";

export default function ClientViewerPage() {
  const [tempClient, setTempClient] = useState({});
  const [errorTreatment, setErrorTreatment] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTreatment, setModalTreatment] = useState(false);
  const [modalConsultation, setModalConsultation] = useState(false);
  const [client, setClient] = useState({});
  const [treatment, setTreatment] = useState([]);
  const [consultation, setConsultation] = useState([]);
  const [service, setService] = useState([]);
  const [consultationSelect, setConsultationSelect] = useState(null);
  const [treatmentSelect, setTreatmentSelect] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await useDeleteData(id, "clients", token);
    navigate("/dashboard/clientes");
  };

  const toggleDeleteConsultation = async (consultationId) => {
    const response = await useDeleteData(
      consultationId,
      "consultations",
      token
    );
    reloadConsultations();
  };

  const toggleDeleteTreatment = async (consultationId) => {
    if (
      consultation.filter(
        (consultationItem) => consultationItem.service === consultationId
      ).length > 0
    ) {
      setErrorTreatment("Existe consultas com esse tratamento");
    } else {
      const response = await useDeleteData(consultationId, "treatments", token);
      reloadTreatments();
    }
  };

  const reloadTreatments = async () => {
    const response = await useGetId(id, "treatments/client", token);
    setTreatment(response);
  };

  const reloadConsultations = async () => {
    const response = await useGetId(id, "consultations/client", token);
    setConsultation(response);
  };

  const openModalConsultation = () => {
    setModalConsultation(true);
  };

  const openTreatmentSelect = (treatmentItem)=>{
    setTreatmentSelect(treatmentItem)
  }

  const closeTreatmentSelect = ()=>{
    setTreatmentSelect(null)
  }

  const openSelectItem = (consultationItem) => {
    setConsultationSelect(consultationItem);
  };

  const closeSelectItem = () => {
    setConsultationSelect(null);
  };

  const closeModalConsultation = () => {
    setModalConsultation(false);
  };

  const openModalTreatment = () => {
    setModalTreatment(true);
  };

  const closeModalTreatment = () => {
    setModalTreatment(false);
  };

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
        const [clientData, treatmentsData, consultationsData, servicesData] =
          await Promise.all([
            useGetId(id, "clients", token),
            useGetId(id, "treatments/client", token),
            useGetId(id, "consultations/client", token),
            useGetAll("services", token),
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

        setConsultation(consultationsData);

        setService(servicesData);
      } catch (error) {
        console.error("Erro ao buscar clientes e tratamentos:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const updateTreatments = async () => {
      for (const treatmentItem of treatment) {
        const completedConsultations = consultation.filter(
          (consultationItem) =>
            consultationItem.service === treatmentItem._id &&
            consultationItem.status === "Concluído"
        );
  
        if (
          completedConsultations.length === treatmentItem.totalSessions &&
          treatmentItem.status !== "Concluído"
        ) {
          treatmentItem.status = "Concluído";
          await useUpdateData(
            treatmentItem._id,
            "treatments",
            treatmentItem,
            token
          );
          reloadTreatments();
        }
  
        // Verifique o cancelamento da consulta
        if (
          completedConsultations.length < treatmentItem.totalSessions &&
          treatmentItem.status === "Concluído"
        ) {
          treatmentItem.status = "Em andamento";
          await useUpdateData(
            treatmentItem._id,
            "treatments",
            treatmentItem,
            token
          );
          reloadTreatments();
        }
      }
    };
  
    updateTreatments();
  }, [consultation]);
  

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
                onClick={handleDelete}
              >
                Deletar Cliente
              </button>
            </div>
            {showModal && <RegistrationForm closeModal={closeModal} />}
            <div className="bg-gray-300 my-6 h-0.5"></div>
            <h2 className="font-semibold text-xl text-gray-600 mt-6">
              Tratamentos
            </h2>
            <div className="flex justify-end w-full overflow-y-auto">
              <button
                className=" text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-green-600"
                onClick={openModalTreatment}
              >
                <i className="ri-user-add-fill"></i>
              </button>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3 text-center">
                      Nome do tratamento
                    </th>
                    <th className="px-4 py-3 text-center">Preço</th>
                    <th className="px-4 py-3 text-center">
                      Sessões Completadas
                    </th>
                    <th className="px-4 py-3 text-center">Total de Sessões</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Opções</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {treatment.length > 0 ? (
                    treatment.map((treatmentItem) => (
                      <tr key={treatmentItem._id} className="text-gray-700">
                        <td className="px-4 py-3 border text-center">
                          {service
                            .filter(
                              (serviceItem) =>
                                serviceItem._id === treatmentItem.name
                            )
                            .map((item) => item.name)}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          R$ {treatmentItem.price}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          {
                            consultation.filter(
                              (consultationItem) =>
                                consultationItem.service === treatmentItem._id
                            ).filter((consultationItem)=>consultationItem.status === "Concluído").length
                          }
                        </td>
                        <td className="px-4 py-3 border text-center">
                          {treatmentItem.totalSessions}
                        </td>
                        {
                          treatmentItem.status === "Em andamento" && <td className="px-4 py-3 border text-center">
                            <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-sm">{treatmentItem.status}</span>
                        </td> 
                        }
                        {
                          treatmentItem.status === "Concluído" && <td className="px-4 py-3 border text-center">
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">{treatmentItem.status}</span>
                        </td> 
                        }
                        <td
                          className="px-2 py-3 border options-cell"
                          style={{ width: "50px" }}
                          key={`options_${client.id}`}
                        >
                          <div className="flex items-center space-x-2">
                            <button className="w-8 h-8 text-green-500 transform hover:scale-110 transition-transform" onClick={()=> {
                              openTreatmentSelect(treatmentItem)
                            }}>
                              <i className="ri-eye-line text-3xl"></i>
                            </button>
                            <button
                              className="w-8 h-8 text-red-500 transform hover:scale-110 transition-transform"
                              onClick={() => {
                                toggleDeleteTreatment(treatmentItem._id);
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
                      <td
                        className="px-4 py-3 text-gray-700 border"
                        colSpan="6"
                      >
                        Não foram encontrados tratamentos para esse cliente.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {errorTreatment && (
                <p className="text-red-500">{errorTreatment}</p>
              )}
            </div>
            <div className="bg-gray-300 my-6 h-0.5"></div>
            <h2 className="font-semibold text-xl text-gray-600 mt-6">
              Consultas
            </h2>
            <div className="flex justify-end w-full overflow-y-auto">
              <button
                className=" text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-green-600"
                onClick={openModalConsultation}
              >
                <i className="ri-user-add-fill"></i>
              </button>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3 text-center">Data</th>
                    <th className="px-4 py-3 text-center">Hora</th>
                    <th className="px-4 py-3 text-center">Tratamento</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Opções</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {consultation.length > 0 ? (
                    consultation.map((consultationItem) => (
                      <tr key={consultationItem._id} className="text-gray-700">
                        <td className="px-4 py-3 border text-center">
                          {new Date(consultationItem.date).toLocaleDateString(
                            "pt-BR"
                          )}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          {consultationItem.time}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          {
                            service.find(
                              (serviceItem) =>
                                serviceItem._id ===
                                treatment.filter(
                                  (treatmentItem) =>
                                    treatmentItem._id ===
                                    consultationItem.service
                                )[0].name
                            ).name
                          }
                        </td>
                        {
                          consultationItem.status === "Concluído" && <td className="px-4 py-3 border text-center"><span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">{consultationItem.status}</span>
                          
                        </td> 
                        }
                        {
                          consultationItem.status === "Faltou" && <td className="px-4 py-3 border text-center"><span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">{consultationItem.status}</span>
                          
                        </td> 
                        }
                        {
                          consultationItem.status === "Agendado" && <td className="px-4 py-3 border text-center"><span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-sm">{consultationItem.status}</span>
                          
                        </td> 
                        }
                        <td
                          className="px-2 py-3 border options-cell"
                          style={{ width: "50px" }}
                          key={`options_${consultationItem._id}`}
                        >
                          <div className="flex items-center space-x-2">
                            <div>
                              <button
                                className="w-8 h-8 text-green-500 transform hover:scale-110 transition-transform"
                                onClick={() => openSelectItem(consultationItem)}
                              >
                                <i className="ri-eye-line text-3xl"></i>
                              </button>
                            </div>

                            <button
                              className="w-8 h-8 text-red-500 transform hover:scale-110 transition-transform"
                              onClick={() => {
                                toggleDeleteConsultation(consultationItem._id);
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
                      <td
                        className="px-4 py-3 text-gray-700 border"
                        colSpan="5"
                      >
                        Não foram encontrados consultas para esse cliente.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {modalTreatment && (
              <ModalTreatment
                closeModalTreatment={closeModalTreatment}
                reloadTreatments={reloadTreatments}
                service={service}
              />
            )}
            {modalConsultation && (
              <ModalConsultation
                closeModalConsultation={closeModalConsultation}
                reloadConsultations={reloadConsultations}
                treatment={treatment}
                service={service}
              />
            )}

            {consultationSelect && (
              <OpenConsultation
                closeSelectItem={closeSelectItem}
                reloadConsultations={reloadConsultations}
                treatment={treatment}
                consultationItem={consultationSelect}
                setConsultationSelect={setConsultationSelect}
                service={service}
              />
            )}
            {treatmentSelect && (
              <OpenTreatment
                closeTreatmentSelect={closeTreatmentSelect}
                reloadTreatments={reloadTreatments}
                treatmentSelect={treatmentSelect}
                service={service}
                setTreatmentSelect={setTreatmentSelect}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
