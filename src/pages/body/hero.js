import React from 'react';
import AllBus from "./../../img/allbus.png";

function Hero() {
  return (
    <div className='flex  items-center justify-between text-center py-16 bg-[#1F1F1F]'>
      <div>
        <img src={AllBus} className='h-96 w-full mb-4' alt="Buses" />
      </div>
      <div className='px-5'>
        <pre className='text-3xl font-bold text-white mb-4'>
          Where would you like to go with
        </pre>
        <pre className='text-3xl text-left font-bold text-[#FFE5A0] mb-4'>
          Shaktidham Travels
        </pre>
        <pre className='text-3xl text-left font-bold text-white'>
          today?
        </pre>
        <button className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-6 items-left flex'>
          Read More
        </button>
      </div>
    </div>
  );
}

export default Hero;
