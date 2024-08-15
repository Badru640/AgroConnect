import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "./global/header";

export const AddAnuncio = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 5566,
    category: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:3036/api/products", {
        ...formData,
      });
      if (!response.ok) {
        throw new Error("Failed to add produts");
      }

      setSuccess("Produt added successfully!");
    } catch (error) {
      setError("Error adding store. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
        <Link to="/" className="inline-block absolute top-2 left-2">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Home Page
          </button>
        </Link>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-left">Add Produts</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-left font-medium"
                >
                  Produts Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name of the Produts"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="categoryId"
                  className="block text-gray-700 text-left font-medium"
                >
                  Categoria ID
                </label>
                <input
                  type="text"
                  id="categoryId"
                  name="categoryId"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="categoria ID"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <label
                  htmlFor="address"
                  className="block text-gray-700 text-left font-medium mt-4"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="Price of the produts"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-gray-700 text-left font-medium"
              >
                Produt Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Produts Description"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500 h-32 resize-none"
              ></textarea>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAnuncio;
