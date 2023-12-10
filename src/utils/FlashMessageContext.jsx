// FlashMessageContext.jsx

import React, { createContext, useContext, useState } from "react";
import FlashMessage from "./FlashMessage";

const FlashMessageContext = createContext();

export const FlashMessageProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);

  const showMessage = (message, type = "success") => {
    setFlashMessage({ message, type });
    setTimeout(() => {
      setFlashMessage(null);
    }, 2500);
  };

  const closeMessage = () => {
    setFlashMessage(null);
  };

  return (
    <FlashMessageContext.Provider value={showMessage}>
      {children}
      {flashMessage && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          onClose={closeMessage}
        />
      )}
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage = () => {
  const showMessage = useContext(FlashMessageContext);
  return showMessage;
};
