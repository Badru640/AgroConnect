import React, { useState } from 'react';
import { IoLockClosedOutline } from 'react-icons/io5';
import { HiOutlineMail } from 'react-icons/hi';
import { FaRegUser } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const adminUsername = 'Ana';
        const adminEmail = 'anapaula@gmail.com';
        const adminPassword = 'ana123';

        const isAdmin = username === adminUsername && password === adminPassword && email === adminEmail;

        const role = isAdmin ? 'admin' : 'user';

        // Armazenar as informações do usuário no localStorage, incluindo o email
        localStorage.setItem('user', JSON.stringify({ username, email, role }));

        login(username, role);

        if (isAdmin) {
            toast.success('Você entrou como Administrador!');
        } else {
            toast.success('Bem-vindo!');
        }

        if (role === 'admin') {
            setTimeout(() => navigate('/dashboard'), 2000); // Redireciona após 2 segundos
        } else {
            setTimeout(() => navigate('/'), 2000); // Redireciona após 2 segundos
        }
    };

    return (
        <div
            className="flex items-center justify-center mt-8 md:min-h-screen md:mt-0 bg-cover bg-center  p-4"
            style={{ backgroundImage: 'url(/details-back4.jpg)' }}
        >
            <div className="w-full max-w-md">
                <form
                    className="bg-black/5 md:bg-white shadow-2xl rounded-lg p-8 space-y-6"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-semibold text-center text-green-600 mb-12">
                        AgroConnect
                    </h2>
                    <h2 className="text-2xl font-semibold text-center text-black mb-6">
                        Login
                    </h2>
                    <div className="flex items-center space-x-3">
                        <FaRegUser size={24} className="text-gray-600" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Nome"
                            className="w-full h-12 border-b-2 border-gray-300 text-black outline-none placeholder-gray-500 px-4"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <HiOutlineMail size={24} className="text-gray-600" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full h-12 border-b-2 border-gray-300 text-black outline-none placeholder-gray-500 px-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <IoLockClosedOutline size={24} className="text-gray-600" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            className="w-full h-12 border-b-2 border-gray-300 text-black outline-none placeholder-gray-500 px-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-400 text-black border border-black rounded-md h-12 font-semibold hover:bg-gray-500 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};
