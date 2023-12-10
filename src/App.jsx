// src/App.js
import React from "react";
import Routes from "./routes/Routes";
import { AuthProvider } from "./utils/AuthContext";
import { LoadingProvider } from "./utils/LoadingContext";

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <div className="text-gray-800 font-inter">
          <Routes />
        </div>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
