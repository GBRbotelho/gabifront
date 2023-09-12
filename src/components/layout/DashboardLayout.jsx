import React, { useState } from "react";
import Navbar from "../menus/Navbar";
import Sidebar from "../menus/Sidebar";

function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Função para lidar com a abertura/fechamento do Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Passe o estado isSidebarOpen e a função toggleSidebar para o Navbar e o Sidebar */}
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
