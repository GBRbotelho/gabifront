import React from "react";
import Navbar from "../menus/Navbar";
import Sidebar from "../menus/Sidebar"; // Importe o Sidebar aqui

function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar /> {/* Navbar no topo */}
      <div className="flex">
        <Sidebar /> {/* Sidebar à esquerda */}
        <main>{children}</main> {/* Conteúdo principal */}
      </div>
    </div>
  );
}

export default DashboardLayout;
