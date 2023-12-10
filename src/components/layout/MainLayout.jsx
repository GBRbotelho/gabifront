import Navbar from "../menus/Navbar";
import React from "react";
import { LoadingProvider } from "../../utils/LoadingContext";
import LoadingSpinner from "../../utils/LoadingSpinner";

function MainLayout({ children }) {
  return (
    <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
      <Navbar />
      {children}
      <LoadingSpinner />
    </main>
  );
}

export default MainLayout;
