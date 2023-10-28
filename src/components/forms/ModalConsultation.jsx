import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePostData } from "../../services/apiService";

export default function ModalConsultation({
  closeModalConsultation,
  reloadConsultations,
  treatment,
}) {
  const [consultation, setConsultation] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConsultation({
      ...consultation,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    consultation.client = id;
    const token = localStorage.getItem("token");
    const response = await usePostData(token, "consultations", consultation);

    if (response.error) {
      setError(response.error);
    } else {
      reloadConsultations();
      closeModalConsultation();
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
              className="h-10 border mt-1 rounded px-4 w-full bg-white"
              value={consultation.date || ""}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="time">Horário</label>
            <input
              type="time"
              name="time"
              id="time"
              className="h-10 border mt-1 rounded px-4 w-full bg-white"
              value={consultation.time || ""}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="service">Tratamento</label>
            <select
              name="service"
              id="service"
              className="h-10 border mt-1 rounded px-4 w-full bg-white"
              value={consultation.service || ""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecione um tratamento
              </option>
              {treatment.map((treatmentItem) => (
                <option key={treatmentItem._id} value={treatmentItem._id}>
                  {treatmentItem.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && <p>{error}</p>}
        <div className="flex justify-between mt-3">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeModalConsultation}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
