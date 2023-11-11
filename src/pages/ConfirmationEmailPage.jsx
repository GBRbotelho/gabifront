import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { usePostData } from "../services/apiService";

export default function ConfirmationEmailPage() {
  const navigate = useNavigate();
  const { token, user, setUser } = useAuth();
  const [code, setCode] = useState({ code: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token === "NO") {
      navigate("/");
    } else if (user) {
      if (token && user.isEmailVerified === "SIM") {
        navigate("/dashboard/clientes");
      }
    }
  }, [user, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCode({
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await usePostData(
      token,
      `users/confirm/${user._id}`,
      code
    );
    if (response.message === "Invalid confirmation code") {
      setError("Codigo invalido!");
    } else if (response.message === "Email confirmed successfully") {
      setUser((prevUser) => ({ ...prevUser, isEmailVerified: "SIM" }));
    }
  };

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
                id="code"
                name="code"
                className="mt-4 p-3 border border-gray-300 w-full rounded focus:outline-none focus:border-emerald-500"
                maxLength="6"
                placeholder="Insira seu código"
                value={code.code}
                onChange={handleChange}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                className="text-white text-sm tracking-wide bg-green-500 rounded w-full my-8 p-4 hover:bg-green-700"
                onClick={handleSubmit}
              >
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
