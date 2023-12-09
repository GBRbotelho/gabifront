import React from "react";

function ModalFiltrosClientTratamentos({
  setModalFiltersClients,
  selectTime,
  setSelectTime,
  selectMonth,
  setSelectMonth,
}) {
  const months = [
    "Todos os meses",
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center bg-black/50 justify-center"
      style={{ zIndex: 100 }}
    >
      <div className="absolute bg-white p-4 w-96 rounded shadow-md">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold">Filtros</h2>
        </div>
        {/* Filtros */}
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-4 flex flex-col gap-1 items-center">
            <label htmlFor="name">Clientes que:</label>
            <select
              className="h-10 border rounded px-4 bg-white w-full"
              value={selectTime}
              onChange={(e) => setSelectTime(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="1month">Não concluem uma consulta a 1 Mês</option>
              <option value="6months">
                Não concluem uma consulta a 6 Meses
              </option>
              <option value="12months">
                Não concluem uma consulta a 12 Meses
              </option>
            </select>
          </div>
          <div className="md:col-span-4 flex flex-col gap-1 items-center">
            <label htmlFor="name">Fazem aniversário em:</label>
            <select
              className="h-10 border rounded px-4 bg-white w-full"
              value={selectMonth}
              onChange={(e) => setSelectMonth(e.target.value)}
            >
              {months.map((month, index) => (
                <option key={index} value={index === 0 ? "all" : index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Fim dos Filtros */}
        <div className="flex justify-center mt-3">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setModalFiltersClients(false);
            }}
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalFiltrosClientTratamentos;
