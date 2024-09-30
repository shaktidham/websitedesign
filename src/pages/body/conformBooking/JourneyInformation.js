import React from 'react';

function JourneyInformation({ pickup, drop, date, from, to, price, seatNumber }) {
    return (
        <div className="bg-blue-400 p-6 rounded-lg shadow-md mx-4 my-8 max-w-md md:max-w-lg">
            <h2 className="text-3xl font-semibold mb-6 text-white text-center">Journey Information</h2>
            <h3 className="text-xl font-semibold mb-4 text-white">Onward Journey Information</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                {[
                    { label: "From City", value: from },
                    { label: "To City", value: to },
                    { label: "Date", value: date },
                    { label: "Seat No", value: seatNumber },
                    { label: "Boarding Point", value: pickup },
                    { label: "Dropping Point", value: drop }
                ].map(({ label, value }) => (
                    <div key={label}>
                        <label className="label text-white">
                            <span className="label-text">{label}</span>
                        </label>
                        <input
                            type="text"
                            placeholder={value}
                            className="input input-bordered w-full bg-white text-gray-700 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            disabled
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-6 border-t pt-4 border-white">
                <span className="font-semibold text-lg text-white">Fare Details</span>
                <span className="text-lg font-bold text-white">₹{price}</span>
            </div>
        </div>
    );
}

export default JourneyInformation;
