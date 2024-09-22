import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPassengerDetails } from '../../../Redux/userside';

function CustomerInformation() {
    const [passengerName, setPassengerName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [mobile, setMobile] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const dispatch = useDispatch();

    const OpenBox=()=>{
        dispatch(setPassengerDetails(false));
      }
    return (
        <div className="bg-blue-400 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
            <h2 className="text-3xl font-semibold mb-6 text-white text-center">Customer Information</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Passenger Details</h3>
                <input
                    type="text"
                    placeholder="Passenger Name"
                    className="input input-bordered w-full bg-gray-100 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                />
                <select
                    className="select select-bordered w-full bg-gray-100 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-400 mt-4"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="number"
                    placeholder="Age"
                    className="input input-bordered w-full bg-gray-100 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-400 mt-4"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Mobile No."
                    className="input input-bordered w-full bg-gray-100 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-400 mt-4"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
                  <div className="flex items-center mt-4">
                <input
                    type="checkbox"
                    id="terms"
                    className="checkbox checkbox-primary"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms" className="ml-2 text-gray-700">I Agree To All Terms & Conditions</label>
            </div>
            </div>
          
            <div className="flex flex-col mt-6">
                <button className="bg-green-500 hover:bg-green-600 font-bold text-white py-3 rounded-md mb-2 transition duration-300 ease-in-out">Book</button>
                <button className="bg-red-600 hover:bg-red-700 font-bold text-white py-3 rounded-md transition duration-300 ease-in-out"onClick={OpenBox}>Cancel</button>
            </div>
        </div>
    );
}

export default CustomerInformation;
