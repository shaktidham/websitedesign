import React, { useState, useEffect, useCallback } from 'react';
import Loader from '../../../userpages/Loader/Loader';
import Sidebar from '../sidebar';
import Pickuppoint from './Pickuppoint';
import Droppoint from './droppoint';
import { useLocation, useNavigate } from 'react-router-dom';

function Busadd() {
    const [loading, setLoading] = useState(true);
    const [villages, setVillages] = useState([]);
    const Navigate=useNavigate()
    const [data, setData] = useState({
        Busname: "",
        from: [],
        to: [],
        fromtime: "",
        totime: "",
        date: "",
        price: "",
        first:"",
        last:"",location:"",driver:"",cabinprice:""
    });
 
    const location = useLocation();  // Access location state (itemToEdit)
    const { itemToEdit } = location.state || {}; 


    // Fetch villages data
    const fetchVillages = async () => {
        try {
            const response = await fetch(`https://shaktidham-backend.vercel.app/village/read`);
            if (!response.ok) {
                throw new Error("Failed to fetch villages");
            }
            const data = await response.json();
           
            setVillages(data.data); // Assuming the data comes in data.data
        } catch (error) {
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVillages();
    }, []);

    useEffect(() => {
        fetchVillages();
        // If we are editing an existing bus, set the form state with itemToEdit
        if (itemToEdit) {
            const formattedDate = new Date(itemToEdit.date).toLocaleDateString('en-CA'); // 'en-CA' returns yyyy-mm-dd format, which we can modify further if needed

            setData({
                Busname: itemToEdit.Busname,
                first: itemToEdit.first,
                last: itemToEdit.last,
                fromtime: itemToEdit.fromtime,
                totime: itemToEdit.totime,
                date: formattedDate,
                price: itemToEdit.price,
                from: itemToEdit.from,  // Added from
                to: itemToEdit.to ,
                location:itemToEdit.location,driver:itemToEdit.driver,cabinprice:itemToEdit.cabinprice   
            });
        }
    }, [itemToEdit]);
console.log(data,"op");
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
     
        try {
            const url = itemToEdit
                ? `https://shaktidham-backend.vercel.app/route/update/${itemToEdit._id}` // Use PUT for update
                : "https://shaktidham-backend.vercel.app/route/create";  // Use POST for create
            const method = itemToEdit ? "PUT" : "POST"; // POST for create, PUT for update

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const datas = await response.json();
            if (response.ok) {
                Navigate("/Bus");
            } else {
                alert("Error adding village: " + datas.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error sending data to server.");
        } finally {
            setLoading(false);
        }
    }, [data, itemToEdit, Navigate]);


    return (
      <div className="min-h-screen flex flex-col">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-1 bg-[#ECF0F5]">
            {/* Sidebar */}
            <div className="w-full md:w-1/6 bg-gray-100 fixed">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 sm:p-8 bg-white rounded-lg shadow-lg ml-64">
              <div className="flex justify-between mb-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Add Bus
                </h2>

                <button
                  className="bg-red-600 hover:bg-red-300 text-white px-4 py-2 rounded shadow-md transition-all duration-300"
                  onClick={() => Navigate("/Bus")}
                >
                  Back
                </button>
              </div>
              <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Inputs Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Bus Name */}
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-gray-700 font-medium"
                      >
                        Date
                      </label>
                      <input
                        id="date"
                        type="date"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Date"
                        value={data.date}
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, date: e.target.value }))
                        }
                      />
                    </div>
                    {/* Bus Name */}
                    <div>
                      <label
                        htmlFor="Busname"
                        className="block text-gray-700 font-medium"
                      >
                        Bus Name
                      </label>
                      <input
                        id="Busname"
                        type="text"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Bus Name"
                        value={data.Busname}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            Busname: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {/* From */}

                    <div>
                      <label
                        htmlFor="from"
                        className="block text-gray-700 font-medium"
                      >
                        From
                      </label>
                      <input
                        id="from"
                        type="text"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Starting Locations"
                        value={data.first}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            first: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="fromtime"
                        className="block text-gray-700 font-medium"
                      >
                        From Time
                      </label>
                      <input
                        id="fromtime"
                        type="time"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Starting Locations time"
                        value={data.fromtime}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            fromtime: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {/* To */}
                    <div>
                      <label
                        htmlFor="to"
                        className="block text-gray-700 font-medium"
                      >
                        To
                      </label>
                      <input
                        id="to"
                        type="text"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Destination"
                        value={data.last}
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, last: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="totime"
                        className="block text-gray-700 font-medium"
                      >
                        To Time
                      </label>
                      <input
                        id="totime"
                        type="time"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Destination Time"
                        value={data.totime}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            totime: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="block text-gray-700 font-medium"
                      >
                        Price
                      </label>
                      <input
                        id="price"
                        type="number"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.price}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cabinprice"
                        className="block text-gray-700 font-medium"
                      >
                        Cabin Price
                      </label>
                      <input
                        id="cabinprice"
                        type="number"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.cabinprice}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            cabinprice: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="driver"
                        className="block text-gray-700 font-medium"
                      >
                        Driver
                      </label>
                      <input
                        id="driver"
                        type="text"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.driver}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            driver: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-gray-700 font-medium"
                      >
                        Location
                      </label>
                      <input
                        id="location"
                        type="text"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.location}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-center text-red-800 font-bold mb-5">
                        PICKUP POINT
                      </h1>
                      <Pickuppoint
                        villages={villages}
                        setData={setData}
                        itemToEdit={itemToEdit}
                      />
                    </div>
                    <div>
                      <h1 className="text-center text-red-800 font-bold mb-5">
                        DROP
                      </h1>
                      <Droppoint
                        villages={villages}
                        setData={setData}
                        itemToEdit={itemToEdit}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Save Bus
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default Busadd;
