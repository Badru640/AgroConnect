import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { useCart } from "../CartContext";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    const createWhatsAppMessage = () => {
        return encodeURIComponent(
            `Olá! Estou interessado no produto ${product.name}.\n\nDescrição: ${product.description}\nPreço: ${product.price} mt\n\nGostaria de mais informações.`
        );
    };

    const whatsappLink = `https://wa.me/847640433?text=${createWhatsAppMessage()}`;

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
    const [notification, setNotification] = useState(null);
    const { addToCart } = useCart();
    const { isAdmin } = useAuth();

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

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handlePurchaseComplete = async (product) => {
        try {
            setProducts((prevProducts) =>
                prevProducts.filter((p) => p._id !== product._id)
            );

            const response = await fetch(
                `http://localhost:3036/api/products/${product._id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            setNotification({
                type: "success",
                message: "Compra concluída e produto removido com sucesso!",
            });
        } catch (error) {
            console.error("Error completing purchase:", error);

            setNotification({
                type: "error",
                message: "Erro ao concluir a compra. Tente novamente mais tarde.",
            });
        } finally {
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    };

    const handleNotificationClose = () => {
        setNotification(null);
    };

    return (
        <div className="flex flex-col min-h-screen bg-green-50">
            <main className="flex-grow mt-6 p-4">
                {isAdmin && (
                    <Link to="/Add-Anuncio">
                        <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 mb-6">
                            Criar Anúncio
                        </button>
                    </Link>
                )}
                <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <motion.div
                            key={product._id}
                            className="border border-green-200 rounded-lg shadow-lg p-4 bg-white bg-opacity-80 transition-transform transform hover:scale-105"
                            style={{
                                backgroundImage: "url('/textures/wood-bg.jpg')",
                                backgroundSize: "cover",
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={product.imagem || "https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2022/06/16/istock-1329141177-(1)-1iemoq2gsyqex.jpg"}
                                alt={product.name}
                                className="w-full h-40 object-cover mb-4 rounded-lg border-2 border-green-300 cursor-pointer"
                                onClick={() => handleDetailsClick(product)} 
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
                        </motion.div>
                    ))}
                </div>

                {selectedProduct && (
                    <ProductModal product={selectedProduct} onClose={handleCloseModal} />
                )}

                {notification && (
                    <div
                        className={`fixed bottom-4 right-4 p-4 rounded-lg text-white cursor-pointer ${notification.type === "success" ? "bg-green-500" : "bg-red-500"
                            }`}
                        onClick={handleNotificationClose}
                    >
                        {notification.message}
                    </div>
                )}
            </main>
        </div>
    );
};
