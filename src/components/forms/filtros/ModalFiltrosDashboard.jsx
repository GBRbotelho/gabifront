import React from "react";

function ModalFiltrosDashboard({
  toggleFilters,
  initialDate,
  setInitialDate,
  finalDate,
  setFinalDate,
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center bg-black/50 justify-center">
      <div className="absolute bg-white p-4 w-96 rounded shadow-md">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold">Filtros</h2>
        </div>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-4">
            <label htmlFor="name">Periodo</label>
            <div className="flex gap-5">
              <input
                name="initialDate"
                id="initialDate"
                type="date"
                value={initialDate}
                onChange={(e) => setInitialDate(e.target.value)}
                className="h-10 border mt-1 rounded px-4 w-full bg-white"
              />
              <input
                name="finalDate"
                id="finalDate"
                type="date"
                value={finalDate}
                onChange={(e) => setFinalDate(e.target.value)}
                className="h-10 border mt-1 rounded px-4 w-full bg-white"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={toggleFilters}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalFiltrosDashboard;
