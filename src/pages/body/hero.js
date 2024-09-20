import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllBus from "./../../img/allbus.png";
import { setBooked } from '../../Redux/userside';

function Hero() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: ''
  });

  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.inputs);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setBooked(true));
  };

  return (
    <div className='flex flex-col md:flex-row items-center justify-between text-center py-8 md:py-16 bg-[#1F1F1F]' id='home'>
      <div className="w-full md:w-2/3">
        <img 
          src={AllBus} 
          className='h-auto max-h-96 w-full object-contain mb-4' 
          alt="Buses" 
        />
      </div>
      <div className="w-full max-w-md mx-auto mt-6 md:mt-0 md:w-1/4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Bus Booking</h1>
          <input 
            type="text" 
            name="from" 
            placeholder="From" 
            value={formData.from}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input 
            type="text" 
            name="to" 
            placeholder="To" 
            value={formData.to}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input 
            type="date" 
            name="date" 
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Search Buses
          </button>
        </form>
      </div>
    </div>
  );
}

export default Hero;
