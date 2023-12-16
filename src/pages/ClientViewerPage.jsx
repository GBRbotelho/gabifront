import React, { useState, useEffect } from "react";
import { useUpdateData, useDeleteData } from "../services/apiService";
import { Link, useNavigate, useParams } from "react-router-dom";
import RegistrationForm from "../components/forms/RegistrationForm";
import ModalTreatment from "../components/forms/ModalTreatment";
import ModalConsultation from "../components/forms/ModalConsultation";
import OpenConsultation from "../components/forms/OpenConsultation";
import OpenTreatment from "../components/forms/OpenTreatment";
import { useAuth } from "../utils/AuthContext";
import ModalFiltrosClientTratamentos from "../components/forms/filtros/ModalFiltrosClientTratamentos";
import ModalFiltrosClientConsultas from "../components/forms/filtros/ModalFiltrosClientConsultas";
import { useForm } from "../utils/useForm";
import { useFlashMessage } from "../utils/FlashMessageContext";
import { useLoading } from "../utils/LoadingContext";
import { useData } from "../utils/DataContext";

export default function ClientViewerPage() {
  const {
    clients,
    setClients,
    consultations,
    setConsultations,
    services,
    setServices,
    treatments,
    setTreatments,
    reload,
  } = useData();
  const showMessage = useFlashMessage();

  const [errorTreatment, setErrorTreatment] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTreatment, setModalTreatment] = useState(false);
  const [modalConsultation, setModalConsultation] = useState(false);
  const [consultationSelect, setConsultationSelect] = useState(null);
  const [treatmentSelect, setTreatmentSelect] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [concluidos, setConcluidos] = useState(false);
  const [andamentos, setAndamentos] = useState(true);
  const [modalFiltersTrataments, setModalFiltersTrataments] = useState(false);
  const [modalFiltersConsultas, setModalFiltersConsultas] = useState(false);
  const [concluidosConsultas, setConcluidosConsultas] = useState(false);
  const [agendados, setAgendados] = useState(true);
  const [faltas, setFaltas] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [client, setClient] = useState(
    clients.find((clientItem) => {
      return clientItem._id === id;
    })
  );
  const treatment = treatments.filter((treatmentItem) => {
    return treatmentItem.clientId === id;
  });
  const consultation = consultations.filter((consultationItem) => {
    return consultationItem.client === id;
  });

  const [tempClient, setTempClient] = useState(
    clients.find((clientItem) => {
      return clientItem._id === id;
    })
  );

  useEffect(() => {
    const reloadClients = async () => {
      await reload(setClients, "clients");
      setClient(
        clients.find((clientItem) => {
          return clientItem._id === id;
        })
      );
    };

    reload(setTreatments, "treatments");
    reload(setConsultations, "consultations");
    reload(setServices, "services");
    reloadClients();
  }, []);

  const DataTreatments = treatment.filter((consultationItem) => {
    return (
      (concluidos && consultationItem.status === "Concluído") ||
      (andamentos && consultationItem.status === "Em andamento")
    );
  });

  const DataConsultations = consultation.filter((consultationItem) => {
    return (
      (concluidosConsultas && consultationItem.status === "Concluído") ||
      (agendados && consultationItem.status === "Agendado") ||
      (faltas && consultationItem.status === "Faltou")
    );
  });

  const handleDelete = async () => {
    showLoading();
    if (
      consultation.filter(
        (consultationItem) => consultationItem.status === "Agendado"
      ).length > 0
    ) {
      hideLoading();
      showMessage(
        "Não pode excluir este cliente, porque existe consultas pendentes!",
        "error"
      );
    } else {
      await useDeleteData(id, "consultations/client", token);
      await useDeleteData(id, "treatments/client", token);

      const response = await useDeleteData(id, "clients", token);
      showMessage("Operação bem-sucedida!", "success");
      hideLoading();
      navigate("/dashboard/clientes");
    }
  };

  const toggleDeleteConsultation = async (consultationId) => {
    showLoading();
    const response = await useDeleteData(
      consultationId,
      "consultations",
      token
    );
    await reloadConsultations();
    hideLoading();
    showMessage("Consulta excluída", "success");
  };

  const toggleDeleteTreatment = async (consultationId) => {
    showLoading();
    if (
      consultation.filter(
        (consultationItem) => consultationItem.service === consultationId
      ).length > 0
    ) {
      hideLoading();
      showMessage("Existe consultas com esse tratamento", "error");
    } else {
      const response = await useDeleteData(consultationId, "treatments", token);
      await reloadTreatments();
      hideLoading();
      showMessage("Tratamento excluído!", "success");
    }
  };

  const reloadTreatments = async () => {
    showLoading();
    await reload(setTreatments, "treatments");
    hideLoading();
  };

  const reloadConsultations = async () => {
    showLoading();
    await reload(setConsultations, "consultations");
    hideLoading();
  };

  const openModalConsultation = () => {
    setModalConsultation(true);
  };

  const openTreatmentSelect = (treatmentItem) => {
    setTreatmentSelect(treatmentItem);
  };

  const closeTreatmentSelect = () => {
    setTreatmentSelect(null);
  };

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
    showLoading();
    const update = await useUpdateData(id, "clients", client, token);
    const formattedDate = update.date
      ? new Date(update.date).toISOString().split("T")[0]
      : "";
    reload(setClients, "clients");
    setClient({
      ...update,
      date: formattedDate,
    });
    setTempClient({
      ...update,
      date: formattedDate,
    });
    setIsEditable(!isEditable);
    hideLoading();
    showMessage("Operação bem-sucedida!", "success");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClient({
      ...client,
      [name]: value,
    });
  };

  useEffect(() => {
    const updateTreatments = async () => {
      for (const treatmentItem of treatment) {
        const completedConsultations = consultation.filter(
          (consultationItem) =>
            consultationItem.service === treatmentItem._id &&
            consultationItem.status !== "Agendado"
        );
        if (completedConsultations.length !== treatmentItem.sessionsCompleted) {
          treatmentItem.sessionsCompleted = completedConsultations.length;
          await useUpdateData(
            treatmentItem._id,
            "treatments",
            treatmentItem,
            token
          );
          await reloadTreatments();
        }

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
  }, [consultation, treatment]);

  return (
    <div className=" min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Dados do Cliente
          </h2>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-3">
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
                      value={(client && client.name) || ""}
                      onChange={handleChange}
                      disabled={!isEditable}
                      maxLength={90}
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
                      value={(client && useForm(client.cpf, "cpf")) || ""}
                      onChange={handleChange}
                      disabled={!isEditable}
                      maxLength={14}
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
                        value={
                          (client && useForm(client.phone, "telefone")) || ""
                        }
                        onChange={handleChange}
                        disabled={!isEditable}
                        maxLength={15}
                      />
                      <a
                        href={client && `https://wa.me/${client.phone}`}
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
                    <select
                      type="text"
                      name="gender"
                      id="gender"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      placeholder="Preencha este campo"
                      value={(client && client.gender) || ""}
                      onChange={handleChange}
                      disabled={!isEditable}
                    >
                      <option disabled>Selecione uma opção</option>
                      <option>Masculino</option>
                      <option>Feminino</option>
                      <option>Prefiro não informar</option>
                    </select>
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
                      value={
                        (client &&
                          new Date(client.date).toISOString().split("T")[0]) ||
                        ""
                      }
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
                      value={(client && client.email) || ""}
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
                      value={(client && client.street) || ""}
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
                      value={(client && client.district) || ""}
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
                      value={(client && client.number) || ""}
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
                      value={(client && client.cep) || ""}
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
                      value={(client && client.city) || ""}
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
                      value={(client && client.state) || ""}
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
              {user && user.accountLevel >= 1 ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0"
                  onClick={openModal}
                >
                  Abrir Ficha Cadastral
                </button>
              ) : (
                <div />
              )}

              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0"
                onClick={handleDelete}
              >
                Deletar Cliente
              </button>
            </div>
            {errorDelete && (
              <div className="w-full flex justify-end">
                <p className="text-red-500">{errorDelete}</p>
              </div>
            )}
            {showModal && <RegistrationForm closeModal={closeModal} />}
            <div className="bg-gray-300 my-6 h-0.5"></div>
            <h2 className="font-semibold text-xl text-gray-600 mt-6">
              Tratamentos
            </h2>
            <div className="flex justify-end w-full overflow-y-auto my-1">
              <button
                type="button"
                className="text-black rounded bg-gray-200 w-28 h-9 hover:bg-gray-50 hover:text-gray-600"
                onClick={() => setModalFiltersTrataments(true)}
              >
                <i className="ri-equalizer-line px-2"></i>Filtros
              </button>
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
                  {DataTreatments.length > 0 ? (
                    DataTreatments.map((treatmentItem) => (
                      <tr key={treatmentItem._id} className="text-gray-700">
                        <td className="px-4 py-3 border text-center">
                          {services
                            .filter(
                              (serviceItem) =>
                                serviceItem._id === treatmentItem.name
                            )
                            .map((item) => item.name)}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          R$ {treatmentItem.price}
                        </td>
                        <td className="px-4 py-3 border text-center w-min">
                          {treatmentItem.sessionsCompleted}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          {treatmentItem.totalSessions}
                        </td>
                        {treatmentItem.status === "Em andamento" && (
                          <td
                            className="px-4 py-3 border text-center"
                            style={{ width: "190px" }}
                          >
                            <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-sm">
                              {treatmentItem.status}
                            </span>
                          </td>
                        )}
                        {treatmentItem.status === "Concluído" && (
                          <td className="px-4 py-3 border text-center">
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                              {treatmentItem.status}
                            </span>
                          </td>
                        )}
                        <td
                          className="px-2 py-3 border options-cell"
                          style={{ width: "50px" }}
                          key={`options_${client.id}`}
                        >
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/dashboard/tratamentos/${client._id}/${treatmentItem._id}`}
                              className="w-8 h-8 text-green-500 transform hover:scale-110 transition-transform"
                            >
                              <i className="ri-eye-line text-3xl"></i>
                            </Link>
                            <button
                              className="w-8 h-8 text-yellow-500 transform hover:scale-110 transition-transform"
                              onClick={() => {
                                openTreatmentSelect(treatmentItem);
                              }}
                            >
                              <i className="ri-pencil-line text-3xl"></i>
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
            <div className="flex justify-end w-full my-1 overflow-y-auto">
              <button
                type="button"
                className="text-black rounded bg-gray-200 w-28 h-9 hover:bg-gray-50 hover:text-gray-600"
                onClick={() => setModalFiltersConsultas(true)}
              >
                <i className="ri-equalizer-line px-2"></i>Filtros
              </button>
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
                    <th className="px-4 py-3 text-center">Preço</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Opções</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {DataConsultations.length > 0 ? (
                    DataConsultations.sort((a, b) => {
                      const dateA = new Date(a.date).getTime();
                      const dateB = new Date(b.date).getTime();

                      if (dateA === dateB) {
                        // Se as datas são iguais, comparar pelos horários
                        const timeA = new Date(
                          `1970-01-01T${a.time}`
                        ).getTime();
                        const timeB = new Date(
                          `1970-01-01T${b.time}`
                        ).getTime();
                        return timeA - timeB;
                      }

                      return dateA - dateB;
                    }).map((consultationItem) => (
                      <tr key={consultationItem._id} className="text-gray-700">
                        <td className="px-4 py-3 border text-center">
                          {new Date(
                            new Date(consultationItem.date).getTime() +
                              24 * 60 * 60 * 1000
                          ).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          {consultationItem.time}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          {consultationItem.service === "Avulso" ||
                          consultationItem.service === "Avaliação"
                            ? consultationItem.service
                            : services.find(
                                (serviceItem) =>
                                  serviceItem._id ===
                                  treatment.filter(
                                    (treatmentItem) =>
                                      treatmentItem._id ===
                                      consultationItem.service
                                  )[0].name
                              ).name}
                        </td>
                        <td className="px-4 py-3 border text-center">
                          R${" "}
                          {consultationItem.price
                            ? consultationItem.price.toFixed(2)
                            : "--"}
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
                          key={`options_${consultationItem._id}`}
                        >
                          <div className="flex justify-center space-x-2">
                            <div>
                              <button
                                className={`w-8 h-8 text-${
                                  consultationItem.status === "Agendado"
                                    ? "yellow"
                                    : "green"
                                }-500 transform hover:scale-110 transition-transform`}
                                onClick={() => openSelectItem(consultationItem)}
                              >
                                {consultationItem.status === "Agendado" ? (
                                  <i className="ri-pencil-line text-3xl"></i>
                                ) : (
                                  <i className="ri-eye-line text-3xl"></i>
                                )}
                              </button>
                            </div>
                            {consultationItem.status === "Agendado" && (
                              <button
                                className="w-8 h-8 text-red-500 transform hover:scale-110 transition-transform"
                                onClick={() => {
                                  toggleDeleteConsultation(
                                    consultationItem._id
                                  );
                                }}
                              >
                                <i className="ri-delete-bin-5-line text-3xl"></i>
                              </button>
                            )}
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
                service={services}
              />
            )}
            {modalConsultation && (
              <ModalConsultation
                closeModalConsultation={closeModalConsultation}
                reloadConsultations={reloadConsultations}
                treatment={treatment}
                service={services}
                consultations={consultation}
              />
            )}

            {consultationSelect && (
              <OpenConsultation
                closeSelectItem={closeSelectItem}
                reloadConsultations={reloadConsultations}
                treatment={treatment}
                consultationItem={consultationSelect}
                setConsultationSelect={setConsultationSelect}
                service={services}
                consultations={consultation}
              />
            )}
            {treatmentSelect && (
              <OpenTreatment
                closeTreatmentSelect={closeTreatmentSelect}
                reloadTreatments={reloadTreatments}
                treatmentSelect={treatmentSelect}
                service={services}
                setTreatmentSelect={setTreatmentSelect}
                consultations={consultation}
              />
            )}
            {modalFiltersTrataments && (
              <ModalFiltrosClientTratamentos
                concluidos={concluidos}
                setConcluidos={setConcluidos}
                andamentos={andamentos}
                setAndamentos={setAndamentos}
                setModalFiltersTrataments={setModalFiltersTrataments}
              />
            )}
            {modalFiltersConsultas && (
              <ModalFiltrosClientConsultas
                concluidos={concluidosConsultas}
                setConcluidos={setConcluidosConsultas}
                agendados={agendados}
                setAgendados={setAgendados}
                setModalFiltersConsultas={setModalFiltersConsultas}
                faltas={faltas}
                setFaltas={setFaltas}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
