import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { useGetAll } from "../../services/apiService";

function Navbar() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const [activeProfile, setActiveProfile] = useState(false);
  const [activeNotify, setActiveNotify] = useState(false);
  const [consultations, setConsultations] = useState([]);
  const [clients, setClients] = useState([]);
  const { logout, user } = useAuth();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchConsultation = async () => {
      const [clientData, consultationData] = await Promise.all([
        useGetAll("clients", token),
        useGetAll("consultations", token),
      ]);
      setConsultations(consultationData);
      setClients(clientData);
    };
    fetchConsultation();
  }, []);

  // Acesse o segmento da URL após "dashboard/"
  const currentSegment = pathSegments[2]
    ? pathSegments[2].toUpperCase()
    : "CONSULTAS";

  const handleSidebarToggleClick = (e) => {
    e.preventDefault();
    const main = document.querySelector(".main");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");
    const sidebarMenu = document.querySelector(".sidebar-menu");

    main.classList.toggle("active");
    sidebarOverlay.classList.toggle("hidden");
    sidebarMenu.classList.toggle("-translate-x-full");
  };

  const FilterConsultation = consultations.filter((consultationItem) => {
    const DateToday = new Date();
    const DateConsultation = new Date(consultationItem.date);

    return (
      DateConsultation < DateToday && consultationItem.status === "Agendado"
    );
  });

  return (
    <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      <button
        type="button"
        className="text-lg text-gray-600 sidebar-toggle"
        onClick={handleSidebarToggleClick}
      >
        <i className="ri-menu-line"></i>
      </button>
      <ul className="flex items-center text-sm ml-4">
        <li className="hidden mr-2 lg:block">
          <Link
            to={"/dashboard"}
            className="text-gray-400 hover:text-gray-600 font-medium"
          >
            DASHBOARD
          </Link>
        </li>
        <li className="hidden text-gray-600 mr-2 font-medium lg:block">/</li>
        <li className="hidden text-gray-600 mr-2 font-medium lg:block">
          {currentSegment}
        </li>
      </ul>
      <ul className="ml-auto flex items-center">
        <li>
          <p className="text-gray-400">Olá, {user && user.firstName}</p>
        </li>
        <li className="dropdown">
          <button
            type="button"
            className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-emerald-600"
            onClick={() => setActiveNotify(!activeNotify)}
          >
            <i className="ri-notification-3-line"></i>
          </button>
          <div
            className={`fixed right-5 dropdown-menu shadow-md shadow-black/5 z-30 ${
              activeNotify ? "block" : "hidden"
            }  max-w-xs w-full bg-white rounded-md border border-gray-100`}
          >
            <div className="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
              <button
                type="button"
                data-tab="notification"
                data-tab-page="notifications"
                className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active"
              >
                Consultas Pendentes
              </button>
            </div>
            <div className="my-2">
              <ul
                className="max-h-64 overflow-y-auto"
                data-tab-for="notification"
                data-page="notifications"
              >
                {FilterConsultation.length > 0 &&
                  FilterConsultation.map((consultationItem) => (
                    <li>
                      <Link
                        to={`/dashboard/clientes/view/${consultationItem.client}`}
                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                      >
                        {/* <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded block object-cover align-middle"
                        /> */}
                        <div className="ml-2">
                          <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-green-500">
                            {clients
                              .filter(
                                (clientItem) =>
                                  clientItem._id === consultationItem.client
                              )
                              .map((item) => item.name)}
                          </div>

                          <div className="text-[11px] text-gray-400">
                            {new Date(
                              new Date(consultationItem.date).getTime() +
                                24 * 60 * 60 * 1000
                            ).toLocaleDateString("pt-BR")}{" "}
                            - {consultationItem.time}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </li>

        <li className="dropdown ml-3">
          <button
            type="button"
            className="dropdown-toggle flex items-center"
            onClick={() => {
              setActiveProfile(!activeProfile);
              console.log(user);
            }}
          >
            <img
              src="https://placehold.co/32x32"
              alt=""
              className="w-8 h-8 rounded block object-cover align-middle"
            />
          </button>
          <ul
            className={`dropdown-menu shadow-md shadow-black/5 z-30 absolute py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px] right-6 ${
              !activeProfile && "hidden"
            }`}
          >
            <li>
              <a
                href="#"
                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-emerald-500 hover:bg-gray-50"
              >
                Perfil
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-emerald-500 hover:bg-gray-50"
                onClick={() => {
                  logout();
                }}
              >
                Sair
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
