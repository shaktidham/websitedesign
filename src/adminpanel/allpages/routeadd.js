import React, { useCallback, useState } from 'react';
import { setRouteadd } from '../../Redux/userside';
import { useDispatch, useSelector } from 'react-redux';
import {village} from "./../../constvalue/constvalue";

function Routeadd() {
    const initialData = {
        route: "",
        date: "",
        from: [],
        to: [],
        price: ""
    };
    
    const [data, setData] = useState(initialData);
    const dispatch = useDispatch();
    const inputs = useSelector((state) => state.inputs);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        if (Array.isArray(data[name])) {
            // Handle multi-select checkbox changes
            setData((prevData) => {
                const newValues = prevData[name].includes(value)
                    ? prevData[name].filter(item => item !== value)
                    : [...prevData[name], value];
                return { ...prevData, [name]: newValues };
            });
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://shaktidham-backend.vercel.app/route/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                dispatch(setRouteadd(false));
            } else {
                const errorResult = await response.json();
                console.error("Submission failed:", errorResult.message || "Error");
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    };

  

    return (
        inputs.Tablemanuplation?.routeadd && (
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="busroute" className="text-left text-gray-700 font-bold block">
                        Bus Route
                    </label>
                    <input
                        type="text"
                        name="route"
                        onChange={handleChange}
                        value={data.route}
                        id="busroute"
                        placeholder="Enter your bus route"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        required
                    />

                    <label htmlFor="date" className="text-left text-gray-700 font-bold block mt-4 mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        onChange={handleChange}
                        value={data.date}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
                        required
                    />

                    <label className="text-left text-gray-700 font-bold block mt-4 mb-2">
                        From
                    </label>
                    {village.map((location) => (
                        <div key={location}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="from"
                                    value={location}
                                    onChange={handleChange}
                                    checked={data.from.includes(location)}
                                />
                                {location}
                            </label>
                        </div>
                    ))}

                    <label className="text-left text-gray-700 font-bold block mt-4 mb-2">
                        To
                    </label>
                    {village.map((location) => (
                        <div key={location}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="to"
                                    value={location}
                                    onChange={handleChange}
                                    checked={data.to.includes(location)}
                                />
                                {location}
                            </label>
                        </div>
                    ))}

                    <label htmlFor="price" className="text-left text-gray-700 font-bold block mt-4 mb-2">
                        Price
                    </label>
                    <input
                        type="text"
                        name="price"
                        id="price"
                        onChange={handleChange}
                        value={data.price}
                        placeholder="Enter your price"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
                        required
                    />

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-300 w-full"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        )
    );
}

export default Routeadd;
