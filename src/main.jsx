import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./tailwind.css";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");

if (root) {
  const reactRoot = createRoot(root);
  reactRoot.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
