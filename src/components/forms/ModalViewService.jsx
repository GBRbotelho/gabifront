import React, { useState, useEffect } from "react";
import { useUpdateData } from "../../services/apiService";

export default function ModalAddService({
  reloadServices,
  setViewService,
  viewService,
}) {
  const [error, setError] = useState(null);
  const [tempViewService, setTempViewService] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setTempViewService(viewService);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setViewService({
      ...viewService,
      [name]: value,
    });
  };

  const handleClose = () => {
    setViewService(null);
  };

  const handleCancel = () => {
    setViewService(tempViewService);
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const update = await useUpdateData(
        viewService._id,
        "services",
        viewService,
        token
      );
      setViewService(update);
      setTempViewService(update);
      setIsEditable(!isEditable);
      reloadServices();
    } catch (err) {
      setError(err.error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute bg-white p-4 w-96 rounded shadow-md">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold">Serviço</h2>
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
              value={viewService.name || ""}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          <div className="md:col-span-4">
            <label htmlFor="description">Descrição</label>
            <textarea
              name="description"
              id="description"
              className={`h-10 border mt-1 rounded px-4 w-full bg-${
                !isEditable ? "gray-100" : "white"
              }`}
              value={viewService.description || ""}
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
