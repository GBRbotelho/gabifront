import React from "react";

function Navbar({ isSidebarOpen, toggleSidebar }) {
  const handleToggleSidebar = () => {
    // Verifique se a barra lateral deve ser exibida ou oculta
    if (isSidebarOpen) {
      toggleSidebar(false); // Fecha a barra lateral se estiver aberta
    } else {
      toggleSidebar(true); // Abre a barra lateral se estiver fechada
    }
  };

  return (
    <nav className="sticky top-0 left-0 z-[70] h-[61px] w-full border-b border-gray-200 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="h-[61px] bg-custom px-3 py-2 print:hidden lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            {/* Sempre exiba o botão do menu, não importa o tamanho da tela */}
            <button
              onClick={handleToggleSidebar}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <a to="/" className="ml-2 flex md:mr-24">
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
                ByteWave
              </span>
            </a>
          </div>
          <div className="flex items-center justify-center gap-5">
            <div>
              <h1>Usuario</h1>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
