import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../Redux/userside';

function Form() {
    const [formData, setFormData] = useState({
        from: "",
        date: "",
        to: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const api = "https://shaktidham-backend.vercel.app/route/searchbyvillage";

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            dispatch(setLoading(true));

            try {
                const response = await fetch(
                    `${api}?Date=${formData.date}&from=${formData.from}&to=${formData.to}`
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
              
                // Pass both formData and result to the AvailableRoutes page
                navigate('/AvailableRoutes', { state: { formData, result } });
                
               

                // Clear the form data
                setFormData({
                    from: "",
                    date: "",
                    to: "",
                });
            } catch (error) {
                console.error("Fetch operation error:", error);
            }
            finally
            {
                dispatch(setLoading(false));
            }
        },
        [api, formData, navigate, dispatch]
    );

    return (
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
                    Search Bus
                </button>
            </form>
        </div>
    );
}

export default Form;
