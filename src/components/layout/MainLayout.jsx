import Navbar from "../menus/Navbar";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
      <Navbar />
    </main>
  );
}

export default DashboardLayout;
