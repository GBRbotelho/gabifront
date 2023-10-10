import React from "react";

function RegistrationForm() {
  return (
    <div>
      (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-4 md:p-8 z-10 rounded-lg shadow-lg">
          {/* Conteúdo do modal aqui */}
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-semibold">Ficha Cadastral</h2>
          </div>
          <div className="flex items-center mb-4">
            <h2 className="text-2xl text-gray-500 font-semibold">
              Estilo de vida
            </h2>
          </div>
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-3">
              <label htmlFor="full_name">Nome Completo</label>
              <input
                type="text"
                name="name"
                id="name"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={client.name || ""}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="country">CPF</label>
              <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <input
                  name="cpf"
                  id="cpf"
                  placeholder="Preencha este campo"
                  className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                  value={client.cpf || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="state">Telefone</label>
              <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <input
                  name="phone"
                  id="phone"
                  placeholder="Preencha este campo"
                  className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                  value={client.phone || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="zipcode">Sexo</label>
              <input
                type="text"
                name="gender"
                id="gender"
                className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Preencha este campo"
                value={client.gender || ""}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email">Data de Nascimento</label>
              <input
                type="date"
                name="data"
                id="date"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={client.date || ""}
                onChange={handleChange}
                placeholder="email@domain.com"
                disabled={!isEditable}
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={client.email || ""}
                onChange={handleChange}
                placeholder="email@domain.com"
                disabled={!isEditable}
              />
            </div>
            <div className="md:col-span-3">
              <label htmlFor="address">Rua</label>
              <input
                type="text"
                name="street"
                id="street"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={client.street || ""}
                onChange={handleChange}
                placeholder="Preencha este campo"
                disabled={!isEditable}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="city">Bairro</label>
              <input
                type="text"
                name="district"
                id="district"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={client.district || ""}
                onChange={handleChange}
                placeholder="Preencha este campo"
                disabled={!isEditable}
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="zipcode">Nº</label>
              <input
                type="text"
                name="number"
                id="number"
                className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Preencha este campo"
                value={client.number || ""}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="zipcode">CEP</label>
              <input
                type="text"
                name="cep"
                id="cep"
                className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Preencha este campo"
                value={client.cep || ""}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="country">Cidade</label>
              <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <input
                  name="city"
                  id="city"
                  placeholder="Preencha este campo"
                  className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                  value={client.city || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="state">Estado</label>
              <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <input
                  name="state"
                  id="state"
                  placeholder="Preencha este campo"
                  className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                  value={client.state || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
            </div>

            <div className="md:col-span-3 text-right">
              <div className="inline-flex items-end gap-1">
                {isEditable ? (
                  <>
                    <button
                      className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={toggleCancel}
                    >
                      <i className="ri-close-fill"></i>Cancel
                    </button>
                    <button
                      className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={toggleSave}
                    >
                      <i className="ri-save-line"></i>Save
                    </button>
                  </>
                ) : (
                  <button
                    className=" bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    onClick={toggleEdit}
                  >
                    <i className="ri-pencil-fill"> </i>Edit
                  </button>
                )}
              </div>
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeModal}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
