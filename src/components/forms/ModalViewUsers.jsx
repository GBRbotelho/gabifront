import React, { useEffect, useState } from "react";
import { useLoading } from "../../utils/LoadingContext";
import { useFlashMessage } from "../../utils/FlashMessageContext";
import { useUpdateData } from "../../services/apiService";
import { useAuth } from "../../utils/AuthContext";

export default function ModalViewUsers({
  setModal,
  userSelect,
  setUserSelect,
  reloadUsers,
  user,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [dataPassword, setDataPassword] = useState({
    admin: "1",
    currentPassword: "",
    newPassword: "",
    repitNewPassword: "",
  });
  const [tempUser, setTempUser] = useState(null);
  const { logout } = useAuth();

  const { showLoading, hideLoading } = useLoading();
  const showMessage = useFlashMessage();

  useEffect(() => {
    setTempUser(userSelect);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserSelect({
      ...userSelect,
      [name]: value,
    });
  };

  const handleChangePassword = (event) => {
    const { name, value } = event.target;
    setDataPassword({
      ...dataPassword,
      [name]: value,
    });
  };

  const toggleSavePassword = async () => {
    showLoading();
    const token = localStorage.getItem("token");

    setDataPassword({
      ...dataPassword,
      admin: "1",
    });

    console.log("Data password inside async function:", dataPassword);

    if (dataPassword.newPassword !== dataPassword.repitNewPassword) {
      hideLoading();
      showMessage(
        "Os Campos 'Nova senha' e 'Repita a nova senha' estão diferentes!",
        "error"
      );
    } else {
      const update = await useUpdateData(
        userSelect._id,
        "users/update-password",
        dataPassword,
        token
      );

      if (update.error) {
        hideLoading();
        showMessage(update.error, "error");
      } else {
        setIsUpdatePassword(false);
        dataPassword.currentPassword = "";
        dataPassword.newPassword = "";
        dataPassword.repitNewPassword = "";
        hideLoading();
        showMessage("Senha trocada!", "success");
        reloadUsers();
        if (userSelect._id === user._id) {
          logout();
        }
      }
    }
  };

  const toggleSave = async () => {
    showLoading();
    const token = localStorage.getItem("token");
    const update = await useUpdateData(
      userSelect._id,
      "users",
      userSelect,
      token
    );

    setTempUser(update);
    setIsEditable(!isEditable);
    hideLoading();
    showMessage("Operação bem-sucedida!", "success");
    reloadUsers();
  };

  const toggleCancel = () => {
    if (!isEditable) {
      setTempRegistrationForm({ ...userSelect });
    } else {
      setUserSelect(tempUser);
    }
    setIsEditable(!isEditable);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute bg-white p-4 w-96 rounded shadow-md">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold">Usuarios</h2>
        </div>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
          {!isUpdatePassword ? (
            <>
              <div className="md:col-span-2">
                <label htmlFor="firstName">Nome</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={userSelect.firstName || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="lastName">Sobrenome</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={userSelect.lastName || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="md:col-span-4">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    true ? "gray-100" : "white"
                  }`}
                  value={userSelect.email || ""}
                  onChange={handleChange}
                  disabled={true}
                />
              </div>

              <div className="md:col-span-4">
                <label htmlFor="accountLevel">Nivel da Conta</label>
                <select
                  type="text"
                  name="accountLevel"
                  id="accountLevel"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={userSelect.accountLevel || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                >
                  <option value={0}>Secretariado</option>
                  <option value={1}>Profissional</option>
                  <option value={2}>Administrador</option>
                  {user.accountLevel === 3 && (
                    <option value={3}>Desenvolvedor</option>
                  )}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="md:col-span-4">
                <label htmlFor="newPassword">Nova senha</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="h-10 border mt-1 rounded px-4 w-full bg-white"
                  value={dataPassword.newPassword || ""}
                  onChange={handleChangePassword}
                />
              </div>
              <div className="md:col-span-4">
                <label htmlFor="repitNewPassword">Repita a senha</label>
                <input
                  type="password"
                  name="repitNewPassword"
                  id="repitNewPassword"
                  className="h-10 border mt-1 rounded px-4 w-full bg-white"
                  value={dataPassword.repitNewPassword || ""}
                  onChange={handleChangePassword}
                />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center mt-3">
          {isUpdatePassword && (
            <div className="gap-2 flex">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  dataPassword.currentPassword = "";
                  dataPassword.newPassword = "";
                  dataPassword.repitNewPassword = "";
                  setIsUpdatePassword(false);
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={toggleSavePassword}
              >
                Salvar
              </button>
            </div>
          )}
        </div>
        {!isUpdatePassword && (
          <div className="flex justify-between mt-3">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setModal(false);
                setUserSelect(null);
              }}
            >
              Concluído
            </button>

            {!isEditable && (
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setIsUpdatePassword(true);
                }}
              >
                Trocar senha
              </button>
            )}

            {isEditable ? (
              <div className="gap-2 flex">
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  onClick={toggleCancel}
                >
                  Cancelar
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={toggleSave}
                >
                  Salvar
                </button>
              </div>
            ) : (
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setIsEditable(true);
                }}
              >
                Editar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
