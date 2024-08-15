// src/components/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize user state with role information
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Check if the user is an admin
    const isAdmin = user && user.role === 'admin';

    const login = (username, role) => {
        const userData = { username, role };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Store in localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove from localStorage
    };

    const isAuthenticated = () => !!user;

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
