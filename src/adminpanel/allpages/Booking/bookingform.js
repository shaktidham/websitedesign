import React, { useEffect, useState } from 'react';
import Loader from '../../../userpages/Loader/Loader';
import Sidebar from '../sidebar';
import { useLocation, useNavigate } from 'react-router-dom';

function Bookingform() {
  const [loading, setLoading] = useState(false);
  const [routeData, setRoutedata] = useState([]);
  const navigate = useNavigate();
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
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [filteredFromOptions, setFilteredFromOptions] = useState([]);
  const [filteredToOptions, setFilteredToOptions] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.label) {
      setData(prevData => ({
        ...prevData,
        seatNumber: location.state.label,
        date: location.state.date,
      }));
      setRoutedata(location.state.personalroutedata);
    }
  }, [location.state]);

  useEffect(() => {
    if (routeData?.from) {
      setFilteredFromOptions(
        routeData.from.filter((fromVillage) =>
          fromVillage.village.toLowerCase().includes(fromSearch.toLowerCase())
        )
      );
    }
  }, [fromSearch, routeData]);

  useEffect(() => {
    if (routeData?.to) {
      setFilteredToOptions(
        routeData.to.filter((toVillage) =>
          toVillage.village.toLowerCase().includes(toSearch.toLowerCase())
        )
      );
    }
  }, [toSearch, routeData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = routeData._id;

    const formattedData = { ...data, date: data.date };
const date=data.date
    try {
      const response = await fetch(`https://shaktidham-backend.vercel.app/seats/create/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        navigate("/Bookingpage", { state: { routeData,date } });
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Fetch operation error:', error);
    } finally {
      setLoading(false);
    }
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
                      required
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
                      readOnly
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
                      value={data.date}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>

                  {/* From Village Search (Auto-suggest) */}
                  <div>
                    <label htmlFor="from" className="block text-gray-700 font-medium">
                      From
                    </label>
                    <input
                      type="text"
                      id="from"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={fromSearch}
                      onChange={(e) => setFromSearch(e.target.value)}
                      placeholder="Search for Village"
                    />
                    {fromSearch && filteredFromOptions.length > 0 && (
                      <ul className="absolute w-1/6  bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto z-10">
                        {filteredFromOptions.map((fromVillage) => (
                          <li
                            key={fromVillage.village}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-800"
                            onClick={() => {
                              setData((prevData) => ({
                                ...prevData,
                                from: fromVillage.village,
                              }));
                              setFromSearch(fromVillage.village);
                            }}
                          >
                            {fromVillage.village}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* To Village Search (Auto-suggest) */}
                  <div>
                    <label htmlFor="to" className="block text-gray-700 font-medium">
                      To
                    </label>
                    <input
                      type="text"
                      id="to"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={toSearch}
                      onChange={(e) => setToSearch(e.target.value)}
                      placeholder="Search for Village"
                    />
                    {toSearch && filteredToOptions.length > 0 && (
                      <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto z-10">
                        {filteredToOptions.map((toVillage) => (
                          <li
                            key={toVillage.village}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                              setData((prevData) => ({
                                ...prevData,
                                to: toVillage.village,
                              }));
                              setToSearch(toVillage.village);
                            }}
                          >
                            {toVillage.village}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Pickup and Drop Locations */}
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
                      {routeData.from?.map((fromVillage) =>
                        fromVillage.village === data.from &&
                        fromVillage.point?.map((point) => (
                          <option key={point} value={point}>
                            {point}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="drop" className="block text-gray-700 font-medium">
                      Drop Location
                    </label>
                    <select
                      id="drop"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.drop}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Drop Location</option>
                      {routeData.to?.map((toVillage) =>
                        toVillage.village === data.to &&
                        toVillage.point?.map((point) => (
                          <option key={point} value={point}>
                            {point}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  {/* Additional Fields */}
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
                      value={data.price}
                      onChange={handleInputChange}
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
                    onClick={handleSubmit}
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
