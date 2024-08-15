import { useState } from "react";
import { Link } from "react-router-dom";
import { PiBasketBold } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { useCart } from "../CartContext";
import { useAuth } from "../../AuthContext";

export const Header = () => {
    const { cart, removeFromCart } = useCart();
    const { user, isAdmin, logout } = useAuth();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleCloseDropdown = () => {
        setDropdownOpen(false);
    };

    const handleRemove = (productId, index) => {
        removeFromCart(productId, index);
    };

    const handleLogout = () => {
        logout();
        handleCloseDropdown();
    };

    const uniqueProductsCount = cart.length;

    const createWhatsAppMessage = () => {
        let message = "Olá! Gostaria de encomendar os seguintes produtos:\n\n";
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - ${item.quantity} unidade(s) a ${item.price
                } mt cada\n`;
        });
        message += `\nTotal de produtos: ${cart.length}`;
        return encodeURIComponent(message);
    };

    const whatsappLink = `https://wa.me/847640433?text=${createWhatsAppMessage()}`;

    return (
        <div className="navbar shadow-lg rounded-sm bg-gradient-to-r from-green-500 via-green-400 to-green-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-green-300 rounded-box z-[1] mt-3 w-52 md:w-64 p-2 shadow-xl"
                    >
                        {isAdmin && (
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                        )}
                           <li>
                                <Link to="/">Produtos</Link>
                            </li>
                        <li>
                            <Link to="/profile">Perfil</Link>
                        </li>
                        {user ? (
                            <li>
                                <button onClick={handleLogout}>Sair ({user.username})</button>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login">Iniciar Sessão</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link
                    to={"/"}
                    className="text-2xl md:text-4xl font-bold text-white animate-glow"
                >
                    AgroConnect
                </Link>
            </div>
            <div className="navbar-end relative flex items-center">
                {!isAdmin && (
                    <button
                        className="btn btn-ghost btn-circle flex items-center relative"
                        onClick={toggleDropdown}
                    >
                        <PiBasketBold className="text-2xl" />
                        {uniqueProductsCount > 0 && (
                            <span className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 inline-flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full">
                                {uniqueProductsCount}
                            </span>
                        )}
                    </button>
                )}
                {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-80 sm:w-96 lg:w-112">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800">Cesto</h3>
                            <button
                                className="text-gray-600 hover:text-gray-900 text-xl"
                                onClick={handleCloseDropdown}
                                aria-label="Fechar"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <ul className="py-2">
                            {cart.length > 0 ? (
                                cart.map((product, index) => (
                                    <li
                                        key={`${product._id}-${index}`}
                                        className="flex items-center p-4 border-b border-gray-200"
                                    >
                                        <img
                                            src={product.imagem || "/default-image.jpg"}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover mr-4 rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-800">
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {product.price} mt (x{product.quantity})
                                            </p>
                                        </div>
                                        <button
                                            className="text-red-500 hover:text-red-700 ml-4"
                                            onClick={() => handleRemove(product._id, index)}
                                            aria-label="Remover do carrinho"
                                        >
                                            <FaTimes />
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="p-4 text-center text-gray-600">
                                    Nenhum item no carrinho
                                </li>
                            )}
                        </ul>
                        <div className="p-4 border-t border-gray-200 text-center">
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
                )}
            </div>
        </div>
    );
};
