// import { Link } from "react-router-dom"
// import { PiBasketBold } from "react-icons/pi";;

// export const Header = () => {
//     return (
//         <div className="navbar shadow-  rounded-xl bg-base-100">
//   <div className="navbar-start">
//     <div className="dropdown">
//       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor">
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4 6h16M4 12h16M4 18h7" />
//         </svg>
//       </div>
//       <ul
//         tabIndex={0}
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//         <li><Link>
//         Dashbord
//         </Link></li>
//         <li><Link>
//         Perfil
//         </Link></li>
//         <li><Link>
//         Dashbord
//         </Link></li>

//       </ul>
//     </div>
//   </div>
//   <div className="navbar-center">
//     <a className="btn btn-ghost text-xl">daisyUI</a>
//   </div>
//   <div className="navbar-end">
//     <button className="btn btn-ghost btn-circle">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor">
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//       </svg>
//     </button>
//     <button className="btn btn-ghost btn-circle text-2xl">
//     < PiBasketBold />
// </button>

//   </div>
// </div>
//     )
// }

// Header.js
import { useState } from "react";
import { Link } from "react-router-dom";
import { PiBasketBold } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { useCart } from "../CartContext";

export const Header = () => {
    const { cart, removeFromCart } = useCart(); // Acesse o estado do carrinho e a função de remoção
    const [isDropdownOpen, setDropdownOpen] = useState(false); // Gerenciar a visibilidade do dropdown

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleCloseDropdown = () => {
        setDropdownOpen(false);
    };

    const handleCheckout = () => {
        // Redirecione para a página de checkout ou abra um modal de checkout
        console.log('Iniciar checkout');
    };

    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    return (
        <div className="navbar shadow-lg rounded-xl bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg sm:w-80 lg:w-96"
                        style={{ maxHeight: '400px', overflowY: 'auto' }}
                    >
                        <li><Link>Dashbord</Link></li>
                        <li><Link>Perfil</Link></li>
                        <li><Link>Dashbord</Link></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-end relative flex items-center">
                <button
                    className="btn btn-ghost btn-circle flex items-center relative"
                    onClick={toggleDropdown}
                >
                    <PiBasketBold className="text-2xl" />
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 inline-flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full">
                            {cart.length}
                        </span>
                    )}
                </button>
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
                                cart.map((product) => (
                                    <li key={product._id} className="flex items-center p-4 border-b border-gray-200">
                                        <img
                                            src={product.imagem || "/default-image.jpg"}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover mr-4 rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                                            <p className="text-xs text-gray-600">{product.price} mt</p>
                                        </div>
                                        <button
                                            className="text-red-500 hover:text-red-700 ml-4"
                                            onClick={() => handleRemove(product._id)}
                                            aria-label="Remover do carrinho"
                                        >
                                            <FaTimes />
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="p-4 text-center text-gray-600">Nenhum item no carrinho</li>
                            )}
                        </ul>
                        <div className="p-4 border-t border-gray-200 text-center">
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                onClick={handleCheckout}
                            >
                                Contacte-me
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
