import React, { useState } from 'react';
import Logo from "./../img/logo1.png";
import { ReactComponent as Openpop } from './../svg/popopen.svg';
import { ReactComponent as Offpop } from './../svg/popoff.svg';

function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <div className='bg-[#070E35] flex flex-col md:flex-row justify-between items-center px-5 py-2'>
                <button
                    className='text-white text-xl md:hidden absolute top-4 left-4 z-10'
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? <Offpop fill='black' className='h-8 w-8' /> : <Openpop fill='white' className='h-4 w-4' />}
                </button>
                <div className='text-white xsm:text-[10px] md:text-xl font-bold mb-2 md:mb-0 '>
                    Head Office Number: 9825450700
                </div>
                <div>
                    <img src={Logo} alt="Logo" className='h-16 w-56' />
                </div>
                <div className='flex flex-col items-center md:items-start md:mb-0 mb-2'>
                    <div className='text-white xsm:text-[10px] md:text-xl font-bold'>
                        Help Line Number: 9427555062
                    </div>
                    <button className='border border-black bg-white rounded-md text-lg font-bold text-black px-4 py-2 hover:bg-gray-200 transition duration-300 mt-2 md:hidden'>
                        Agent Login
                    </button>
                </div>
            </div>
            <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}></div>
            <div className={`fixed left-0 top-0 bg-white w-64 h-full shadow-lg transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0 pt-10' : '-translate-x-full'}`}>
                <div className='flex flex-col p-4'>
                    <ul className='flex flex-col space-y-4'>
                        <li onClick={toggleSidebar} className='text-black text-xl font-bold hover:text-white transition duration-300 hover:bg-[#FFC107] py-2 cursor-pointer'>
                            <a href="#home">Home</a>
                        </li>
                        <li onClick={toggleSidebar} className='text-black text-xl font-bold hover:text-white transition duration-300 hover:bg-[#FFC107] py-2 cursor-pointer'>
                            <a href="#OurRoute">Our Route</a>
                        </li>
                        <li onClick={toggleSidebar} className='text-black text-xl font-bold hover:text-white transition duration-300 hover:bg-[#FFC107] py-2 cursor-pointer'>
                            <a href="">  My Booking</a>
                        </li>
                        <li onClick={toggleSidebar} className='text-black text-xl font-bold hover:text-white transition duration-300 hover:bg-[#FFC107] py-2 cursor-pointer'>
                            <a href="">Gallry</a>
                        </li>
                        <li onClick={toggleSidebar} className='text-black text-xl font-bold hover:text-white transition duration-300 hover:bg-[#FFC107] py-2 cursor-pointer'>
                            <a href="#contact">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Desktop Menu */}
            <div className='hidden md:flex justify-between items-center p-4'>
                <ul className='flex space-x-12'>
                    <li className='text-black text-xl font-bold hover:text-white transition duration-300 hover:bg-[#FFC107] hover:rounded-md hover:px-2 py-2 cursor-pointer'>
                    <a href="#home">Home</a>
                    </li>
                    <li className='text-black text-xl font-bold hover:text-white transition duration-300 hover:bg-[#FFC107] hover:rounded-md hover:px-2 py-2 cursor-pointer'>
                    <a href="OurRoute">Our Route</a>
                    </li>
                    <li className='text-black text-xl font-bold hover:text-white transition duration-300 hover:bg-[#FFC107] hover:rounded-md hover:px-2 py-2 cursor-pointer'>
                    <a href="">  My Booking</a>
                    </li>
                    <li className='text-black text-xl font-bold hover:text-white transition duration-300 hover:bg-[#FFC107] hover:rounded-md hover:px-2 py-2 cursor-pointer'>
                    <a href="">Gallry</a>
                    </li>
                    <li className='text-black text-xl font-bold hover:text-white transition duration-300 hover:bg-[#FFC107] hover:rounded-md hover:px-2 py-2 cursor-pointer'>
                    <a href="contact">Contact Us</a>
                    </li>
                </ul>
                <div className='flex items-center'>
                    <button className='border border-black bg-white rounded-md text-lg font-bold text-black px-4 py-2 hover:bg-gray-200 transition duration-300'>
                        Agent Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
