import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePostData } from "../../services/apiService";
import { useFlashMessage } from "../../utils/FlashMessageContext";
import { useLoading } from "../../utils/LoadingContext";

export default function ModalTreatment({
  closeModalTreatment,
  reloadTreatments,
  service,
}) {
  const [treatment, setTreatment] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();
  const showMessage = useFlashMessage();
  const { showLoading, hideLoading } = useLoading();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTreatment({
      ...treatment,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    showLoading();
    e.preventDefault();
    treatment.clientId = id;
    const token = localStorage.getItem("token");
    const response = await usePostData(token, "treatments", treatment);

    if (response.error) {
      hideLoading();
      setError(response.error);
    } else {
      hideLoading();
      reloadTreatments();
      closeModalTreatment();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute bg-white p-4 w-96 rounded shadow-md">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold">Tratamentos</h2>
        </div>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-4">
            <label htmlFor="name">Nome do Tratamento</label>
            <select
              type="text"
              name="name"
              id="name"
              className="h-10 border mt-1 rounded px-4 w-full bg-white"
              value={treatment.name || ""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecione um tratamento
              </option>
              {service.map((serviceItem) => (
                <option key={serviceItem._id} value={serviceItem._id}>
                  {serviceItem.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="price">Preço</label>
            <input
              type="number"
              name="price"
              id="price"
              className="h-10 border mt-1 rounded px-4 w-full bg-white"
              value={treatment.price || ""}
              onChange={(e) => {
                const { name, value } = e.target;
                if (value < 0) {
                  showMessage("O preço não pode ser negativo", "error");
                } else {
                  handleChange(e);
                }
              }}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="totalSessions">Nº Total de Sessões</label>
            <input
              type="number"
              name="totalSessions"
              id="totalSessions"
              className="h-10 border mt-1 rounded px-4 w-full bg-white"
              value={treatment.totalSessions || ""}
              onChange={(e) => {
                const { name, value } = e.target;
                if (value <= 0) {
                  showMessage(
                    "O numero de sessões não pode ser negativo",
                    "error"
                  );
                } else {
                  handleChange(e);
                }
              }}
            />
          </div>
          <div className="md:col-span-4">
            <label htmlFor="description">Descrição</label>
            <textarea
              type="text"
              name="description"
              id="description"
              className="h-28 border mt-1 rounded px-4 w-full bg-white"
              value={treatment.description || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between mt-3">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeModalTreatment}
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
