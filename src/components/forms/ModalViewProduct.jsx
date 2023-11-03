import React, { useState, useEffect } from "react";
import { useUpdateData } from "../../services/apiService";

export default function ModalAddProduct({
    reloadProducts,
    setViewProduct,
    viewProduct,

}) {
    const [error, setError] = useState(null);
    const [tempViewProduct, setTempViewProduct] = useState({});
    const [isEditable, setIsEditable] = useState(false)

    useEffect(() => {
        setTempViewProduct(viewProduct);
      }, []);
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setViewProduct({
          ...viewProduct,
          [name]: value,
        });
      };

    const handleClose = () =>{
        setViewProduct(null)
    }

    const handleCancel = () => {
        setViewProduct(tempViewProduct)
        setIsEditable(false)
    }

    const handleEdit = () => {
        setIsEditable(true)
    }

    const handleSubmit = async () => {
        try {
          const token = localStorage.getItem("token");
          const update = await useUpdateData(
            viewProduct._id,
            "products",
            viewProduct,
            token
          );
          setViewProduct(update);
          setTempViewProduct(update);
          setIsEditable(!isEditable);
          reloadProducts();
        } catch (err) {
          setError(err.error);
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
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={viewProduct.name || ""}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="lote">Lote</label>
            <input
              name="lote"
              id="lote"
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={viewProduct.lote || ""}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="validade">Data de Validade</label>
            <input
              type="date"
              name="validade"
              id="validade"
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={
                viewProduct.validade
                  ? new Date(viewProduct.validade).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          <div className="md:col-span-4">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              id="status"
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={viewProduct.status || ""}
              onChange={handleChange}
              disabled={!isEditable}
            >
                <option value="Disponível">
                    Disponível
                </option>
                <option value="Esgotado">
                    Esgotado
                </option>
            </select>
          </div>
          <div className="md:col-span-4">
            <label htmlFor="description">Descrição</label>
            <textarea
              name="description"
              id="description"
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={viewProduct.description || ""}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
        </div>
        {error && <p>{error}</p>}
        <div className="flex justify-between mt-3">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClose}
          >
            Fechar
          </button>
          <div className="">
            {isEditable ? (
              <>
                <button
                  className=" bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-1"
                  onClick={handleCancel}
                >
                  <i className="ri-close-fill"></i>Cancel
                </button>
                <button
                  className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  <i className="ri-save-line"></i>Save
                </button>
              </>
            ) : (
              <button
                className=" bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleEdit}
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
