import React, { useState, useEffect } from "react";
import { useUpdateData } from "../../services/apiService";
import { useFlashMessage } from "../../utils/FlashMessageContext";

export default function ModalTreatment({
  closeTreatmentSelect,
  treatmentSelect,
  service,
  reloadTreatments,
  setTreatmentSelect,
  consultations,
}) {
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [tempTreatment, setTempTreatment] = useState({});
  const showMessage = useFlashMessage();

  useEffect(() => {
    setTempTreatment(treatmentSelect);
  }, []);

  const toggleCancel = () => {
    if (!isEditable) {
      setTempTreatment({ ...treatmentSelect });
    } else {
      setTreatmentSelect(tempTreatment);
    }
    setIsEditable(!isEditable);
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTreatmentSelect({
      ...treatmentSelect,
      [name]: value,
    });
  };

  const toggleSave = async () => {
    try {
      if (
        treatmentSelect.totalSessions <
        consultations.filter(
          (consultationItem) =>
            consultationItem.service === treatmentSelect._id &&
            consultationItem.status !== "Faltou"
        ).length
      ) {
        throw {
          error:
            "O nº de total sessões alterada é menor que o nº de sessões abertas(Concluidas ou Agendadas) para esse tratamento",
        };
      }

      const token = localStorage.getItem("token");
      const update = await useUpdateData(
        treatmentSelect._id,
        "treatments",
        treatmentSelect,
        token
      );
      setTreatmentSelect(update);
      setTempTreatment(update);
      setIsEditable(!isEditable);
      reloadTreatments();
    } catch (err) {
      showMessage(err.error, "error");
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
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={treatmentSelect.name || ""}
              onChange={(e) => {
                if (
                  consultations.filter((consultationItem) => {
                    return (
                      consultationItem.service === treatmentSelect._id &&
                      consultationItem.status === "Concluído"
                    );
                  }).length > 0
                ) {
                  showMessage(
                    "O tipo de tratamento não pode ser alterado após uma consulta ter sido concluída",
                    "error"
                  );
                } else {
                  handleChange(e);
                }
              }}
              disabled={!isEditable}
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
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={treatmentSelect.price || ""}
              onChange={(e) => {
                const { value } = e.target;
                if (value < 0) {
                  showMessage("O preço não pode ser negativo", "error");
                } else {
                  handleChange(e);
                }
              }}
              disabled={!isEditable}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="totalSessions">Nº Total de Sessões</label>
            <input
              type="number"
              name="totalSessions"
              id="totalSessions"
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={treatmentSelect.totalSessions || ""}
              onChange={(e) => {
                const { value } = e.target;
                if (value <= 0) {
                  showMessage(
                    "O numero de sessões não pode ser negativo",
                    "error"
                  );
                } else {
                  handleChange(e);
                }
              }}
              disabled={!isEditable}
            />
          </div>
          <div className="md:col-span-4">
            <label htmlFor="description">Descrição</label>
            <textarea
              type="text"
              name="description"
              id="description"
              className={`h-28 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={treatmentSelect.description || ""}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between mt-3">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeTreatmentSelect}
          >
            Concluído
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
