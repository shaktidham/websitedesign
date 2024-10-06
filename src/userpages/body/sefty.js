import React from 'react';
import { ReactComponent as Firesefty } from './../../svg/firesefty.svg';
import { ReactComponent as Sofa } from './../../svg/sofo.svg';
import { ReactComponent as Location } from './../../svg/location.svg';
import { ReactComponent as Charging } from './../../svg/charging.svg';

const amenities = [
    { name: 'Charging Point', icon: <Charging fill="white" className="h-8 w-8" /> },
    { name: 'Live Bus Tracking', icon: <Location fill="white" className="h-8 w-8" /> },
    { name: 'Fire Safety', icon: <Firesefty fill="white" className="h-8 w-8" /> },
    { name: 'WiFi Service', icon: <Firesefty fill="white" className="h-8 w-8" /> },
    { name: 'Comfortable Sofa', icon: <Sofa fill="white" className="h-8 w-8" /> },
    { name: 'Refreshments', icon: <Firesefty fill="white" className="h-8 w-8" /> },
];

function Sefty() {
    return (
        <div className='bg-[#1F1F1F] p-5'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold text-white'>Making your bus journey better</h1>
                <h2 className='text-2xl font-bold text-white mt-2'>Check out all our bus amenities</h2>
            </div>
            <div className='flex flex-wrap justify-center my-10'>
                {amenities.map((amenity, index) => (
                    <div key={index} className='bg-blue-400 flex flex-col items-center justify-center border rounded-lg p-5 mx-2 my-2 w-40 md:w-1/4'>
                        <div className='bg-gray-800 p-5 rounded-md mb-2'>
                            {amenity.icon}
                        </div>
                        <div className='text-white font-bold text-lg text-center'>
                            {amenity.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sefty;
