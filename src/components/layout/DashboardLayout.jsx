import React from "react";
import Sidebar from "../menus/Sidebar";
import MainLayout from "./MainLayout";

function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />
      <MainLayout>{children}</MainLayout>
    </>
  );
}

export default DashboardLayout;
