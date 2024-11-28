import React, { useEffect, useState } from 'react';
import Loader from '../../../userpages/Loader/Loader';
import Sidebar from '../sidebar';

function Bookingform() {
  const [loading, setLoading] = useState(true); // State to track loading state
  const [routeData, setRoutedata] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: '',
    mobile: '',
    seatNumber: '',
    date: '',
    from: '',
    to: '',
    pickup: '',
    drop: '',
    gender: '',
    price: '',
    age: '',
  });
  console.log(data, "data");
  const fetchroute = async () => {

    
    try {
        const response = await fetch(
            `https://shaktidham-backend.vercel.app/route/read`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch route");
        }
        const data = await response.json();
        // console.log(data,"aa");
        setRoutedata(data.data); // Assuming the data comes in data.data
      
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
  fetchroute();
}, []);


  // Function to handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data); // Logs the form data on submit
    // Add your form submission logic here (API calls, etc.)
  };
  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('en-CA'); // Formats the date in the "YYYY-MM-DD" format
  };
  
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row h-screen bg-[#ECF0F5]">
          {/* Sidebar */}
          <div className="w-full md:w-1/6 bg-gray-100">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4">
            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Inputs Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Form Fields */}
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-gray-700 font-medium">
                      Mobile
                    </label>
                    <input
                      id="mobile"
                      type="number"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.mobile}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="seatNumber" className="block text-gray-700 font-medium">
                      Seat Number
                    </label>
                    <input
                      id="seatNumber"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.seatNumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-gray-700 font-medium">
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formattedDate(routeData.date)}
                      readOnly
                    />
                  </div>

                  <div>
                    <label htmlFor="from" className="block text-gray-700 font-medium">
                      From
                    </label>
                    <select
                      id="from"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.from}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Village</option>
                      {routeData?.from?.map((village) => (
                        <option key={village.village} value={village.village}>
                          {village.village}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* To Field */}
                  <div>
                    <label htmlFor="to" className="block text-gray-700 font-medium">
                      To
                    </label>
                    <select
                      id="to"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.to}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Village</option>
                      {routeData?.to?.map((village) => (
                        <option key={village.village} value={village.village}>
                          {village.village}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pickup Location */}
                  <div>
                    <label htmlFor="pickup" className="block text-gray-700 font-medium">
                      Pickup Location
                    </label>
                    <select
    id="pickup"
    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={data.pickup}
    onChange={handleInputChange}
  >
    <option value="">Select Pickup Location</option>
    {/* Ensure you're filtering villages based on the 'from' value */}
    {routeData?.from?.map((village) => (
      village.village === data.from && // Check if the village matches the 'from' value
      village.point.map((point) => ( // Map through the points for that village
        <option key={point} value={point}>
          {point}
        </option>
      ))
    ))}
  </select>
                  </div>

                  <div>
                    <label htmlFor="drop" className="block text-gray-700 font-medium">
                      Drop Location
                    </label>
                    <select
    id="pickup"
    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={data.drop}
    onChange={handleInputChange}
  >
    <option value="">Select Pickup Location</option>
    {/* Ensure you're filtering villages based on the 'from' value */}
    {routeData?.to?.map((village) => (
      village.village === data.to && // Check if the village matches the 'from' value
      village.point.map((point) => ( // Map through the points for that village
        <option key={point} value={point}>
          {point}
        </option>
      ))
    ))}
  </select>
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-gray-700 font-medium">
                      Gender
                    </label>
                    <input
                      id="gender"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.gender}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-gray-700 font-medium">
                      Price
                    </label>
                    <input
                      id="price"
                      type="number"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={routeData.price}
                    readOnly
                    />
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-gray-700 font-medium">
                      Age
                    </label>
                    <input
                      id="age"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.age}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Booking
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

export default Bookingform;
