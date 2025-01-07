import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar";
// import Villageadd from "./Villageadd";
import Loader from "../../../userpages/Loader/Loader";
import { ReactComponent as Edit } from "./../../../svg/edit.svg";
import { ReactComponent as Delete } from "./../../../svg/delete.svg";
import { ReactComponent as Show } from "./../../../svg/eyes.svg";
import { Link, useNavigate } from "react-router-dom";
import Pointshow from "./pointshow";
import Password from "./password";
import Cookies from 'js-cookie';

function Busshow() {
   
    const [route, setRoute] = useState([]); // State to store the village data
    const [loading, setLoading] = useState(false); // State to track loading state
    const [error, setError] = useState(null); // State to store any errors
    const[popup,setPopup]=useState(false)
    const[popuppassword,setPopuppassword]=useState(true)
    const[password,setPassword]=useState('')
    const Navigate=useNavigate()
    const [itemToEdit, setItemToEdit] = useState(null); // State to store the village being edited
    const right ="1681"
    const token = Cookies.get('authToken');

    // Combined filter state
    const [filter, setFilter] = useState({
        search: "",  // Search term
        limit: 10,  // Limit for pagination
        page: 1,  // Current page
        order: "asc",  // Default order (ascending or descending)
    });

    const [totalEntries, setTotalEntries] = useState(0); // Store total number of entries for pagination

    // Fetch route on mount or whenever the filter changes
    useEffect(() => {
        setLoading(true);
        fetchroute();
    }, [filter]); // Dependency array includes the entire filter object
// Fetch route with filters
const fetchroute = async () => {
    setLoading(true);
  
    try {
        // Ensure filter.search has a valid value, otherwise default to an empty string or relevant default
        const dateParam = filter.search ? `?date=${filter.search}` : '';
      
        const response = await fetch(
            `https://shaktidham-backend.vercel.app/route/read${dateParam}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Add Authorization header with Bearer token
                    'Content-Type': 'application/json' // Ensure the request content is interpreted as JSON
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch route");
        }

        const data = await response.json();
        setRoute(data.data); // Assuming the data comes in data.data
        setTotalEntries(data.totalEntries); // Set the total number of entries for pagination
    } catch (error) {
        setError(error.message); // Handle the error
    } finally {
        setLoading(false);
    }
};

// Function to handle village deletion
const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this village?");
    if (!confirmDelete) return;
    
    setLoading(true);

    try {
        // Make the delete API call
        const response = await fetch(`https://shaktidham-backend.vercel.app/route/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`, // Add Authorization header with Bearer token
                'Content-Type': 'application/json' // Ensure the request content is interpreted as JSON
            }
        });

        if (!response.ok) {
            throw new Error("Failed to delete the route");
        }

        // Refresh the route list after deletion
        fetchroute();
    } catch (error) {
        setError(error.message); // Handle error if API call fails
    } finally {
        setLoading(false);
    }
};


    // Function to handle edit click
    const handleEditClick = (id) => {
     
        const item = route.find((item) => item._id === id);
       
        Navigate('/BusAdd', { state: { itemToEdit: item, password:password } });
       
    };
        // Function to handle edit click
        const handlePopup = (id) => {
            setPopup(true)
            const item = route.find((item) => item._id === id);

            setItemToEdit(item)
          
           
        };

    // Function to update filter values
    const updateFilter = (newFilter) => {
        setFilter((prevFilter) => ({ ...prevFilter, ...newFilter }));
    };

    const totalPages = Math.ceil(totalEntries / filter.limit); // Calculate total pages based on total entries and limit

    // Handle pagination buttons
    const handlePagination = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return; // Prevent going out of bounds
        updateFilter({ page: newPage });
    };

    return (
        <div>
            {loading ? (
                <Loader /> // Display loading text when data is being fetched
            ) : (
                <div className="flex flex-col md:flex-row h-screen bg-[#ECF0F5]">
                    {/* Sidebar */}
                 
                        <Sidebar  className="w-full md:w-1/6 bg-white shadow-lg" />
                

                    {/* Main Content */}
                    <div className="flex-1 p-4 ml-64">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            {/* Top Filters */}
                            <div className="flex items-center mb-4">
                                <input
                                    type="date"
                                    className="border px-4 py-2 rounded mr-4"
                                    placeholder="Search village"
                                    value={filter.search}
                                    onChange={(e) => updateFilter({ search: e.target.value })}
                                />


                            </div>
{right === password &&(<>
                            {/* Add Button */}
                            <div>
                            
                                <button
                                    className="bg-red-600 hover:bg-red-300 text-white px-4 py-2 rounded shadow-md transition-all duration-300"
                                    onClick={() => Navigate('/BusAdd', { state: {  password:password } })}  
                                >
                                    Add
                                </button>
                                
                            </div></>
                        )}
                        </div>

                        {/* Table */}
                        <div>
                            <table className="min-w-full mt-10 table-auto bg-white">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/12">Date</th>
                                        <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-3/5">Route</th>
                                        <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-3/5">BusName</th>
                                        <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-3/5">Price</th>
                                        <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-3/5">Point</th>
                                        <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/12">Edit</th>
                                        <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/12">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {route.map((village) => (
                                        <tr key={village._id}>
                                            <td className="px-4 py-2 border border-gray-400 text-center">
                                                {new Date(village.date).toLocaleDateString('en-GB')}
                                            </td>

                                            <td className="px-4 py-2 border border-gray-400">
                                                {village.first} to {village.last}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-400">
                                                {village.Busname}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-400">
                                                {village.price}
                                            </td>
                                            <td
                                                className="px-4 py-2 border border-gray-400 text-center cursor-pointer"
                                                onClick={() => handlePopup(village._id)}
                                            >
                                                <Show fill="red" className="h-6 w-6 mx-auto" />
                                            </td>
                                            <td
                                                className="px-4 py-2 border border-gray-400 text-center cursor-pointer"
                                                onClick={() => handleEditClick(village._id)}
                                            >
                                                <Edit fill="red" className="h-6 w-6 mx-auto" />
                                            </td>
                                            {right === password &&(
                                            <td
                                                className="px-4 py-2 border border-gray-400 text-center cursor-pointer"
                                                onClick={() => handleDelete(village._id)}
                                            >
                                                <Delete fill="red" className="h-6 w-6 mx-auto" />
                                            </td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-4">
                            {/* Previous Button */}
                            <button
                                onClick={() => handlePagination(filter.page - 1)}
                                disabled={filter.page === 1}
                                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                            >
                                Previous
                            </button>

                            {/* Page Number Buttons */}
                            <div className="flex items-center space-x-2 mx-4">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePagination(index + 1)}
                                        className={`px-4 py-2 rounded ${filter.page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => handlePagination(filter.page + 1)}
                                disabled={filter.page === totalPages}
                                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Pointshow popup={popup} setPopup={setPopup} itemToEdit={itemToEdit}/>
            <Password setPassword={setPassword} setPopuppassword={setPopuppassword} popuppassword={popuppassword}/>

        </div>
    );

}

export default Busshow;
