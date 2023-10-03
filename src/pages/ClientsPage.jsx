// DashboardPage.js
import React from "react";

function ClientsPage() {
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">CPF</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Options</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {/* Exemplo de linha */}
              <tr className="text-gray-700">
                <td className="px-4 py-3 border">
                  {/* Conteúdo da primeira coluna */}
                </td>
                <td className="px-4 py-3 text-ms font-semibold border">
                  {/* Conteúdo da segunda coluna */}
                </td>
                <td className="px-4 py-3 text-xs border">
                  {/* Conteúdo da terceira coluna */}
                </td>
                <td className="px-4 py-3 text-sm border"></td>
                <td
                  className="px-2 py-3 border options-cell"
                  style={{ width: "50px" }}
                >
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="32"
                      height="32"
                    >
                      <path
                        d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"
                        fill="rgba(100,205,138,1)"
                      ></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="32"
                      height="32"
                    >
                      <path
                        d="M16.6256 3.12837L9.29145 10.4625L9.29886 14.7097L13.537 14.7022L20.8682 7.37102C21.5912 8.75426 22 10.3277 22 11.9966C22 17.5194 17.5228 21.9966 12 21.9966C6.47715 21.9966 2 17.5194 2 11.9966C2 6.47373 6.47715 1.99658 12 1.99658C13.6689 1.99658 15.2423 2.40541 16.6256 3.12837ZM20.4853 2.09709L21.8995 3.5113L12.7071 12.7037L11.2954 12.7062L11.2929 11.2895L20.4853 2.09709Z"
                        fill="rgba(240,187,64,1)"
                      ></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="32"
                      height="32"
                    >
                      <path
                        d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM9 4V6H15V4H9Z"
                        fill="rgba(193,41,41,1)"
                      ></path>
                    </svg>
                  </div>
                </td>
              </tr>
              {/* Fim do exemplo de linha */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ClientsPage;
