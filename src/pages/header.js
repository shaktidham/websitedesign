import React from 'react';
import Logo from "./../img/logo1.png";

function Header() {
    return (
        <div>
            <div className='bg-[#070E35] flex justify-between items-center px-5 py-2'>
                <div className='text-white'>
                    Head Office Number: 9825450700
                </div>
                <div>
                    <img src={Logo} alt="Logo" className='h-16 w-56' />
                </div>
                <div className='text-white'>
                    Help Line Number: 9427555062
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-center px-4'>
                <div>
                    <ul className='flex space-x-12'>
                        <li className='px-2 text-xl font-bold text-black hover:text-white transition duration-300  hover:bg-[#FFC107] py-5 cursor-pointer'>
                            Home
                        </li>
                        <li className='px-2 text-xl font-bold text-black hover:text-white transition duration-300  hover:bg-[#FFC107] py-5 cursor-pointer'>
                            About Us
                        </li>
                        <li className='px-2 text-xl font-bold text-black hover:text-white transition duration-300  hover:bg-[#FFC107] py-5 cursor-pointer'>
                            My Booking
                        </li>
                        <li className='px-2 text-xl font-bold text-black hover:text-white transition duration-300  hover:bg-[#FFC107] py-5 cursor-pointer'>
                            Contact Us
                        </li>
                    </ul>
                </div>
                <div>
                    <button className='border border-black rounded-md text-black px-4 py-2 hover:bg-gray-200 transition duration-300'>
                        Agent Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
