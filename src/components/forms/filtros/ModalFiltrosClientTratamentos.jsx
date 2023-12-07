import React from "react";

function ModalFiltrosClientTratamentos({
  setModalFiltersTrataments,
  concluidos,
  setConcluidos,
  andamentos,
  setAndamentos,
}) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center bg-black/50 justify-center"
      style={{ zIndex: 100 }}
    >
      <div className="absolute bg-white p-4 w-96 rounded shadow-md">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold">Filtros</h2>
        </div>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-2 flex flex-col gap-1 items-center">
            <label htmlFor="name">Andamentos</label>
            <label className="relative inline-flex items-center me-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={andamentos}
                onChange={(e) => setAndamentos(!andamentos)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>
          <div className="md:col-span-2 flex flex-col gap-1 items-center">
            <label htmlFor="name">Concluídos</label>
            <label className="relative inline-flex items-center me-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={concluidos}
                onChange={(e) => setConcluidos(!concluidos)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setModalFiltersTrataments(false);
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalFiltrosClientTratamentos;
