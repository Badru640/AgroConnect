import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existingProduct = prev.find(item => item._id === product._id);
            if (existingProduct) {
                // Se o produto já existe, atualize a quantidade
                return prev.map(item => 
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Se o produto não existe, adicione ao carrinho com quantidade 1
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item._id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};

