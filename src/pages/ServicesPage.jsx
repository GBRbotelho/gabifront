// DashboardPage.js
import React, { useState, useEffect } from "react";
import {
  fetchServices,
  deleteService,
  useGetAll,
} from "../services/apiService";
import ModalAddService from "../components/forms/ModalAddService";
import ModalViewService from "../components/forms/ModalViewService";
import { useLoading } from "../utils/LoadingContext";
import { useFlashMessage } from "../utils/FlashMessageContext";

function ServicesPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [addServiceActive, setAddServiceActive] = useState(false);
  const [services, setServices] = useState([]);
  const [viewService, setViewService] = useState(null);
  const [error, setError] = useState(null);
  const { showLoading, hideLoading } = useLoading();
  const showMessage = useFlashMessage();

  useEffect(() => {
    async function fetchServicesData() {
      try {
        showLoading();
        const data = await fetchServices(); // Passe o token na chamada
        setServices(data);
        hideLoading();
      } catch (error) {
        hideLoading();
        console.error("Erro ao buscar serviços:", error);
      }
    }

    fetchServicesData();
  }, []);

  const reloadServices = async () => {
    try {
      showLoading();
      const token = await localStorage.getItem("token");
      const data = await useGetAll("services", token); // Passe o token na chamada
      setServices(data);
      hideLoading();
    } catch (error) {
      hideLoading();
      console.error("Erro ao buscar serviços:", error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      showLoading();
      const token = localStorage.getItem("token");
      const treatments = await useGetAll("treatments", token);
      if (
        treatments.filter((treatment) => treatment.name === serviceId)
          .length === 0
      ) {
        await deleteService(serviceId, token);
        reloadServices();
        hideLoading();
        showMessage("Serviço excluido!", "success");
      } else if (
        treatments.filter((treatment) => treatment.name === serviceId)
          .length !== 0
      ) {
        showMessage(
          "Esse serviço esta vinculado a algum tratamento, e não pode ser excluido!",
          "error"
        );
        hideLoading();
      }
    } catch (error) {
      hideLoading();
      console.error("Erro ao excluir Serviço:", error);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsSearchOpen(!isSearchOpen);
  };
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="flex items-center w-full overflow-y-auto">
        <ul className="ml-auto flex items-center">
          <li className="mr-1 dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
              onClick={handleSearchClick}
            >
              <i className="ri-search-line"></i>
            </button>
            <div
              className={`dropdown-menu shadow-md shadow-black/5 z-30  max-w-xs w-full bg-white rounded-md border border-gray-100 ${
                isSearchOpen ? "block" : "hidden"
              }`}
            >
              <form action="" className="p-4 border-b border-b-gray-100">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                    placeholder="Search..."
                  />
                  <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"></i>
                </div>
              </form>
            </div>
          </li>
        </ul>
        <button
          onClick={() => setAddServiceActive(true)}
          className=" text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-green-600"
        >
          <i className="ri-user-add-fill"></i>
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="px-4 py-3 text-center">Nome</th>
              <th className="px-4 py-3 text-center">Descrição</th>
              <th className="px-4 py-3 text-center">Options</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {services.length > 0 ? (
              services.map((service, index) => (
                <tr key={index} className="text-gray-700">
                  <td
                    className="px-4 py-3 border text-center"
                    key={`name_${service.id}`}
                  >
                    {service.name}
                  </td>
                  <td
                    className="px-4 py-3 text-ms border text-center"
                    key={`description_${service.id}`}
                  >
                    {service.description || "---"}
                  </td>
                  <td
                    className="px-2 py-3 border text-center options-cell"
                    style={{ width: "50px" }}
                    key={`options_${service.id}`}
                  >
                    <div className="flex items-center space-x-2">
                      <button
                        className="w-8 h-8 text-green-500 transform hover:scale-110 transition-transform"
                        onClick={() => setViewService(service)}
                      >
                        <i className="ri-eye-line text-3xl"></i>
                      </button>
                      <button
                        className="w-8 h-8 text-red-500 transform hover:scale-110 transition-transform"
                        onClick={() => {
                          handleDeleteService(service._id);
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
                <td className="px-4 py-3 text-gray-700 border" colSpan="5">
                  Não foram encontrados Serviços.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      {addServiceActive && (
        <ModalAddService
          reloadServices={reloadServices}
          setAddServiceActive={setAddServiceActive}
        />
      )}
      {viewService && (
        <ModalViewService
          viewService={viewService}
          setViewService={setViewService}
          reloadServices={reloadServices}
        />
      )}
    </section>
  );
}

export default ServicesPage;
