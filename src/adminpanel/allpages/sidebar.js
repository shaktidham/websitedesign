// Sidebar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Make sure to install react-router-dom

const Sidebar = () => {
  const location = useLocation(); // This hook gets the current route
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Define the menu items in an array, with support for multiple paths
  const menuItems = [
    { name: "Home", path: ["/home"] },
    { name: "Agent", path: ["/Agent"] },
    { name: "Village", path: ["/Village"] },
    { name: "BusAdd", path: ["/Bus", "/BusAdd"] },
    { name: "Booking", path: ["/Bookingpage", "/Bookingform"] },
    { name: "Agent Account", path: ["/agent-account"] },
  ];

  // Function to check if the current path matches any of the given paths
  const isActive = (paths) => {
    return paths.some((path) => location.pathname === path);
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-gray-800 h-screen fixed shadow-lg transition-all duration-300 ease-in-out`}
    >
      <button
        onClick={toggleSidebar}
        className="text-white mb-6 md:hidden focus:outline-none"
      >
        {isSidebarOpen ? "Close" : "Open"}
      </button>
      {isSidebarOpen && (
        <div>
          <h2 className="text-2xl font-bold text-center py-5 text-white mb-6 bg-[#367FA9] w-100">
            Menu
          </h2>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <Link to={item.path[0]}>
                <li
                  key={item.name}
                  className={` mb-2 font-bold text-lg ${
                    isActive(item.path)
                      ? "text-black font-bold bg-white"
                      : "text-white"
                  } hover:text-black hover:bg-gray-200 transition-colors duration-200 p-2`}
                >
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
