// DashboardPage.js
import React, { useState, useEffect } from "react";
import { useGetAll, useDeleteData } from "../services/apiService";
import ModalAddProduct from "../components/forms/ModalAddProduct";
import ModalViewProduct from "../components/forms/ModalViewProduct";

function ProductsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [addProductActive, setAddProductActive] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);

  const reloadProducts = async () => {
    try {
      const token = await localStorage.getItem("token");
      const data = await useGetAll("products", token); // Passe o token na chamada
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleDelete = async (productItem) => {
    const token = await localStorage.getItem("token");
    await useDeleteData(productItem._id, "products", token);
    await reloadProducts();
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    async function fetchProductsData() {
      try {
        const token = await localStorage.getItem("token");
        const data = await useGetAll("products", token); // Passe o token na chamada
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProductsData();
  }, []);
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="flex items-center w-full overflow-y-auto">
        <ul className="ml-auto flex items-center">
          <li className="mr-1 dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
              onClick={handleSearchClick}
            >
              <i className="ri-search-line"></i>
            </button>
            <div
              className={`dropdown-menu shadow-md shadow-black/5 z-30  max-w-xs w-full bg-white rounded-md border border-gray-100 ${
                isSearchOpen ? "block" : "hidden"
              }`}
            >
              <form action="" className="p-4 border-b border-b-gray-100">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                    placeholder="Search..."
                  />
                  <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"></i>
                </div>
              </form>
            </div>
          </li>
        </ul>
        <button
          className=" text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-green-600"
          onClick={() => setAddProductActive(true)}
        >
          <i className="ri-user-add-fill"></i>
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="px-4 py-3 text-center">Nome</th>
              <th className="px-4 py-3 text-center">Lote</th>
              <th className="px-4 py-3 text-center">Validade</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Options</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index} className="text-gray-700">
                  <td
                    className="px-4 py-3 border text-center"
                    key={`name_${product.id}`}
                  >
                    {product.name}
                  </td>
                  <td
                    className="px-4 py-3 text-ms border text-center"
                    key={`lote_${product._id}`}
                  >
                    {product.lote}
                  </td>
                  <td
                    className="px-4 py-3 text-ms border text-center"
                    key={`validade_${product._id}`}
                  >
                    {new Date(
                      new Date(product.validade).getTime() + 24 * 60 * 60 * 1000
                    ).toLocaleDateString("pt-BR")}
                  </td>
                  {product.status === "Disponível" && (
                    <td className="px-4 py-3 border text-center">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {product.status}
                      </span>
                    </td>
                  )}
                  {product.status === "Esgotado" && (
                    <td className="px-4 py-3 border text-center">
                      <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                        {product.status}
                      </span>
                    </td>
                  )}
                  <td
                    className="px-2 py-3 border options-cell"
                    style={{ width: "50px" }}
                    key={`options_${product._id}`}
                  >
                    <div className="flex items-center space-x-2">
                      <button
                        className="w-8 h-8 text-green-500 transform hover:scale-110 transition-transform"
                        onClick={() => setViewProduct(product)}
                      >
                        <i className="ri-eye-line text-3xl"></i>
                      </button>
                      <button
                        className="w-8 h-8 text-red-500 transform hover:scale-110 transition-transform"
                        onClick={() => handleDelete(product)}
                      >
                        <i className="ri-delete-bin-5-line text-3xl"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-3 text-gray-700 border" colSpan="5">
                  Não foram encontrados produtos cadastrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {addProductActive && (
          <ModalAddProduct
            reloadProducts={reloadProducts}
            setAddProductActive={setAddProductActive}
          />
        )}
        {viewProduct && (
          <ModalViewProduct
            viewProduct={viewProduct}
            setViewProduct={setViewProduct}
            reloadProducts={reloadProducts}
          />
        )}
      </div>
    </section>
  );
}

export default ProductsPage;
