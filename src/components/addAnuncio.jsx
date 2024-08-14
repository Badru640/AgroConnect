import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AddAnuncio = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ownerId: "",
    address: "",
    image: null, // For handling file uploads
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0], // Only take the first file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("owner", formData.ownerId);
    formDataToSend.append("address", formData.address);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:3036/api/product/", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      setSuccess("Product added successfully!");
      setTimeout(() => navigate("/pages/admin-dashboard"), 2000);
    } catch (error) {
      setError("Error adding product. Please try again.");
    }
  };

  const handleClose = () => {
    navigate("/"); // Navigate to home page or another URL
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
      <Link to="/" className="inline-block absolute top-2 left-2">
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          Home Page
        </button>
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Fechar
        </button>
        <h2 className="text-2xl font-bold mb-6 text-left">Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-left font-medium"
              >
                Nome do Produto
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name of the product"
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
                value={formData.categoryId}
                onChange={handleChange}
                placeholder="Categoria ID"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <label
                htmlFor="price"
                className="block text-gray-700 text-left font-medium mt-4"
              >
                Preço
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Preço do produto"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-left font-medium"
            >
              Descrição do Produto
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descrição do produto"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-gray-700 text-left font-medium"
            >
              Imagem do Produto
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="mt-1 block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border file:border-gray-300
                         file:text-sm file:font-semibold
                         file:bg-green-50 file:text-green-700
                         hover:file:bg-green-100"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnuncio;
