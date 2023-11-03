import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUpdateData } from "../../services/apiService";

export default function ModalConsultation({
  closeSelectItem,
  reloadConsultations,
  treatment,
  consultationItem,
  setConsultationSelect,
  service,
}) {
  const [error, setError] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [tempConsultation, setTempConsultation] = useState({});

  useEffect(() => {
    setTempConsultation(consultationItem);
  }, []);

  const toggleCancel = () => {
    if (!isEditable) {
      setTempConsultation({ ...consultationItem });
    } else {
      setConsultationSelect(tempConsultation);
    }
    setIsEditable(!isEditable);
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConsultationSelect({
      ...consultationItem,
      [name]: value,
    });
  };

  const toggleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const update = await useUpdateData(
        consultationItem._id,
        "consultations",
        consultationItem,
        token
      );
      setConsultationSelect(update);
      setTempConsultation(update);
      setIsEditable(!isEditable);
      reloadConsultations();
    } catch (err) {
      setError(err.error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute bg-white p-4 w-96 rounded shadow-md">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold">Consultas</h2>
        </div>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-4">
            <label htmlFor="date">Data da Consulta</label>
            <input
              type="date"
              name="date"
              id="date"
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={
                consultationItem.date
                  ? new Date(consultationItem.date).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="time">Horário</label>
            <input
              type="time"
              name="time"
              id="time"
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={consultationItem.time || ""}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="service">Tratamento</label>
            <select
              name="service"
              id="service"
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={consultationItem.service || ""}
              onChange={handleChange}
              disabled={!isEditable}
            >
              <option value="" disabled>
                Selecione um tratamento
              </option>
              {treatment.filter((treatmentItem)=>treatmentItem.status === "Em andamento" || treatmentItem._id === consultationItem.service).map((treatmentItem) => (
                <option key={treatmentItem._id} value={treatmentItem._id}>
                  {
                    service.find(
                      (serviceItem) => serviceItem._id === treatmentItem.name
                    ).name
                  }
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-4">
            <label htmlFor="status">Status da Consulta</label>
            <select
              name="status"
              id="status"
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={consultationItem.status || ""}
              onChange={handleChange}
              disabled={!isEditable}
            >
                <option value="Agendado">
                  Agendado
                </option>
                <option value="Concluído">
                  Concluído
                </option>
                <option value="Faltou">
                  Faltou
                </option>
            </select>
          </div>
          <div className="md:col-span-4">
            <label htmlFor="description">Descrição</label>
            <textarea
              type="text"
              name="description"
              id="description"
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={consultationItem.description || ""}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
        </div>
        {error && <p>{error}</p>}
        <div className="flex justify-between mt-3">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeSelectItem}
          >
            Fechar
          </button>
          <div className="">
            {isEditable ? (
              <>
                <button
                  className=" bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-1"
                  onClick={toggleCancel}
                >
                  <i className="ri-close-fill"></i>Cancel
                </button>
                <button
                  className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={toggleSave}
                >
                  <i className="ri-save-line"></i>Save
                </button>
              </>
            ) : (
              <button
                className=" bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                onClick={toggleEdit}
              >
                <i className="ri-pencil-fill"> </i>Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
