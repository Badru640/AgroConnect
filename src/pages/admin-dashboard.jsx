import { useEffect, useState } from "react";
import { Header } from "../components/global/header";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3036/api/products/");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    // Atualiza os produtos a cada 2 segundos
    const interval = setInterval(fetchProducts, 2000);
    fetchProducts();

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <div className="bg-white shadow rounded-lg p-6 mt-0">
        <button
          onClick={() => navigate(-1)}
          className="bg-green-500 text-white py-2 px-4 mb-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Voltar
        </button>

        <h2 className="text-2xl font-bold mb-4">Produtos</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-green-100">
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-gray-300">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">
                  {product.category?.name || "N/A"}{" "}
                  {/* Verifica se category existe e exibe o nome ou "N/A" */}
                </td>
                <td className="px-4 py-2">{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
