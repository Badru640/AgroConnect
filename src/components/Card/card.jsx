import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { useCart } from "../CartContext"; // Import your cart context
import { useAuth } from "../../AuthContext"; // Import useAuth
import { Link } from "react-router-dom";

const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    // Criar a mensagem para o WhatsApp
    const createWhatsAppMessage = () => {
        return encodeURIComponent(`Olá! Estou interessado no produto ${product.name}.\n\nDescrição: ${product.description}\nPreço: ${product.price} mt\n\nGostaria de mais informações.`);
    };

    // Criar o link para o WhatsApp
    const whatsappLink = `https://wa.me/847640433?text=${createWhatsAppMessage()}`; // Substitua "1234567890" pelo número desejado

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
                <h2 className="text-2xl font-bold mb-4 text-green-800">{product.name}</h2>
                <img
                    src={product.imagem || "/default-image.jpg"}
                    alt={product.name}
                    className="w-full h-80 object-cover mb-4 rounded-lg"
                    onError={(e) => (e.target.src = "/default-image.jpg")}
                />
                <p className="text-gray-800 mb-4 text-lg">{product.description}</p>
                <p className="text-green-700 font-bold text-xl mb-4">{product.price} mt</p>
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Enviar Mensagem no WhatsApp
                </a>
            </div>
        </div>
    );
};

export const Card = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useCart();
    const { isAdmin } = useAuth(); // Get user info and role

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

    const handlePurchaseComplete = async (product) => {
        try {
            // Call to backend to mark the purchase as complete
            const response = await fetch(`http://localhost:3036/api/products/${product._id}/complete`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to update product status');
            }
            // Remove the product from local state
            setProducts(prevProducts => prevProducts.filter(p => p._id !== product._id));
        } catch (error) {
            console.error('Error completing purchase:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-green-50">
            <main className="flex-grow mt-6 p-4">

               {isAdmin && <Link to="/Add-Anuncio">
                    <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 mb-6">
                        Criar Anúncio
                    </button>
                </Link>}

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
                            <h3 className="text-xl font-semibold mb-2 text-green-700">{product.name}</h3>
                            <p className="text-gray-700 text-sm mb-2">{product.description}</p>
                            <p className="text-green-600 font-semibold text-lg mb-2">{product.price} mt</p>
                            <div className="flex gap-3 justify-between mt-2">
                                <button
                                    className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
                                    onClick={() => handleDetailsClick(product)}
                                >
                                    <FiAlertCircle />
                                </button>
                                {!isAdmin && (
                                    <button
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Adicionar ao cesto
                                    </button>
                                )}
                                
                                {isAdmin && (
                                    <button
                                        className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
                                        onClick={() => handlePurchaseComplete(product)}
                                    >
                                        Compra Concluída
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <main className="flex-grow mt-6 p-4">
        <Link to="/Add-Anuncio">
          <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 mb-6">
            Criar Anúncio
          </button>
        </Link>

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
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  onClick={() => handleAddToCart(product)}
                >
                  Adicionar ao cesto
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </main>
    </div>
  );
};
