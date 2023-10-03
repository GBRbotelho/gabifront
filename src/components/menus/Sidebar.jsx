import React, { useState } from "react";

export default function Sidebar() {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleDropdownClick = (menuName) => (e) => {
    e.preventDefault();
    if (menuName === "orders") {
      setIsOrdersOpen(!isOrdersOpen);
    } else if (menuName === "services") {
      setIsServicesOpen(!isServicesOpen);
    }
  };

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
        <a
          href="#"
          className="flex items-center pb-4 border-b border-b-emerald-800"
        >
          <img
            src="https://placehold.co/32x32"
            alt=""
            className="w-8 h-8 rounded object-cover"
          />
          <span className="text-lg font-bold text-white ml-3">ByteWave</span>
        </a>
        <ul className="mt-4">
          <li className="mb-1 group active">
            <a
              href="#"
              className="flex items-center py-2 px-4 text-emerald-300 hover:bg-emerald-950 hover:text-emerald-100 rounded-md group-[.active]:bg-emerald-800 group-[.active]:text-white group-[.selected]:bg-emerald-950 group-[.selected]:text-emerald-100"
            >
              <i className="ri-home-2-line mr-3 text-lg"></i>
              <span className="text-sm">Inicio</span>
            </a>
          </li>
          <li className="mb-1 group">
            <a
              href="#"
              className={`flex items-center py-2 px-4 text-emerald-300 hover:bg-emerald-950 hover:text-emerald-100 rounded-md group-[.active]:bg-emerald-800 group-[.active]:text-white group-[.selected]:bg-emerald-950 group-[.selected]:text-emerald-100 sidebar-dropdown-toggle ${
                isOrdersOpen ? "selected" : ""
              }`}
              onClick={handleDropdownClick("orders")}
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <span className="text-sm">Tabelas</span>
              <i
                className={`ri-arrow-right-s-line ml-auto ${
                  isOrdersOpen ? "rotate-90" : ""
                }`}
              ></i>
            </a>
            <ul className={`pl-7 mt-2 ${isOrdersOpen ? "block" : "hidden"}`}>
              <li className="mb-4">
                <a
                  href="#"
                  className="text-emerald-300 text-sm flex items-center hover:text-emerald-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-emerald-300 before:mr-3"
                >
                  Clientes
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  className="text-emerald-300 text-sm flex items-center hover:text-emerald-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-emerald-300 before:mr-3"
                >
                  Fichas
                </a>
              </li>
            </ul>
          </li>
          <li className="mb-1 group">
            <a
              href="#"
              className="flex items-center py-2 px-4 text-emerald-300 hover:bg-emerald-950 hover:text-emerald-100 rounded-md group-[.active]:bg-emerald-800 group-[.active]:text-white group-[.selected]:bg-emerald-950 group-[.selected]:text-emerald-100 sidebar-dropdown-toggle"
              onClick={handleDropdownClick("services")}
            >
              <i className="ri-flashlight-line mr-3 text-lg"></i>
              <span className="text-sm">Serviços</span>
              <i
                className={`ri-arrow-right-s-line ml-auto ${
                  isServicesOpen ? "rotate-90" : ""
                }`}
              ></i>
            </a>
            <ul className={`pl-7 mt-2 ${isServicesOpen ? "block" : "hidden"}`}>
              <li className="mb-4">
                <a
                  href="#"
                  className="text-emerald-300 text-sm flex items-center hover:text-emerald-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-emerald-300 before:mr-3"
                >
                  Serviços
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  className="text-emerald-300 text-sm flex items-center hover:text-emerald-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-emerald-300 before:mr-3"
                >
                  Produtos
                </a>
              </li>
            </ul>
          </li>
          <li className="mb-1 group">
            <a
              href="#"
              className="flex items-center py-2 px-4 text-emerald-300 hover:bg-emerald-950 hover:text-emerald-100 rounded-md group-[.active]:bg-emerald-800 group-[.active]:text-white group-[.selected]:bg-emerald-950 group-[.selected]:text-emerald-100"
            >
              <i className="ri-settings-2-line mr-3 text-lg"></i>
              <span className="text-sm">Configurações</span>
            </a>
          </li>
        </ul>
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"
        onClick={handleSidebarOverlayClick}
      ></div>
    </div>
  );
}
