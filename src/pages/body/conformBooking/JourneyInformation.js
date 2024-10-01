import React from 'react';

function JourneyInformation({ pickup, drop, date, from, to, price, seatNumber }) {
    return (
        <div className=" p-6 rounded-lg shadow-md  mx-4 my-1 max-w-md md:max-w-lg border border-2 border-black bg-white">
            <h2 className="text-3xl font-semibold mb-6 text-black text-center">Journey Information</h2>
            <h3 className="text-xl font-semibold mb-4 text-black">Onward Journey Information</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                {[
                    { label: "From City :", value: from },
                    { label: "To City : ", value: to },
                    { label: "Date : ", value: date },
                    { label: "Seat No : ", value: seatNumber },
                    { label: "Boarding Point : ", value: pickup },
                    { label: "Dropping Point : ", value: drop }
                ].map(({ label, value }, index) => (
                    <div key={label} className={`flex justify-between ${index < 6 ? 'border-b-2 border-black' : ''}`}>
                        <div>
                            <label className="label text-black font-xl font-bold">
                                <span className="label-text">{label}</span>
                            </label>
                        </div>
                        <div className='text-black flex'>{value}</div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-6 pt-4">
                <span className="font-semibold text-lg text-black">Fare Details</span>
                <span className="text-lg font-bold text-black">₹{price}</span>
            </div>
        </div>
    );
}

export default JourneyInformation;
