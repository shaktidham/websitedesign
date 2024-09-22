import React from 'react';

function JourneyInformation() {
    return (
        <div className="bg-blue-400 p-6 rounded-lg shadow-md mx-4 my-8 max-w-md">
            <h2 className="text-3xl font-semibold mb-6 text-white text-center">Journey Information</h2>
            <h3 className="text-xl font-semibold mb-4 text-white">Onward Journey Information</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                {[
                    { label: "From City", placeholder: "Ahmedabad" },
                    { label: "To City", placeholder: "Bhavnagar" },
                    { label: "Date", placeholder: "22 Sep, Sunday" },
                    { label: "Seat No", placeholder: "L" },
                    { label: "Boarding Point", placeholder: "Bapa Sitaram Parking Nr Sangath Farm Nikol" },
                    { label: "Dropping Point", placeholder: "Rammantra Mandir" }
                ].map(({ label, placeholder }) => (
                    <div key={label}>
                        <label className="label text-white">
                            <span className="label-text">{label}</span>
                        </label>
                        <input
                            type="text"
                            placeholder={placeholder}
                            className="input input-bordered w-full bg-white text-gray-700 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            disabled
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-6 border-t pt-4 border-white">
                <span className="font-semibold text-lg text-white">Fare Details</span>
                <span className="text-lg font-bold text-white">₹600.00</span>
            </div>
        </div>
    );
}

export default JourneyInformation;
