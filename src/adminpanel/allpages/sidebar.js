// Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Make sure to install react-router-dom

const Sidebar = () => {
    const location = useLocation(); // This hook gets the current route
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open state

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div
            className={`${
                isSidebarOpen ? 'w-64' : 'w-20'
            } bg-gray-800 h-screen shadow-lg transition-all duration-300 ease-in-out`}
        >
            <button
                onClick={toggleSidebar}
                className="text-white mb-6 md:hidden focus:outline-none"
            >
                {isSidebarOpen ? 'Close' : 'Open'}
            </button>
            {isSidebarOpen && (
                <div>
                    <h2 className="text-2xl font-bold text-center py-5 text-white mb-6 bg-[#367FA9] w-100">Menu</h2>
                    <ul className="space-y-4 p-5">
                        <li >
                            <Link
                                to="/home"
                                className={ `${
                                    location.pathname === '/home'
                                        ? 'text-blue-500 font-bold text-black'
                                        : 'text-white'
                                } hover:text-blue-400 transition-colors duration-200`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Village"
                                className={`${
                                    location.pathname === '/Village'
                                        ? 'text-blue-500 font-bold'
                                        : 'text-white'
                                } hover:text-blue-400 transition-colors duration-200`}
                            >
                                Village
                            </Link>
                        </li>
                        <li>
                            <Link
                                // to="/route-add"
                                className={`${
                                    location.pathname === '/route-add'
                                        ? 'text-blue-500 font-bold'
                                        : 'text-white'
                                } hover:text-blue-400 transition-colors duration-200`}
                            >
                                Route Add
                            </Link>
                        </li>
                        <li>
                            <Link
                                // to="/agent-account"
                                className={`${
                                    location.pathname === '/agent-account'
                                        ? 'text-blue-500 font-bold'
                                        : 'text-white'
                                } hover:text-blue-400 transition-colors duration-200`}
                            >
                                Agent Account
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
