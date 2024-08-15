import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { route } from './routes';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <RouterProvider router={route} />
            </CartProvider>
        </AuthProvider>
    );

};

export default App;
