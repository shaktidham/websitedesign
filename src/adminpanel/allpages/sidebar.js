// // Sidebar.js
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom"; // Make sure to install react-router-dom
// import { ReactComponent as Openpop } from "./../../svg/popopen.svg";
// import { ReactComponent as Offpop } from "./../../svg/popoff.svg";

// const Sidebar = () => {
//   const location = useLocation(); // This hook gets the current route
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   // Define the menu items in an array, with support for multiple paths
//   const menuItems = [
//     { name: "Home", path: ["/home"] },
//     { name: "Agent", path: ["/Agent"] },
//     { name: "Village", path: ["/Village"] },
//     { name: "BusAdd", path: ["/Bus", "/BusAdd"] },
//     { name: "Booking", path: ["/Bookingpage", "/Bookingform"] },
//     { name: "Agent Account", path: ["/agent-account"] },
//   ];

//   // Function to check if the current path matches any of the given paths
//   const isActive = (paths) => {
//     return paths.some((path) => location.pathname === path);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
//   return (
//     <>
//       <button
//         className="text-white text-xl md:hidden absolute top-4 left-4 z-10"
//         onClick={toggleSidebar}
//       >
//         {isSidebarOpen ? (
//           <Offpop fill="black" className="h-8 w-8" />
//         ) : (
//           <Openpop fill="white" className="h-4 w-4" />
//         )}
//       </button>
//       <div className="w-64 bg-gray-800 h-screen fixed shadow-lg">
//         <div>
//           <h2 className="text-2xl font-bold text-center py-5 text-white mb-6 bg-[#367FA9] w-100">
//             Menu
//           </h2>
//           <ul className="space-y-4">
//             {menuItems.map((item) => (
//               <Link to={item.path[0]} key={item.name}>
//                 <li
//                   className={`mb-2 font-bold text-lg ${
//                     isActive(item.path)
//                       ? "text-black font-bold bg-white"
//                       : "text-white"
//                   } hover:text-black hover:bg-gray-200 transition-colors duration-200 p-2`}
//                 >
//                   {item.name}
//                 </li>
//               </Link>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Openpop } from "./../../svg/popopen.svg";
import { ReactComponent as Offpop } from "./../../svg/popoff.svg";

const Sidebar = () => {
  const location = useLocation(); // Hook to track current route
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar visibility

  // Define menu items with their paths
  const menuItems = [
    { name: "Home", path: ["/home"] },
    { name: "Agent", path: ["/Agent"] },
    { name: "Village", path: ["/Village"] },
    { name: "BusAdd", path: ["/Bus", "/BusAdd"] },
    { name: "Booking", path: ["/Bookingpage", "/Bookingform"] },
    { name: "Agent Account", path: ["/agent-account"] },
  ];

  // Function to check if the current path matches any of the provided paths
  const isActive = (paths) => {
    return paths.some((path) => location.pathname === path);
  };

  // Function to toggle the sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Button to toggle sidebar visibility on small screens */}
      <button
        className="text-white text-xl md:hidden absolute top-4 left-4 z-10"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <Offpop fill="black" className="h-8 w-8" />
        ) : (
          <Openpop fill="black" className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Sidebar Overlay - Hidden on desktop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar Content */}
      <div
        className={`fixed left-0 top-0 bg-gray-800 w-64 h-full shadow-xl transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0 pt-10" : "-translate-x-full"
        } md:translate-x-0 md:pt-0 md:static md:h-auto md:bg-transparent`}
      >
        <div className="w-64 bg-gray-800 h-full fixed shadow-lg">
          <div>
            <h2 className="text-2xl font-bold text-center text-white mb-6 bg-[#367FA9] w-full py-4">
              Menu
            </h2>
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <Link to={item.path[0]} key={item.name}>
                  <li
                    className={`mb-2 font-semibold text-lg ${
                      isActive(item.path) ? "text-black bg-white" : "text-white"
                    } hover:text-black hover:bg-gray-200 transition-colors duration-200 p-3 rounded-lg`}
                  >
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop Menu (visible on medium screens and larger) */}
      <div className="w-64 hidden bg-gray-800 h-screen fixed shadow-lg md:block">
        <div className="bg-gray-800">
          <h2 className="text-2xl font-bold text-center py-5 text-white mb-6 bg-[#367FA9] w-full">
            Menu
          </h2>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <Link to={item.path[0]} key={item.name}>
                <li
                  className={`mb-2 font-semibold text-lg ${
                    isActive(item.path) ? "text-black bg-white" : "text-white"
                  } hover:text-black hover:bg-gray-200 transition-colors duration-200 p-3 rounded-lg`}
                >
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
