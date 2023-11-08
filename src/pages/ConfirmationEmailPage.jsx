import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { usePostData } from "../services/apiService";

export default function ConfirmationEmailPage() {
  const navigate = useNavigate();
  const { isLoading, user } = useAuth();
  const token = localStorage.getItem("token");

  if (!token) {
    // Verifique se o token ou o usuário é nulo
    navigate("/");
  }
  useEffect(() => {
    console.log(user);
    if (user) {
      if (user.isEmailVerified) {
        navigate("/dashboard/clientes");
      }
    }
  }, [user]);

  if (isLoading) {
    // Renderize algum indicador de carregamento, se necessário
    return <div>Carregando...</div>;
  }

  return (
    <div className="bg-emerald-300">
      <div className="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">
        <div className="mail__wrapper max-w-md mx-auto">
          <div className="mail__content bg-white p-8 shadow-md">
            <div className="content__header text-center tracking-wide border-b">
              <div className="text-emerald-500 text-sm font-bold">BYTEWAVE</div>
              <h1 className="text-3xl h-48 flex items-center justify-center font-bold">
                Confirme seu Email
              </h1>
            </div>

            <div className="content__body py-8 border-b">
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
              <button className="text-white text-sm tracking-wide bg-green-500 rounded w-full my-8 p-4 ">
                CONFIRMAR CODIGO
              </button>
              <p className="text-sm">Em breve você podera usar o sistema!</p>
            </div>

            <div className="content__footer mt-8 text-center text-grey-darker">
              <h3 className="text-base sm:text-lg mb-4">
                Obrigado por escolher Bytewave!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
