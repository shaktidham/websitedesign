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
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
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
    const date = data.date;
    try {
      const response = await fetch(`https://shaktidham-backend.vercel.app/seats/create/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        navigate("/Bookingpage", { state: { routeData, date } });
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Fetch operation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFromDropdown = () => {
    setIsFromDropdownOpen(!isFromDropdownOpen);
  };

  const toggleToDropdown = () => {
    setIsToDropdownOpen(!isToDropdownOpen);
  };

  // Handle selection for "From" dropdown
  const handleFromSelection = (village) => {
    setFromSearch(village);  // Update search box with selected village
    setData({ ...data, from: village });  // Update "from" field
    setIsFromDropdownOpen(false);  // Close dropdown
  };

  // Handle selection for "To" dropdown
  const handleToSelection = (village) => {
    setToSearch(village);  // Update search box with selected village
    setData({ ...data, to: village });  // Update "to" field
    setIsToDropdownOpen(false);  // Close dropdown
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

                  {/* From Village Search */}
                  <div>
                    <label htmlFor="from" className="block text-gray-700 font-medium">
                      From
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for Village"
                        value={fromSearch}
                        onChange={(e) => setFromSearch(e.target.value)}
                        onClick={toggleFromDropdown}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {isFromDropdownOpen && (
                        <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto z-10">
                          {filteredFromOptions.map((fromVillage) => (
                            <li
                              key={fromVillage.village}
                              onClick={() => handleFromSelection(fromVillage.village)}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            >
                              {fromVillage.village}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* To Village Search */}
                  <div>
                    <label htmlFor="to" className="block text-gray-700 font-medium">
                      To
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for Village"
                        value={toSearch}
                        onChange={(e) => setToSearch(e.target.value)}
                        onClick={toggleToDropdown}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {isToDropdownOpen && (
                        <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto z-10">
                          {filteredToOptions.map((toVillage) => (
                            <li
                              key={toVillage.village}
                              onClick={() => handleToSelection(toVillage.village)}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            >
                              {toVillage.village}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
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

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit
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
