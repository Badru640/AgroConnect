import React from 'react';
import { IoLockClosedOutline } from 'react-icons/io5';
import { HiOutlineMail } from 'react-icons/hi';
import { FaRegUser } from 'react-icons/fa';

export const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário enviado');
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: 'url(/details-back4.jpg)' }} // Caminho para a imagem
    >
      <div className="w-full max-w-md ">
        <form
          className="bg-white shadow-2xl rounded-lg p-8 space-y-6"
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-400 text-black border border-black rounded-md h-12 font-semibold hover:bg-gray-500 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
