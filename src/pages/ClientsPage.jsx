import React, { useState, useEffect } from "react";
import { fetchClients, deleteClient } from "../services/apiService";
import { Link } from "react-router-dom";

function ClientsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchClientsData() {
      try {
        const data = await fetchClients(); // Passe o token na chamada
        setClients(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    }

    fetchClientsData();
  }, []);

  const handleDeleteClient = async (clientId) => {
    try {
      const token = await localStorage.getItem("token");
      const response = await deleteClient(clientId, token);

      const updatedClients = clients.filter(
        (client) => client._id !== clientId
      );
      setClients(updatedClients);
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
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
        <Link
          to="/dashboard/clientes/add"
          className=" text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-green-600"
        >
          <i className="ri-user-add-fill"></i>
        </Link>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">CPF</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Options</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {clients.length > 0 ? (
              clients.map((client, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-3 border" key={`name_${client.id}`}>
                    {client.name}
                  </td>
                  <td
                    className="px-4 py-3 text-ms font-semibold border"
                    key={`cpf_${client.id}`}
                  >
                    {client.cpf}
                  </td>
                  <td
                    className="px-4 py-3 text-xs border"
                    key={`phone_${client.id}`}
                  >
                    {client.phone}
                  </td>
                  <td
                    className="px-4 py-3 text-sm border"
                    key={`email_${client.id}`}
                  >
                    {client.email}
                  </td>
                  <td
                    className="px-2 py-3 border options-cell"
                    style={{ width: "50px" }}
                    key={`options_${client.id}`}
                  >
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/dashboard/clientes/view/${client._id}`}
                        className="w-8 h-8 text-green-500 transform hover:scale-110 transition-transform"
                      >
                        <i className="ri-eye-line text-3xl"></i>
                      </Link>
                      <button
                        className="w-8 h-8 text-red-500 transform hover:scale-110 transition-transform"
                        onClick={() => {
                          handleDeleteClient(client._id);
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
                  Não foram encontrados clientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ClientsPage;
