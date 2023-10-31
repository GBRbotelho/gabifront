import React, { useState } from "react";
import { addService } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ServicesAddPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData({
      ...serviceData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(serviceData);
    try {
      const token = await localStorage.getItem("token");
      const response = await addService(token, serviceData).catch((error) => {
        if (error.error) {
          setError(error.error);
        } else {
          navigate("/dashboard/servicos");
        }
      });

      if (response.error) {
        setError(response.error);
      } else {
        navigate("/dashboard/servicos");
      }
    } catch (error) {
      if (error.error) {
        setError(error.error);
      } else console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto">
        <div>
          <Link
            to="/dashboard/servicos"
            className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-emerald-900 rounded-md   focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#FFFFFF"
            >
              <g>
                <rect fill="none" height="24" width="24"></rect>
              </g>
              <g>
                <g>
                  <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                </g>
              </g>
            </svg>
            <span className="pl-2 mx-1">SERVIÇO</span>
          </Link>
          <div className="mt-5 bg-white rounded-lg shadow">
            <div className="flex">
              <div className="flex-1 py-5 pl-5 overflow-hidden">
                <h1 className="inline text-2xl font-semibold leading-none">
                  DADOS
                </h1>
              </div>
            </div>
            <div className="px-5 pb-5">
              <input
                name="name"
                placeholder="Nome"
                value={serviceData.name}
                onChange={handleInputChange}
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-emerald-400"
              />
              <textarea
                name="description"
                placeholder="Descrição"
                value={serviceData.description}
                onChange={handleInputChange}
                className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-emerald-400"
              />
            </div>
            <hr className="mt-4" />
            <div className="flex flex-row-reverse p-3">
              <div className="flex-initial pl-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-emerald-800  focus:outline-none focus:bg-emerald-900  transition duration-300 transform active:scale-95 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#FFFFFF"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none"></path>
                    <path
                      d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
                      opacity=".3"
                    ></path>
                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                  </svg>
                  <span className="pl-2 mx-1">Save</span>
                </button>
              </div>
              <div className="flex-initial">
                <Link
                  to="/dashboard/servicos"
                  type="button"
                  className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none"></path>
                    <path d="M8 9h8v10H8z" opacity=".3"></path>
                    <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
                  </svg>
                  <span className="pl-2 mx-1">Cancelar</span>
                </Link>
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesAddPage;
