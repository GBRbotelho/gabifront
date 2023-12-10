// FlashMessage.jsx

import React from "react";

const FlashMessage = ({ message, type, onClose }) => {
  console.log("Passou aqui");
  return (
    <div
      className={`fixed flex gap-5 items-center top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded ${
        type === "success"
          ? "bg-green-400 text-white border-green-600"
          : "bg-red-400 text-white"
      }`}
      style={{ zIndex: 1000 }}
    >
      <p>{message}</p>
      <button
        className="text-white rounded hover:scale-125 transition-transform"
        onClick={onClose}
      >
        <i class="ri-close-line text-gray-300 hover:text-white"></i>
      </button>
    </div>
  );
};

export default FlashMessage;
