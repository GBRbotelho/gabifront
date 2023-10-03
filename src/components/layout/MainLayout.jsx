import Navbar from "../menus/Navbar";
import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import DashboardPage from "../../pages/DashboardPage";
import ClientsPage from "../../pages/ClientsPage";

function MainLayout({ children }) {
  return (
    <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
      <Navbar />
      {children}
    </main>
  );
}

export default MainLayout;
