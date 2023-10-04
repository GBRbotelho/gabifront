import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, verifyToken } from "../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar o token assim que a página carregar
    const checkToken = async () => {
      const tokenRenewed = await verifyToken();
      console.log(tokenRenewed);

      if (tokenRenewed) {
        navigate("/dashboard");
      } else if (tokenRenewed.error) {
        localStorage.removeItem("token");
        setLoginError(tokenRenewed.error);
      }
    };

    checkToken();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(email, password).catch((error) => {
      setLoginError("Falha na requisição com o servidor");
      console.log(error);
    });

    if (response.token) {
      // Salvar o token no localStorage
      localStorage.setItem("token", response.token);

      navigate("/dashboard");
    } else {
      setLoginError(response.error);
    }
  };

  return (
    <main className="flex h-screen w-full">
      <section className="flex h-screen w-full md:w-1/2 items-center justify-center rounded-md px-12 xl:px-20">
        <div className="flex flex-col items-start justify-center gap-10 max-w-[700px] w-full">
          <span className="whitespace-nowrap text-6xl font-bold text-emerald-300">
            ByteWave
          </span>
          <span className="font-light text-gray-500">Faça seu login!</span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-sm text-black-500">Email</span>
              <input
                className="rounded-[2px] border border-zinc-300 p-2.5 text-sm text-gray-800 outline-emerald-300 transition-all duration-500 focus:border-emerald-300 focus:outline-double focus:duration-500 focus:placeholder:pl-1"
                type="text"
                name="email" // Nome do campo de entrada deve ser "email"
                placeholder="Digite seu email"
                value={email} // Use o valor da variável de estado "email"
                onChange={(e) => setEmail(e.target.value)} // Atualize a variável de estado "email" quando o campo for alterado
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <span className="text-sm text-black-500">Senha</span>
              <input
                className="rounded-[2px] border border-zinc-300 p-2.5 text-sm text-gray-800 outline-emerald-300 transition-all duration-500 focus:border-emerald-300 focus:outline-double focus:duration-500 focus:placeholder:pl-1"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loginError && (
              <div className="text-red-500 text-sm mt-2">{loginError}</div>
            )}
            <div className="flex w-full justify-center">
              <a>
                <span className="text-blue-400">Esqueci minha senha</span>
              </a>
            </div>
            <div className="flex flex-col w-full justify-center sm:w-auto sm:flex-row p-4">
              <button
                type="submit"
                className="btn-submit flex flex-row items-center justify-center w-full px-4 py-4 mb-4 text-sm font-bold bg-green-300 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10 hover:shadow-lg hover:-translate-y-1"
              >
                Acessar
                <span className="ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                  >
                    <path
                      fill="currentColor"
                      d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="hidden md:flex items-center justify-center bg-custom w-1/2 p-0">
        <img src="/ImageLogin.png" alt="cartoon" width={800} height={100} />
      </section>
    </main>
  );
}

export default LoginPage;
