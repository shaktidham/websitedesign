import React from 'react';
import { ReactComponent as Firesefty } from './../../svg/firesefty.svg';
import { ReactComponent as Sofa } from './../../svg/sofo.svg';
import { ReactComponent as Location } from './../../svg/location.svg';
import { ReactComponent as Charging } from './../../svg//charging.svg';

const amenities = [
    { name: 'Charging Point', icon: <Charging fill="white" className="h-8 w-8" /> },
    { name: 'Live Bus Tracking', icon: <Location fill="white" className="h-8 w-8" /> },
    { name: 'Fire Safety', icon: <Firesefty fill="white" className="h-8 w-8" /> },
    { name: 'WiFi Service', icon: <Firesefty fill="white" className="h-8 w-8" /> },
    { name: 'Comfortable Seating', icon: <Sofa fill="white" className="h-8 w-8" /> },
    { name: 'Refreshments', icon: <Firesefty fill="white" className="h-8 w-8" /> },
];

function Sefty() {
    return (
        <div className='bg-[#1F1F1F]'>
            <div className='pt-10 text-center'>
                <h1 className='text-3xl font-bold text-white'>Making your bus journey better</h1>
                <h1 className='text-2xl font-bold text-white'>Check out all our bus amenities</h1>
            </div>
            <div className='flex flex-wrap justify-around my-10 w-full'>
                {/* First Row */}
                {amenities.slice(0, 3).map((amenity, index) => (
                    <div key={index} className='bg-blue-400 flex items-center justify-between border rounded-lg p-5 space-x-3 w-1/4 mb-5'>
                        <div className='bg-gray-800 p-5 rounded-md'>
                            {amenity.icon}
                        </div>
                        <div className='text-white font-bold text-lg'>{amenity.name}</div>
                    </div>
                ))}
            </div>
            <div className='flex flex-wrap justify-around w-full'>
                {/* Second Row */}
                {amenities.slice(3, 6).map((amenity, index) => (
                    <div key={index} className='bg-blue-400 flex items-center justify-between border rounded-lg p-5 space-x-3 w-1/4 mb-5'>
                        <div className='bg-gray-800 p-5 rounded-md'>
                            {amenity.icon}
                        </div>
                        <div className='text-white font-bold text-lg'>{amenity.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sefty;
