import React, { useState } from "react";
import { usePostData } from "../../services/apiService";
import { useLoading } from "../../utils/LoadingContext";
import { useFlashMessage } from "../../utils/FlashMessageContext";

export default function ModalAddProduct({
  reloadProducts,
  setAddProductActive,
}) {
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({});
  const { showLoading, hideLoading } = useLoading();
  const showMessage = useFlashMessage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setAddProductActive(false);
  };

  const handleSubmit = async (e) => {
    showLoading();
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await usePostData(token, "products", product);

    if (response.error) {
      hideLoading();
      setError(response.error);
    } else {
      await reloadProducts();
      hideLoading();
      showMessage("Produto adicionado!", "success");
      setAddProductActive(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute bg-white p-4 w-96 rounded shadow-md">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold">Produto</h2>
        </div>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-4">
            <label htmlFor="name">Nome</label>
            <input
              name="name"
              id="name"
              className="h-10 border mt-1 rounded px-4 w-full bg-white"
              value={product.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="lote">Lote</label>
            <input
              name="lote"
              id="lote"
              className="h-10 border mt-1 rounded px-4 w-full bg-white"
              value={product.lote || ""}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="validade">Data de Validade</label>
            <input
              type="date"
              name="validade"
              id="validade"
              className="h-10 border mt-1 rounded px-4 w-full bg-white"
              value={product.validade || ""}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-4">
            <label htmlFor="description">Descrição</label>
            <textarea
              name="description"
              id="description"
              className="h-10 border mt-1 rounded px-4 w-full bg-white"
              value={product.description || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        {error && <p>{error}</p>}
        <div className="flex justify-between mt-3">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCancel}
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
