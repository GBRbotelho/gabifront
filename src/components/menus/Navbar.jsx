import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { useGetAll } from "../../services/apiService";
import ModalProfile from "../forms/ModalProfile";

//Import Images
import Photo1 from "../../assets/profiles/1.svg";
import Photo2 from "../../assets/profiles/2.svg";
import Photo3 from "../../assets/profiles/3.svg";
import Photo4 from "../../assets/profiles/4.svg";
import Photo5 from "../../assets/profiles/5.svg";
import Photo6 from "../../assets/profiles/6.svg";
import Photo7 from "../../assets/profiles/7.svg";
import Photo8 from "../../assets/profiles/8.svg";
import Photo9 from "../../assets/profiles/9.svg";
import Photo10 from "../../assets/profiles/10.svg";
import Photo11 from "../../assets/profiles/11.svg";
import Photo12 from "../../assets/profiles/12.svg";
import Photo13 from "../../assets/profiles/13.svg";
import Photo14 from "../../assets/profiles/14.svg";
import Photo15 from "../../assets/profiles/15.svg";
import Photo16 from "../../assets/profiles/16.svg";
import Photo17 from "../../assets/profiles/17.svg";
import Photo18 from "../../assets/profiles/18.svg";
import Photo19 from "../../assets/profiles/19.svg";
import Photo20 from "../../assets/profiles/20.svg";
import Photo21 from "../../assets/profiles/21.svg";
import Photo22 from "../../assets/profiles/22.svg";
import Photo23 from "../../assets/profiles/23.svg";
import Photo24 from "../../assets/profiles/24.svg";

const avatarImages = [
  Photo1,
  Photo2,
  Photo3,
  Photo4,
  Photo5,
  Photo6,
  Photo7,
  Photo8,
  Photo9,
  Photo10,
  Photo11,
  Photo12,
  Photo13,
  Photo14,
  Photo15,
  Photo16,
  Photo17,
  Photo18,
  Photo19,
  Photo20,
  Photo21,
  Photo22,
  Photo23,
  Photo24,
  // Adicione outras fotos conforme necessário
];
//Fim IMporte Images

function Navbar() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const [activeProfile, setActiveProfile] = useState(false);
  const [activeNotify, setActiveNotify] = useState(false);
  const [consultations, setConsultations] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);
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

    // Extrai ano, mês e dia da consulta
    const consultationDateParts = consultationItem.date.split("-");
    const consultationYear = parseInt(consultationDateParts[0]);
    const consultationMonth = parseInt(consultationDateParts[1]) - 1; // Mês é baseado em zero
    const consultationDay = parseInt(consultationDateParts[2]);

    // Extrai horas e minutos da consulta
    const consultationTimeParts = consultationItem.time.split(":");
    const consultationHour = parseInt(consultationTimeParts[0]);
    const consultationMinute = parseInt(consultationTimeParts[1]);

    const DateConsultation = new Date(
      consultationYear,
      consultationMonth,
      consultationDay,
      consultationHour,
      consultationMinute
    );

    // Verifica se a consulta é do mesmo dia
    const isSameDay =
      DateConsultation.toDateString() === DateToday.toDateString();

    // Se for do mesmo dia, verifica se a hora da consulta já passou pelo menos 1 hora
    if (
      (isSameDay &&
        DateConsultation.getTime() + 60 * 60 * 1000 <= DateToday.getTime()) ||
      (!isSameDay && DateConsultation < DateToday)
    ) {
      return consultationItem.status === "Agendado";
    }

    return false;
  });

  const userPhoto = avatarImages[parseInt(user && user.photo, 10) - 1];

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
            className="relative dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-emerald-600"
            onClick={() => setActiveNotify(!activeNotify)}
          >
            <i className="ri-notification-3-line"></i>
            {FilterConsultation.length > 0 && (
              <span className="absolute bottom-0 left-5 bg-red-500 text-white rounded-full px-2 py-2 h-2 w-1 flex items-center justify-center text-xs">
                {FilterConsultation.length}
              </span>
            )}
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
                key="consultationList"
                className="max-h-64 overflow-y-auto"
                data-tab-for="notification"
                data-page="notifications"
              >
                {FilterConsultation.length > 0 ? (
                  FilterConsultation.map((consultationItem) => (
                    <li key={consultationItem._id}>
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
                  ))
                ) : (
                  <div className="ml-2">
                    <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-green-500">
                      Não tem consultas pendentes!
                    </div>
                  </div>
                )}
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
              src={userPhoto}
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
                onClick={() => setProfileOpen(true)}
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
      {profileOpen && <ModalProfile setProfileOpen={setProfileOpen} />}
    </div>
  );
}

export default Navbar;
