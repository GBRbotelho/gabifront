import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUpdateData, useGetAll } from "../../services/apiService";
import Select from "react-select";
import ModalEditConsultation from "./ModalEditConsultation";

export default function ModalConsultation({
  closeSelectItem,
  reloadConsultations,
  treatment,
  consultationItem,
  setConsultationSelect,
  service,
  consultations,
}) {
  const [error, setError] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [tempConsultation, setTempConsultation] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [tempSelectedProductIds, setTempSelectedProductIds] = useState([]);
  const [confirmConsultation, setConfirmConsultation] = useState(false);

  useEffect(() => {
    setTempConsultation(consultationItem);

    const fetchProducts = async () => {
      const token = await localStorage.getItem("token");
      const data = await useGetAll("products", token);
      setProducts(data);

      setTempSelectedProductIds(
        consultationItem.products.map((productId) => ({
          value: productId,
          label: data.find((product) => product._id === productId).name,
        }))
      );

      setSelectedProductIds(
        consultationItem.products.map((productId) => ({
          value: productId,
          label: data.find((product) => product._id === productId).name,
        }))
      );
    };

    fetchProducts();
  }, []);

  const handleChangeProducts = (selectedOptions) => {
    setSelectedProductIds(selectedOptions);
  };

  useEffect(() => {
    const selectedProducts = selectedProductIds.map((option) => option.value);

    setConsultationSelect({
      ...consultationItem,
      products: selectedProducts,
    });
  }, [selectedProductIds]);

  const toggleCancel = () => {
    if (!isEditable) {
      setTempConsultation({ ...consultationItem });
      setTempSelectedProductIds({ ...selectedProductIds });
    } else {
      setConsultationSelect(tempConsultation);
      handleChangeProducts(tempSelectedProductIds);
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

  const handleError = (errorMessage) => {
    setError(errorMessage);

    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const forceSave = async () => {
    const token = localStorage.getItem("token");
    const update = await useUpdateData(
      consultationItem._id,
      "consultations",
      consultationItem,
      token
    );
    setConsultationSelect(update);
    setTempConsultation(update);
    setTempSelectedProductIds(selectedProductIds);
    setIsEditable(!isEditable);
    reloadConsultations();
  };

  const toggleSave = async () => {
    try {
      if (consultationItem.status !== tempConsultation.status) {
        setConfirmConsultation(true);
      } else {
        const token = localStorage.getItem("token");
        const update = await useUpdateData(
          consultationItem._id,
          "consultations",
          consultationItem,
          token
        );
        setConsultationSelect(update);
        setTempConsultation(update);
        setTempSelectedProductIds(selectedProductIds);
        setIsEditable(!isEditable);
        reloadConsultations();
      }
    } catch (err) {
      handleError(err.error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute bg-white p-4 w-96 rounded shadow-md">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold">Consultas</h2>
        </div>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-2">
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
              <option key="avulso" value="Avulso">
                Avulso (Não vinculada a nenhum tratamento)
              </option>
              {treatment
                .filter((treatmentItem) => {
                  return (
                    (treatmentItem.status === "Em andamento" &&
                      consultations.filter(
                        (consultationItem) =>
                          consultationItem.service === treatmentItem._id &&
                          consultationItem.status !== "Faltou"
                      ).length < treatmentItem.totalSessions) ||
                    treatmentItem._id === consultationItem.service
                  );
                })
                .map((treatmentItem) => (
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
          <div className="md:col-span-2">
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
              <option value="Agendado">Agendado</option>
              <option value="Concluído">Concluído</option>
              <option value="Faltou">Faltou</option>
            </select>
          </div>
          <div className="md:col-span-4">
            <label htmlFor="products">Produtos usados na consulta</label>
            <Select
              name="products"
              id="products"
              isMulti
              placeholder="Selecione os produtos usados"
              value={selectedProductIds}
              onChange={handleChangeProducts}
              options={products
                .filter((product) => product.status === "Disponível")
                .map((product) => ({
                  value: product._id,
                  label: product.name,
                }))}
              isDisabled={!isEditable}
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
              value={consultationItem.description || ""}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          <div className="md:col-span-4">
            <label htmlFor="products">
              Informações dos produtos selecionados
            </label>
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3 text-center">Nome</th>
                  <th className="px-4 py-3 text-center">Lote</th>
                  <th className="px-4 py-3 text-center">Validade</th>
                </tr>
              </thead>
              <tbody>
                {consultationItem.products.length > 0 ? (
                  consultationItem.products.map((productId) => {
                    const productItem = products.find(
                      (product) => product._id === productId
                    );

                    if (!productItem) {
                      return null;
                    }

                    return (
                      <tr key={productItem._id}>
                        <td className="px-4 py-3 text-center">
                          {productItem.name}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {productItem.lote}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {new Date(
                            new Date(productItem.validade).getTime() +
                              24 * 60 * 60 * 1000
                          ).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="px-4 py-3 text-gray-700 border" colSpan="4">
                      Não foram encontrados produtos selecionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between mt-3">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeSelectItem}
          >
            Fechar
          </button>
          {tempConsultation.status === "Agendado" && (
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
          )}
        </div>
      </div>
      {confirmConsultation && (
        <ModalEditConsultation
          setConfirmConsultation={setConfirmConsultation}
          forceSave={forceSave}
        />
      )}
    </div>
  );
}
