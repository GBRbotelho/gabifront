import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Manipulador de clique para o overlay
  const handleSidebarOverlayClick = (e) => {
    e.preventDefault();
    const main = document.querySelector(".main");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");
    const sidebarMenu = document.querySelector(".sidebar-menu");

    main.classList.add("active");
    sidebarOverlay.classList.add("hidden");
    sidebarMenu.classList.add("-translate-x-full");
  };

  return (
    <div>
      <div className="fixed left-0 top-0 w-64 h-full bg-emerald-900 p-4 z-50 sidebar-menu transition-transform">
        <div className="flex flex-col justify-between h-full">
          <div>
            <a
              href="#"
              className="flex items-center pb-4 border-b border-b-emerald-800"
            >
              <img
                src="https://placehold.co/32x32"
                alt=""
                className="w-8 h-8 rounded object-cover"
              />
              <span className="text-lg font-bold text-white ml-3">
                ByteWave
              </span>
            </a>
            <ul className="mt-4">
              <li className="mb-1 group">
                <Link
                  to="/dashboard/"
                  className="flex items-center py-2 px-4 text-emerald-300 hover:bg-emerald-950 hover:text-emerald-100 rounded-md group-[.active]:bg-emerald-800 group-[.active]:text-white group-[.selected]:bg-emerald-950 group-[.selected]:text-emerald-100"
                >
                  <i className="ri-calendar-check-line  mr-3 text-lg"></i>
                  <span className="text-sm">Consultas</span>
                </Link>
              </li>
              <li className="mb-1 group">
                <Link
                  to="/dashboard/clientes"
                  className="flex items-center py-2 px-4 text-emerald-300 hover:bg-emerald-950 hover:text-emerald-100 rounded-md group-[.active]:bg-emerald-800 group-[.active]:text-white group-[.selected]:bg-emerald-950 group-[.selected]:text-emerald-100"
                >
                  <i className="ri-contacts-line  mr-3 text-lg"></i>
                  <span className="text-sm">Clientes</span>
                </Link>
              </li>
              <li className="mb-1 group">
                <Link
                  to="/dashboard/servicos"
                  className="flex items-center py-2 px-4 text-emerald-300 hover:bg-emerald-950 hover:text-emerald-100 rounded-md group-[.active]:bg-emerald-800 group-[.active]:text-white group-[.selected]:bg-emerald-950 group-[.selected]:text-emerald-100"
                >
                  <i className="ri-service-line mr-3 text-lg"></i>
                  <span className="text-sm">Serviços</span>
                </Link>
              </li>
              <li className="mb-1 group">
                <Link
                  to="/dashboard/produtos"
                  className="flex items-center py-2 px-4 text-emerald-300 hover:bg-emerald-950 hover:text-emerald-100 rounded-md group-[.active]:bg-emerald-800 group-[.active]:text-white group-[.selected]:bg-emerald-950 group-[.selected]:text-emerald-100"
                >
                  <i className="ri-ink-bottle-line mr-3 text-lg"></i>
                  <span className="text-sm">Produtos</span>
                </Link>
              </li>
              <li className="mb-1 group">
                <Link
                  to="/dashboard/tratamentos"
                  className="flex items-center py-2 px-4 text-emerald-300 hover:bg-emerald-950 hover:text-emerald-100 rounded-md group-[.active]:bg-emerald-800 group-[.active]:text-white group-[.selected]:bg-emerald-950 group-[.selected]:text-emerald-100"
                >
                  <i className="ri-survey-line mr-3 text-lg"></i>
                  <span className="text-sm">Tratamentos</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-1 group">
            <Link
              to={"/dashboard/usuarios"}
              className="flex items-center py-2 px-4 text-emerald-300 hover:bg-emerald-950 hover:text-emerald-100 rounded-md group-[.active]:bg-emerald-800 group-[.active]:text-white group-[.selected]:bg-emerald-950 group-[.selected]:text-emerald-100"
            >
              <i className="ri-settings-2-line mr-3 text-lg"></i>
              <span className="text-sm">Usuarios</span>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"
        onClick={handleSidebarOverlayClick}
      ></div>
    </div>
  );
}
