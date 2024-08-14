import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;
  return (
    <div className="fixed inset-0 bg-green-900 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-4xl relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          {product.name}
        </h2>
        <img
          src={product.imagem || "/default-image.jpg"}
          alt={product.name}
          className="w-full h-80 object-cover mb-4 rounded-lg"
          onError={(e) => (e.target.src = "/default-image.jpg")}
        />
        <p className="text-gray-800 mb-4 text-lg">{product.description}</p>
        <p className="text-green-700 font-bold text-xl mb-4">
          {product.price} mt
        </p>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Contactar
        </button>
      </div>
    </div>
  );
};

const CreateProductForm = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    category: '',
    price: '',
    quantity: '',
    location: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handlePriceChange = (values) => {
    setForm(prevForm => ({
      ...prevForm,
      price: values.formattedValue,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prevForm => ({
        ...prevForm,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const categories = ["Vegetais", "Cereais", "Tuberculos", ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-11/12 max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Criar Novo Anúncio</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Categoria</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
              required
            >
              <option value="">Selecione a Categoria</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={form.quantity}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Preço</label>
           <input type="number"/>
          </div>
        
          <div className="mb-4">
            <label className="block text-gray-700">Discrição</label>
            <input
              type="text"
              name="description"
              value={form.location}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Imagem</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-2"
            />
          </div>
          {imagePreview && (
            <div className="mb-4">
              <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-gray-600 transition-colors duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Card = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3036/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDetailsClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleCreateProduct = async (newProduct) => {
    const formData = new FormData();
    Object.keys(newProduct).forEach(key => {
      formData.append(key, newProduct[key]);
    });

    try {
      const response = await fetch("http://localhost:3036/api/products", {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const data = await response.json();
      setProducts(prevProducts => [...prevProducts, data]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <main className="flex-grow mt-6 p-4">
       
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 mb-6"
        >
          Criar Anúncio
        </button>

        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-green-200 rounded-lg shadow-lg p-4 bg-white bg-opacity-80 transition-transform transform hover:scale-105"
              style={{
                backgroundImage: "url('/textures/wood-bg.jpg')",
                backgroundSize: "cover",
              }}
            >
              <img
                src={product.imagem || "/default-image.jpg"}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded-lg border-2 border-green-300"
                onError={(e) => (e.target.src = "/default-image.jpg")}
              />
              <h3 className="text-xl font-semibold mb-2 text-green-700">
                {product.name}
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                {product.description}
              </p>
              <p className="text-green-600 font-semibold text-lg mb-2">
                {product.price} mt
              </p>
              <div className="flex gap-3 justify-between mt-2">
                <button
                  className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
                  onClick={() => handleDetailsClick(product)}
                >
                  <FiAlertCircle />
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  Adicionar ao cesto
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        )}

        {isFormOpen && (
          <CreateProductForm onClose={() => setIsFormOpen(false)} onSubmit={handleCreateProduct} />
        )}
      </main>
    </div>
  );
};
