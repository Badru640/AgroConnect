import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../global/header';
import { useAuth } from '../../AuthContext';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, isAdmin, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ username: user?.username || '' });

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        const updatedUser = { ...user, username: formData.username };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setFormData({ username: updatedUser.username });
        setIsEditing(false);
    };

    return (
        <main className="profile-page">
            <Header />
            <section className="relative block h-[500px]">
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: "url('/diet-tomato-food-fresh-wallpaper-preview.jpg')" }}
                >
                    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]" style={{ transform: 'translateZ(0px)' }}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>
            <section className="relative py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full max-w-md mx-auto mb-6 shadow-xl rounded-lg -mt-32">
                        <div className="px-6 relative">
                            <div className="absolute top-[-75px] left-1/2 transform -translate-x-1/2">
                                <img
                                    alt="Profile"
                                    src="/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                                    className="shadow-xl rounded-full h-auto align-middle border-none max-w-[150px]"
                                />
                            </div>
                            <div className="text-center pt-24">
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i> {isAdmin ? 'Administrator' : 'User'}
                                </div>
                                {isEditing ? (
                                    <div>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className="mb-2 px-3 py-2 border rounded"
                                        />
                                        <button
                                            onClick={handleSave}
                                            className="bg-green-500 active:bg-green-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                                            {user?.username || 'Usuário'}
                                        </h3>
                                        <button
                                            onClick={handleEditToggle}
                                            className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                                <div className="py-6 px-3 mt-6 sm:mt-0">
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
