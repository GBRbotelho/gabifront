import React from "react";

export default function ModalEditConsultation({
  setConfirmConsultation,
  forceSave,
}) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center bg-black/50 justify-center"
      style={{ zIndex: 100 }}
    >
      <div className="absolute bg-white p-4 w-96 rounded shadow-md">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold">Confirmação</h2>
        </div>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
          <p className="md:col-span-6">
            Você tem certeza? Após confirmar você não podera fazer mais
            alterações na consulta.
          </p>
        </div>
        <div className="flex justify-between mt-3">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setConfirmConsultation(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setConfirmConsultation(false);
              forceSave();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
