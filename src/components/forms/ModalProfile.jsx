import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useForm } from "../../utils/useForm";
import ModalPhoto from "./ModalPhoto";
import { useUpdateData } from "../../services/apiService";
import { useLoading } from "../../utils/LoadingContext";
import { useFlashMessage } from "../../utils/FlashMessageContext";
import { useNavigate } from "react-router-dom";

//Import Images
import Photo1 from "../../assets/profiles/1.svg";
import Photo2 from "../../assets/profiles/2.svg";
import Photo3 from "../../assets/profiles/3.svg";
import Photo4 from "../../assets/profiles/4.svg";
import Photo5 from "../../assets/profiles/5.svg";
import Photo6 from "../../assets/profiles/6.svg";
import Photo7 from "../../assets/profiles/7.svg";
import Photo8 from "../../assets/profiles/8.svg";
import Photo9 from "../../assets/profiles/9.svg";
import Photo10 from "../../assets/profiles/10.svg";
import Photo11 from "../../assets/profiles/11.svg";
import Photo12 from "../../assets/profiles/12.svg";
import Photo13 from "../../assets/profiles/13.svg";
import Photo14 from "../../assets/profiles/14.svg";
import Photo15 from "../../assets/profiles/15.svg";
import Photo16 from "../../assets/profiles/16.svg";
import Photo17 from "../../assets/profiles/17.svg";
import Photo18 from "../../assets/profiles/18.svg";
import Photo19 from "../../assets/profiles/19.svg";
import Photo20 from "../../assets/profiles/20.svg";
import Photo21 from "../../assets/profiles/21.svg";
import Photo22 from "../../assets/profiles/22.svg";
import Photo23 from "../../assets/profiles/23.svg";
import Photo24 from "../../assets/profiles/24.svg";
import { Navigate } from "react-router-dom";

const avatarImages = [
  Photo1,
  Photo2,
  Photo3,
  Photo4,
  Photo5,
  Photo6,
  Photo7,
  Photo8,
  Photo9,
  Photo10,
  Photo11,
  Photo12,
  Photo13,
  Photo14,
  Photo15,
  Photo16,
  Photo17,
  Photo18,
  Photo19,
  Photo20,
  Photo21,
  Photo22,
  Photo23,
  Photo24,
  // Adicione outras fotos conforme necessário
];
//Fim IMporte Images

export default function ModalProfile({ setProfileOpen }) {
  const { showLoading, hideLoading } = useLoading();
  const [isEditable, setIsEditable] = useState(false);
  const { user, reloadUser, logout } = useAuth();
  const [modal, setModal] = useState(false);
  const [selectImage, setSelectImage] = useState(null);
  const showMessage = useFlashMessage();
  const navigate = useNavigate();
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [dataPassword, setDataPassword] = useState({
    admin: "2",
    currentPassword: "",
    newPassword: "",
    repitNewPassword: "",
  });

  useEffect(() => {
    setSelectImage(user.photo - 1);
  }, [user]);

  const userPhoto = avatarImages[parseInt(user && user.photo, 10) - 1];

  const updatePhoto = async () => {
    try {
      showLoading();
      const token = localStorage.getItem("token");
      const updatedUser = { ...user, photo: selectImage + 1 }; // +1 para ajustar a base 0 do array
      await useUpdateData(updatedUser._id, "users", updatedUser, token);
      await reloadUser();
      hideLoading();
      // Você precisará implementar a lógica para atualizar o estado localmente ou recarregar a página
    } catch (error) {
      console.error("Erro ao atualizar a foto do perfil:", error);
      // Adicione lógica de tratamento de erro conforme necessário
    }
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
      admin: "2",
    });

    if (dataPassword.newPassword !== dataPassword.repitNewPassword) {
      hideLoading();
      showMessage(
        "Os Campos 'Nova senha' e 'Repita a nova senha' estão diferentes!",
        "error"
      );
    } else {
      const update = await useUpdateData(
        user._id,
        "users/update-password",
        dataPassword,
        token
      );

      if (update.error) {
        hideLoading();
        showMessage(update.error, "error");
      } else {
        hideLoading();
        logout();
        navigate("/");
        showMessage("Senha trocada!", "success");
      }
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-end bg-black/50"
      style={{ zIndex: 100 }}
    >
      <div
        className="absolute bg-white overflow-y-auto p-4 w-80 h-full rounded shadow-md flex items-center flex-col justify-between md:w-96"
        style={{ zIndex: 80 }}
      >
        <div>
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-semibold">Perfil</h2>
          </div>
          <div className=" overflow-y-auto flex flex-col items-center max-h-max">
            <div className="relative group">
              <img
                src={userPhoto}
                alt="Avatar Perfil"
                className="rounded-full block object-cover align-middle transition-all"
              />
              <div className="absolute z-10 rounded-full top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity flex items-center justify-center">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded transition-all group-hover:filter brightness-110 absolute bottom-4 z-50"
                  onClick={() => setModal(true)}
                >
                  Alterar Foto
                </button>
              </div>
            </div>

            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 mt-10 md:grid-cols-6">
              {isUpdatePassword ? (
                <>
                  <div className="md:col-span-6">
                    <label htmlFor="currentPassword">Senha atual</label>
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      value={dataPassword.currentPassword || ""}
                      onChange={handleChangePassword}
                    />
                  </div>
                  <div className="md:col-span-6">
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
                  <div className="md:col-span-6">
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
              ) : (
                <>
                  <div className="md:col-span-6">
                    <label htmlFor="full_name">Nome</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      value={(user && useForm(user.firstName, "letras")) || ""}
                      disabled={!isEditable}
                      maxLength={90}
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label htmlFor="full_name">Sobrenome</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      value={(user && useForm(user.lastName, "letras")) || ""}
                      disabled={!isEditable}
                      maxLength={90}
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label htmlFor="full_name">Email</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      value={(user && user.email) || ""}
                      disabled={!isEditable}
                      maxLength={90}
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label htmlFor="full_name">Senha</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-${
                        !isEditable ? "gray-100" : "white"
                      }`}
                      value={"*****************"}
                      disabled={!isEditable}
                      maxLength={90}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {!isUpdatePassword ? (
            <>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setIsUpdatePassword(true);
                }}
              >
                Trocar senha
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setProfileOpen(false);
                }}
              >
                Concluído
              </button>
            </>
          ) : (
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
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full z-40  sidebar-overlay"
        style={{ zIndex: 50 }}
        onClick={() => {
          setProfileOpen(false);
        }}
      ></div>
      {modal && (
        <ModalPhoto
          setModal={setModal}
          selectImage={selectImage}
          setSelectImage={setSelectImage}
          updatePhoto={updatePhoto}
        />
      )}
    </div>
  );
}
