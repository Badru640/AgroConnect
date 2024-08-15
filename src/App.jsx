import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { route } from './routes';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <RouterProvider router={route} />
                <ToastContainer />
            </CartProvider>
        </AuthProvider>
    );

};

export default App;
