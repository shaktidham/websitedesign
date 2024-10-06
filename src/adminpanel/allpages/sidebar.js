// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to install react-router-dom if you're using routing

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-100 h-screen shadow-lg p-5">
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            <ul className="space-y-4">
                <li>
                    <Link to="/adminHome" className="text-blue-600 hover:underline">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/routeshow" className="text-blue-600 hover:underline">
                        Route Add
                    </Link>
                </li>
                <li>
                    <Link to="/agent-account" className="text-blue-600 hover:underline">
                        Agent Account
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
