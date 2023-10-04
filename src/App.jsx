// src/App.js
import React from "react";
import Routes from "./routes/Routes";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="text-gray-800 font-inter">
        <Routes />
      </div>
    </AuthProvider>
  );
}

export default App;
