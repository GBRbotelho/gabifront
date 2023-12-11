import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePostData } from "../../services/apiService";
import { useFlashMessage } from "../../utils/FlashMessageContext";
import { useLoading } from "../../utils/LoadingContext";

export default function ModalConsultation({
  closeModalConsultation,
  reloadConsultations,
  treatment,
  service,
  consultations,
}) {
  const [consultation, setConsultation] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();
  const showMessage = useFlashMessage();
  const { showLoading, hideLoading } = useLoading();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConsultation({
      ...consultation,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      showLoading();
      e.preventDefault();
      const currentDate = new Date();
      const consultationDate = new Date(consultation.date);
      consultationDate.setDate(consultationDate.getDate() + 1);
      currentDate.setHours(0, 0, 0, 0);
      consultationDate.setHours(0, 0, 0, 0);
      if (consultationDate < currentDate) {
        throw {
          error: "A data da consulta não pode ser menor que a data de hoje",
        };
      }
      if (consultationDate.toDateString() === currentDate.toDateString()) {
        const currentHour = new Date().getHours();
        const currentMinutes = new Date().getMinutes();

        const consultationHour = parseInt(consultation.time.split(":")[0], 10);
        const consultationMinutes = parseInt(
          consultation.time.split(":")[1],
          10
        );
        if (
          consultationHour < currentHour ||
          (consultationHour === currentHour &&
            consultationMinutes <= currentMinutes)
        ) {
          throw {
            error:
              "A hora da consulta não pode ser menor ou igual à hora atual",
          };
        }
      }
      consultation.client = id;
      const token = localStorage.getItem("token");
      const response = await usePostData(token, "consultations", consultation);

      if (response.error) {
        hideLoading();
        setError(response.error);
      } else {
        hideLoading();
        reloadConsultations();
        closeModalConsultation();
        showMessage("Consulta adicionada!", "success");
      }
    } catch (err) {
      hideLoading();
      showMessage(err.error, "error");
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
              <option key="avulso" value="Avulso">
                Avulso (Não vinculada a nenhum tratamento)
              </option>
              {treatment
                .filter((treatmentItem) => {
                  return (
                    treatmentItem.status === "Em andamento" &&
                    consultations.filter(
                      (consultationItem) =>
                        consultationItem.service === treatmentItem._id &&
                        consultationItem.status !== "Faltou"
                    ).length < treatmentItem.totalSessions
                  );
                })
                .map((treatmentItem) => (
                  <option key={treatmentItem._id} value={treatmentItem._id}>
                    {service
                      .filter(
                        (serviceItem) => serviceItem._id === treatmentItem.name
                      )
                      .map((item) => item.name)}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
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
