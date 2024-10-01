import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPassengerDetails, setBookDetails } from '../../../Redux/userside';
import { useNavigate } from 'react-router-dom';

function CustomerInformation({ pickup, drop, date, from, to, price, seatNumber }) {
    const dispatch = useDispatch();
    const navigate=useNavigate( )
    console.log(date,"as");
    const initialData = {
        name: "",
        from: from,
        to: to,
        pickup: pickup,
        drop: drop,
        mobile: "",
        seatNumbers: seatNumber,
        date: date,
        gender: "",
        age: "",
        
    };
   
const route=localStorage.getItem("routeId")
    const [bookeddata, setBookedData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBookedData(prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
     
    
        try {
          const endpoint =  `https://shaktidham-backend.vercel.app/seats/create/${route}`;
          const method =  "POST"
          const response = await fetch(endpoint, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookeddata),
          });
    
          if (response.ok) {
            await response.json();
            OpenBox()
            navigate("/");
          } else {
            console.error("Submission failed");
          }
        } catch (error) {
          console.error("Fetch operation error:", error);
        }
        
      };
    const OpenBox = () => {
        dispatch(setPassengerDetails(false));
    };

    return (
        <div className=" p-6 rounded-lg shadow-lg max-w-md mx-auto border border-2 border-black bg-white mt-8">
            <h2 className="text-3xl font-semibold mb-6 text-black text-center">Customer Information</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Passenger Details</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Passenger Name"
                    className="input input-bordered w-full bg-gray-200 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    value={bookeddata.name}
                    onChange={handleChange}
                />
                <select
                    name="gender"
                    className="select select-bordered w-full bg-gray-100 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-400 mt-4"
                    value={bookeddata.gender}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    className="input input-bordered w-full bg-gray-100 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-400 mt-4"
                    value={bookeddata.age}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile No."
                    className="input input-bordered w-full bg-gray-100 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-400 mt-4"
                    value={bookeddata.mobile}
                    onChange={handleChange}
                />
                {/* <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        id="terms"
                        name="termsAccepted"
                        className="checkbox checkbox-primary"
                        checked={bookeddata.termsAccepted}
                        onChange={handleChange}
                    />
                    <label htmlFor="terms" className="ml-2 text-gray-700">I Agree To All Terms & Conditions</label>
                </div> */}
            </div>

            <div className="flex flex-col mt-6">
                <button 
                    className="bg-blue-500 hover:bg-blue-800 font-bold text-white py-3 rounded-md mb-2 transition duration-300 ease-in-out"
                    onClick={handleSubmit} // Book action
                >
                    Book
                </button>
                <button 
                    className="bg-red-500 hover:bg-red-800 font-bold text-white py-3 rounded-md transition duration-300 ease-in-out" 
                    onClick={OpenBox}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default CustomerInformation;
