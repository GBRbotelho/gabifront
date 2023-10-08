import React, { useState } from "react";

export default function ClientViewerPage() {
  const [isEditable, setIsEditable] = useState(false);
  const toggleEdit = () => {
    setIsEditable(!isEditable);
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
              <div className="text-gray-600">
                <div className=" flex justify-center">
                  <div className="bg-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="240"
                      height="240"
                    >
                      <path
                        d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                        fill="rgba(0,0,0,1)"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                  <div className="md:col-span-6">
                    <label for="full_name">Nome Completo</label>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value=""
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label for="country">CPF</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        name="country"
                        id="country"
                        placeholder="Country"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value=""
                        disabled={!isEditable}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label for="state">Telefone</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        name="state"
                        id="state"
                        placeholder="State"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value=""
                        disabled={!isEditable}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label for="zipcode">Sexo</label>
                    <input
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                      value=""
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label for="email">Data de Nascimento</label>
                    <input
                      type="date"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value=""
                      placeholder="email@domain.com"
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-4">
                    <label for="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value=""
                      placeholder="email@domain.com"
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label for="address">Rua</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value=""
                      placeholder=""
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label for="city">Bairro</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value=""
                      placeholder=""
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label for="zipcode">Nº</label>
                    <input
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                      value=""
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label for="zipcode">CEP</label>
                    <input
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                      value=""
                      disabled={!isEditable}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label for="country">Cidade</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        name="country"
                        id="country"
                        placeholder="Country"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value=""
                        disabled={!isEditable}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label for="state">Estado</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        name="state"
                        id="state"
                        placeholder="State"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value=""
                        disabled={!isEditable}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-6 text-right">
                    <div className="inline-flex items-end gap-1">
                      {isEditable ? (
                        <button className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                          <i className="ri-pencil-fill"> </i>Save
                        </button>
                      ) : (
                        ""
                      )}
                      <button
                        className=" bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                        onClick={toggleEdit}
                      >
                        <i className="ri-pencil-fill"> </i>Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
