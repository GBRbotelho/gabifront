import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useForm } from "../../utils/useForm";

export default function ModalProfile({ setProfileOpen }) {
  const [isEditable, setIsEditable] = useState(false);
  const { user } = useAuth();

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
            <div>
              <img
                src="https://placehold.co/250x250"
                alt=""
                className="rounded block object-cover align-middle"
              />
            </div>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 mt-10 md:grid-cols-6">
              <div className="md:col-span-6">
                <label htmlFor="full_name">Nome</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={useForm(user.firstName, "letras") || ""}
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
                  value={useForm(user.lastName, "letras") || ""}
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
                  value={user.email || ""}
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
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setProfileOpen(false);
            }}
          >
            Mudar Senha
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setProfileOpen(false);
            }}
          >
            Concluído
          </button>
        </div>
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full z-40  sidebar-overlay"
        style={{ zIndex: 50 }}
        onClick={() => {
          setProfileOpen(false);
        }}
      ></div>
    </div>
  );
}
