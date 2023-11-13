// DashboardPage.js
import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../services/apiService";
import { Link } from "react-router-dom";

function UsersPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const data = await fetchUsers(); // Passe o token na chamada
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuarios:", error);
      }
    }

    fetchUsersData();
  }, []);

  const handleDeleteUsers = async (userId) => {
    try {
      const token = await localStorage.getItem("token");
      const response = await deleteUser(userId, token);

      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Erro ao excluir Usuario:", error);
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
          to="/dashboard/usuarios/add"
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
              <th className="px-4 py-3">Sobrenome</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Nivel de Conta</th>
              <th className="px-4 py-3">Email Validado</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-3 border" key={`firstName_${user.id}`}>
                    {user.firstName}
                  </td>
                  <td
                    className="px-4 py-3 text-ms border"
                    key={`lastName_${user.id}`}
                  >
                    {user.lastName}
                  </td>
                  <td
                    className="px-4 py-3 text-xs border"
                    key={`email_${user.id}`}
                  >
                    {user.email}
                  </td>
                  <td
                    className="px-4 py-3 text-xs border"
                    key={`accountLevel_${user.id}`}
                  >
                    {user.accountLevel}
                  </td>
                  <td
                    className="px-4 py-3 text-xs border"
                    key={`isEmailVerified_${user.id}`}
                  >
                    {user.isEmailVerified}
                  </td>

                  <td
                    className="px-2 py-3 border options-cell"
                    style={{ width: "50px" }}
                    key={`options_${user.id}`}
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                      >
                        <path
                          d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"
                          fill="rgba(100,205,138,1)"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                      >
                        <path
                          d="M16.6256 3.12837L9.29145 10.4625L9.29886 14.7097L13.537 14.7022L20.8682 7.37102C21.5912 8.75426 22 10.3277 22 11.9966C22 17.5194 17.5228 21.9966 12 21.9966C6.47715 21.9966 2 17.5194 2 11.9966C2 6.47373 6.47715 1.99658 12 1.99658C13.6689 1.99658 15.2423 2.40541 16.6256 3.12837ZM20.4853 2.09709L21.8995 3.5113L12.7071 12.7037L11.2954 12.7062L11.2929 11.2895L20.4853 2.09709Z"
                          fill="rgba(240,187,64,1)"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        onClick={() => {
                          handleDeleteUsers(user._id);
                        }}
                      >
                        <path
                          d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM9 4V6H15V4H9Z"
                          fill="rgba(193,41,41,1)"
                        ></path>
                      </svg>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-3 text-gray-700 border" colSpan="5">
                  Não foram encontrados Usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UsersPage;
