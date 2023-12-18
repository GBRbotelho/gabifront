import Navbar from "../menus/Navbar";
import React from "react";
import { LoadingProvider } from "../../utils/LoadingContext";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { useLoading } from "../../utils/LoadingContext";

function MainLayout({ children }) {
  const { loading } = useLoading();

  return (
    <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
      <Navbar />
      {/* {!loading && <>{children}</>} */}
      {children}
      <LoadingSpinner />
    </main>
  );
}

export default MainLayout;
