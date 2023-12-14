import React, { useState } from "react";
import { addClient } from "../services/apiService"; // Importe a função addClient aqui
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "../utils/useForm";
import { useFlashMessage } from "../utils/FlashMessageContext";
import { useLoading } from "../utils/LoadingContext";

function ClientsAddPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [clientData, setClientData] = useState({});
  const showMessage = useFlashMessage();
  const { showLoading, hideLoading } = useLoading();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();

    try {
      const token = localStorage.getItem("token");
      const response = await addClient(token, clientData).catch((error) => {
        if (error.error) {
          hideLoading();
          showMessage(error.error, "error");
        } else {
          hideLoading();
          navigate("/dashboard/clientes");
        }
      });

      if (response.error) {
        hideLoading();
        showMessage("Informações faltando!", "error");
      } else {
        showMessage("Operação bem-sucedida!", "success");
        hideLoading();
        navigate("/dashboard/clientes");
      }
    } catch (error) {
      if (error.error) {
        hideLoading();
        showMessage(error.error, "error");
      } else {
        hideLoading();
        console.log(error);
      }
    }
  };

  return (
    <div className=" min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">
            Dados do Cliente
          </h2>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-3">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                  <div className="md:col-span-6">
                    <label htmlFor="full_name">Nome Completo</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Preencha este campo"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      value={useForm(clientData.name, "letras") || ""}
                      onChange={handleChange}
                      maxLength={90}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">CPF</label>
                    <input
                      name="cpf"
                      id="cpf"
                      placeholder="Preencha este campo"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      value={useForm(clientData.cpf, "cpf") || ""}
                      onChange={handleChange}
                      maxLength={14}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="phone">Telefone</label>
                    <div className="flex items-center">
                      <input
                        name="phone"
                        id="phone"
                        placeholder="Preencha este campo"
                        className="h-10 border mt-1 rounded px-4 w-full bg-white"
                        value={useForm(clientData.phone, "telefone") || ""}
                        onChange={handleChange}
                        maxLength={15}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="zipcode">Sexo</label>
                    <select
                      type="text"
                      name="gender"
                      id="gender"
                      className={`h-10 border mt-1 rounded px-4 w-full bg-white
                      `}
                      placeholder="Preencha este campo"
                      value={clientData.gender || "Selecione uma opção"}
                      onChange={handleChange}
                    >
                      <option disabled hidden>
                        Selecione uma opção
                      </option>
                      <option>Masculino</option>
                      <option>Feminino</option>
                      <option>Prefiro não informar</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email">Data de Nascimento</label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      value={clientData.date || ""}
                      onChange={handleChange}
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="md:col-span-4">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      value={clientData.email || ""}
                      onChange={handleChange}
                      placeholder="email@domain.com"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="address">Rua</label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      value={clientData.street || ""}
                      onChange={handleChange}
                      placeholder="Preencha este campo"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">Bairro</label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      value={clientData.district || ""}
                      onChange={handleChange}
                      placeholder="Preencha este campo"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="zipcode">Nº</label>
                    <input
                      type="text"
                      name="number"
                      id="number"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      placeholder="Preencha este campo"
                      value={clientData.number || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="zipcode">CEP</label>
                    <input
                      type="text"
                      name="cep"
                      id="cep"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      placeholder="Preencha este campo"
                      value={clientData.cep || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">Cidade</label>
                    <input
                      name="city"
                      id="city"
                      placeholder="Preencha este campo"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      value={clientData.city || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="state">Estado</label>

                    <input
                      name="state"
                      id="state"
                      placeholder="Preencha este campo"
                      className="h-10 border mt-1 rounded px-4 w-full bg-white"
                      value={clientData.state || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-6 text-right">
                    <div className="inline-flex items-end gap-1">
                      <Link
                        to="/dashboard/clientes"
                        className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        <i className="ri-close-fill"></i>Fechar
                      </Link>
                      <button
                        className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                      >
                        <i className="ri-save-line"></i>Salvar
                      </button>
                    </div>
                  </div>
                </div>
                {error && <p>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientsAddPage;
