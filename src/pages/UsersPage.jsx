// DashboardPage.js
import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../services/apiService";
import { Link } from "react-router-dom";
import { useLoading } from "../utils/LoadingContext";
import ModalViewUsers from "../components/forms/ModalViewUsers";
import { useGetAll } from "../services/apiService";
import { useAuth } from "../utils/AuthContext";

function UsersPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [userSelect, setUserSelect] = useState(null);
  const { showLoading, hideLoading } = useLoading();
  const [modal, setModal] = useState(false);
  const token = localStorage.getItem("token");
  const { user } = useAuth();

  useEffect(() => {
    async function fetchUsersData() {
      showLoading();
      try {
        const data = await fetchUsers(); // Passe o token na chamada
        setUsers(data);
        hideLoading();
      } catch (error) {
        console.error("Erro ao buscar usuarios:", error);
      }
    }

    fetchUsersData();
  }, []);

  const reloadUsers = async () => {
    try {
      showLoading();
      const data = await useGetAll("users", token); // Passe o token na chamada
      setUsers(data);
      hideLoading();
    } catch (error) {
      hideLoading();
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleDeleteUsers = async (userId) => {
    showLoading();
    try {
      const token = localStorage.getItem("token");
      const response = await deleteUser(userId, token);

      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      hideLoading();
    } catch (error) {
      hideLoading();
      console.error("Erro ao excluir Usuario:", error);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsSearchOpen(!isSearchOpen);
  };
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="flex items-center justify-end w-full overflow-y-auto">
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
              <th className="px-4 py-3">Options</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.length > 0 ? (
              users
                .filter((userItem) => {
                  if (user && user.accountLevel === 3) {
                    return true;
                  } else {
                    return userItem.accountLevel !== 3;
                  }
                })
                .map((user, index) => (
                  <tr key={index} className="text-gray-700">
                    <td
                      className="px-4 py-3 border"
                      key={`firstName_${user.id}`}
                    >
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
                      {user.accountLevel === 3 && "Desenvolvedor"}
                      {user.accountLevel === 2 && "Administrador"}
                      {user.accountLevel === 1 && "Profissional"}
                      {user.accountLevel === 0 && "Secretariado"}
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
                      key={`options_${user._id}`}
                    >
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-8 h-8 text-green-500 transform hover:scale-110 transition-transform"
                          onClick={() => {
                            setUserSelect(user);
                            setModal(true);
                          }}
                        >
                          <i className="ri-eye-line text-3xl"></i>
                        </button>
                        <button
                          className="w-8 h-8 text-red-500 transform hover:scale-110 transition-transform"
                          onClick={() => handleDeleteUsers(user._id)}
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
                  Não foram encontrados Usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modal && (
        <ModalViewUsers
          userSelect={userSelect}
          setUserSelect={setUserSelect}
          setModal={setModal}
          reloadUsers={reloadUsers}
          user={user}
        />
      )}
    </section>
  );
}

export default UsersPage;
