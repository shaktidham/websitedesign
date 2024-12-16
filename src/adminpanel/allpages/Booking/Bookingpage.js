import React, { useState, useRef, useCallback, useEffect } from 'react';
import Loader from '../../../userpages/Loader/Loader';
import Sidebar from '../sidebar';
import { ReactComponent as Action } from "./../../../svg/action.svg";
import { ReactComponent as Uparrow } from "./../../../svg/uparrow.svg";
import { useLocation, useNavigate } from 'react-router-dom';

function Bookingpage({ loading }) {
  const [showchart, setShowchart] = useState(false);
  const [tooltipId, setTooltipId] = useState(null);
  const [seatsData, setSeatsData] = useState([]);
  const [personalroutedata, setPersonalrouteData] = useState([]);
  const [route, setRoute] = useState([]);
  const [date, setDate] = useState('');
  const location = useLocation();
  const buttonRefs = useRef([]);
  const tooltipRef = useRef(null);
  const navigate = useNavigate();
  const [selectedBusId, setSelectedBusId] = useState(null);

  const getLabel = useCallback((index) => {
    const alphabet = "ABCDEFGHIJKL";
    if (index < 12) return alphabet[index];
    if (index < 24) {
      const pairIndex = index - 12;
      const firstNumber = pairIndex * 2 + 1;
      return `${firstNumber}.${firstNumber + 1}`;
    }
    return `કેબિન-${index - 24 + 1}`;
  }, []);

  const tableData = Array.from({ length: 30 }, (_, index) => getLabel(index));

  const fetchSeatsData = useCallback(async (id) => {
    setSelectedBusId(id);
    // Check if route exists
    if (!route || !Array.isArray(route) || route.length === 0) {
      console.error("No route data available.");
      return;
    }

    const routeData = route.find((index) => index._id === id);
    if (!routeData) {
      console.error("Route not found.");
      return;
    }

    setPersonalrouteData(routeData);
    try {
      const response = await fetch(`https://shaktidham-backend.vercel.app/seats/search?_id=${id}`);
      if (!response.ok) throw new Error('Failed to fetch seats data');
      const result = await response.json();
      setSeatsData(result.data || []);
    } catch (error) {
      console.error("Error fetching seats data:", error.message);
    } finally {
      setShowchart(true);
    }
  }, [route]);

  const fetchRouteData = useCallback(async (selectedDate) => {
    try {
      const response = await fetch(`https://shaktidham-backend.vercel.app/route/read?date=${selectedDate}`);
      if (!response.ok) throw new Error('Failed to fetch route data');
      const result = await response.json();
      setRoute(result.data || []);
    } catch (error) {
      console.error("Error fetching route data:", error.message);
    }
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setSeatsData([]); // Clear seats data when date changes
    fetchRouteData(selectedDate);
  };
  const handleDelete = async (id) => {
    try {
      // Send DELETE request to the API
      const response = await fetch(`https://shaktidham-backend.vercel.app/seats/delete/${id}`, {
        method: 'DELETE',  // HTTP method for deletion
      });
  
      if (response.ok) {
       
        fetchSeatsData(selectedBusId)
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  

  const handleSelectSeat = (label) => {
    navigate("/Bookingform", { state: { label, personalroutedata, date } });
  };

  const handleTooltipToggle = (index) => {
    setTooltipId(tooltipId === index ? null : index);
  };

  useEffect(() => {
    // Set seatNumber from location.state if available
    if (location.state) {
      setDate(location.state.date);
      setRoute(location.state.route);
     
    }
  }, [location.state]);

  useEffect(() => {
    if (date) {
      fetchRouteData(date);
    }
  }, [date]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row h-screen">
          <Sidebar className="w-full md:w-1/6 bg-white shadow-lg" />

          <div className="flex-1 p-4 overflow-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="mx-auto">
                <label htmlFor="date" className="block text-gray-700 font-medium">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
            </div>

            <div className="flex justify-between items-center my-5">
              <button className="bg-red-600 hover:bg-red-300 text-white px-4 py-2 rounded shadow-md transition-all duration-300">
                Back
              </button>
              {route?.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            fetchSeatsData(item._id);
            setSelectedBusId(item._id); // Update the selected bus id
          }}
          className={`${
            selectedBusId === item._id
              ? 'bg-green-800' // Change to a different background color when selected
              : 'bg-red-600'
          } hover:bg-red-300 text-white px-4 py-2 rounded shadow-md transition-all duration-300`}
        >
          {item.Busname}
        </button>
      ))}
              <button className="bg-red-600 hover:bg-red-300 text-white px-4 py-2 rounded shadow-md transition-all duration-300">
                Download
              </button>
            </div>

            {showchart && (
              <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white shadow-md rounded-lg">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      {['NUMBER', 'VILLAGE', 'NAME', 'NUMBER', 'EXTRA', 'PICKUP', 'ACTION'].map((header) => (
                        <th key={header} className="px-6 py-4 text-left text-sm font-semibold">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((label, rowIndex) => {
                      const item = seatsData.find(seat => seat.seatNumber === label);
                      const renderCell = (value) => <td className="px-6 py-4 text-sm border border-2 text-gray-700">{value}</td>;

                      return (
                        <tr key={rowIndex} className="border-t hover:bg-gray-100">
                          <td className="px-6 py-4 text-xl border border-2 font-bold text-gray-700 text-center">{label}</td>
                          {item ? (
                            <>
                              {renderCell(item.to)}
                              {renderCell(item.name)}
                              {renderCell(item.mobile)}
                              {renderCell(item.extra)}
                              {renderCell(item.pickup)}
                            </>
                          ) : (
                            <>
                              {renderCell('')}
                              {renderCell('')}
                              {renderCell('')}
                              {renderCell('')}
                              {renderCell('')}
                            </>
                          )}
                          <td className="relative border border-2">
                            <button
                              className="ml-4 hover:text-blue-900"
                              onClick={() => handleTooltipToggle(rowIndex)}
                              ref={(el) => (buttonRefs.current[rowIndex] = el)}
                            >
                              <div className="flex justify-center">
                                <Action className="w-6 h-6 text-blue-500" />
                              </div>
                            </button>

                            {tooltipId === rowIndex && (
                              <div
                                role="tooltip"
                                className="absolute shadow-lg bg-blue-400 z-10 border rounded p-2 w-fit"
                                style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}
                                ref={tooltipRef}
                              >
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                  <Uparrow className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="flex flex-col">
                                  <ul className="space-y-2">
                                    <li
                                      className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold border-2 border-white"
                                      onClick={() => handleSelectSeat(label)}
                                    >
                                      {item?.to ? "Edit" : "Add"}
                                    </li>
                                    <li className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold border-2 border-white" onClick={() => handleDelete(item._id)}>
                                      Delete
                                    </li>
                                    <li className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold border-2 border-white">
                                      Send
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingpage;
