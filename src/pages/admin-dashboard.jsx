import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [Products, setProduct] = useState([]);

  useEffect(() => {
    let interval;

    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:3036/api/Products/");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    interval = setInterval(fetchProduct, 2000);
    fetchProduct();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <Link to="/" className="inline-block absolute top-2 left-2">
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          Home Page
        </button>
      </Link>
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
          {Products.map((Product) => (
            <tr key={Product._id} className="border-t border-gray-300">
              <td className="px-4 py-2">{Product.name}</td>
              <td className="px-4 py-2">{`${Product.category.firstName} ${Product.category.lastName}`}</td>
              <td className="px-4 py-2">{Product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
