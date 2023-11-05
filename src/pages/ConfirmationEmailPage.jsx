import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export default function ConfirmationEmailPage() {
  const navigate = useNavigate();
  const { token, isLoading, user } = useAuth();

  if (isLoading) {
    // Renderize algum indicador de carregamento, se necessário
    return <div>Carregando...</div>;
  }

  if (!token || !user) {
    navigate("/");
  } else if (token && user.isEmailVerified) {
    navigate("/dashboard/clientes");
  }
  return (
    <div className="bg-emerald-300">
      <div class="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">
        <div class="mail__wrapper max-w-md mx-auto">
          <div class="mail__content bg-white p-8 shadow-md">
            <div class="content__header text-center tracking-wide border-b">
              <div class="text-emerald-500 text-sm font-bold">BYTEWAVE</div>
              <h1 class="text-3xl h-48 flex items-center justify-center font-bold">
                Confirme seu Email
              </h1>
            </div>

            <div class="content__body py-8 border-b">
              <p>
                Ola, <br />
                Pedimos que faça a autenticação de sua conta digitando o codigo
                que recebeu por email no campo abaixo.
              </p>
              <input
                type="text"
                className="mt-4 p-3 border border-gray-300 w-full rounded focus:outline-none focus:border-emerald-500"
                maxLength="6"
                placeholder="Insira seu código"
              />
              <button class="text-white text-sm tracking-wide bg-green-500 rounded w-full my-8 p-4 ">
                CONFIRMAR CODIGO
              </button>
              <p class="text-sm">Em breve você podera usar o sistema!</p>
            </div>

            <div class="content__footer mt-8 text-center text-grey-darker">
              <h3 class="text-base sm:text-lg mb-4">
                Obrigado por escolher Bytewave!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}