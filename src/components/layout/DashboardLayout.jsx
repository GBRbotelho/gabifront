import React from "react";
import Navbar from "../menus/Navbar";

function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default DashboardLayout;
