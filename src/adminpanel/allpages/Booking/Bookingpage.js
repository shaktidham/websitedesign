import React, { useState, useRef, useCallback, useEffect } from "react";
import Loader from "../../../userpages/Loader/Loader";
import Sidebar from "../sidebar";
import { ReactComponent as Action } from "./../../../svg/action.svg";
import { ReactComponent as Uparrow } from "./../../../svg/uparrow.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { handleSendWhatsApp } from "../../../defultfunction/whatapp/whatappmsg";
import { getLabel } from "../../../constvalue/constvalue";

function Bookingpage({ loading }) {
  const [showchart, setShowchart] = useState(false);
  const [tooltipId, setTooltipId] = useState(null);
  const [seatsData, setSeatsData] = useState([]);
  const [personalroutedata, setPersonalrouteData] = useState([]);
  const [route, setRoute] = useState([]);
  const [date, setDate] = useState("");
  const location = useLocation();
  const buttonRefs = useRef([]);
  const tooltipRef = useRef(null);
  const navigate = useNavigate();
  const [selectedBusId, setSelectedBusId] = useState(null);

  

  const fetchSeatsData = useCallback(
    async (id) => {
      // setSelectedBusId(id);
      // if (!route || route.length === 0) {
      //   console.error("No route data available.");
      //   return;
      // }

      const routeData = route?.find((index) => index._id === id);
      // if (!routeData) {
      //   console.error("Route not found.");
      //   return;
      // }

      setPersonalrouteData(routeData);
      try {
        const response = await fetch(
          `https://shaktidham-backend.vercel.app/seats/search?_id=${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch seats data");
        const result = await response.json();
        setSeatsData(result.data);
      } catch (error) {
        console.error("Error fetching seats data:", error.message);
      } finally {
        setShowchart(true);
      }
    },
    [route]
  );

  const fetchRouteData = useCallback(async (selectedDate) => {
    try {
      const response = await fetch(
        `https://shaktidham-backend.vercel.app/route/read?date=${selectedDate}`
      );
      if (!response.ok) throw new Error("Failed to fetch route data");
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
      const response = await fetch(`https://shaktidham-backend.vercel.app/seats/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchSeatsData(selectedBusId); // Refetch seats after deletion
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
 
  const handleSelectSeat = (label, item) => {
    navigate("/Bookingform", {
      state: { label, personalroutedata, date, item, seatsData },
    });
  };

  const handleTooltipToggle = (index) => {
    setTooltipId(tooltipId === index ? null : index);
  };

  useEffect(() => {
    // Set seatNumber from location.state if available
    if (location.state) {
      setDate(location.state.date || ""); // Make sure date is set from location.state
      setPersonalrouteData(location.state.routeData);
      fetchSeatsData(location.state.id);
      setSelectedBusId(location.state.id);
     
      setShowchart(true); // Show the chart once the data is fetched
    }
  }, [location.state]);
  useEffect(() => {
    if (date) {
      fetchRouteData(date); // Fetch route data when date changes
    } else {
      // If no date is selected, default to today's date
      const today = new Date().toISOString().split('T')[0];
      setDate(today);  // Set default date as today
      fetchRouteData(today); // Fetch route data for today's date
    }
  }, [date, fetchRouteData]); // Dependencies to rerun the effect on date change
  

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
  value={date ? date : new Date().toISOString().split('T')[0]} // Sets today's date if 'date' is not provided
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
                    setSelectedBusId(item._id);
                  }}
                  className={`${
                    selectedBusId === item._id ? "bg-green-800" : "bg-red-600"
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
                      {[
                        "NUMBER",
                        "VILLAGE",
                        "NAME",
                        "NUMBER",
                        "EXTRA",
                        "PICKUP",
                        "ACTION",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-sm font-semibold"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getLabel.map((label, rowIndex) => {
                      const item = seatsData.find(
                        (seat) => seat.seatNumber === label
                      );
                      const renderCell = (value) => (
                        <td className="px-6 py-4 text-sm border border-2 text-gray-700">
                          {value}
                        </td>
                      );

                      return (
                        <tr
                          key={rowIndex}
                          className="border-t hover:bg-gray-100"
                        >
                          <td className="px-6 py-4 text-xl border border-2 font-bold text-gray-700 text-center">
                            {label}
                          </td>
                          {item ? (
                            <>
                              {renderCell(item.to)}
                              {renderCell(item.name)}
                              {renderCell(item.mobile)}
                              {renderCell(item.extradetails)}
                              {renderCell(item.pickup)}
                            </>
                          ) : (
                            <>
                              {renderCell("")}
                              {renderCell("")}
                              {renderCell("")}
                              {renderCell("")}
                              {renderCell("")}
                            </>
                          )}
                          <td
                            className="relative border border-2 cursor-pointer"
                            onClick={() => handleTooltipToggle(rowIndex)}
                            ref={(el) => (buttonRefs.current[rowIndex] = el)}
                          >
                            <button className="ml-4 hover:text-blue-900">
                              <div className="flex justify-center">
                                <Action className="w-6 h-6 text-blue-500" />
                              </div>
                            </button>
                            {tooltipId === rowIndex && (
                              <div
                                role="tooltip"
                                className="absolute shadow-lg bg-blue-400 z-10 border rounded p-2 w-fit"
                                style={{
                                  top: "100%",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                }}
                                ref={tooltipRef}
                              >
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                  <Uparrow className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="flex flex-col">
                                  <ul className="space-y-2">
                                    <li
                                      className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold border-2 border-white"
                                      onClick={() =>
                                        handleSelectSeat(label, item)
                                      }
                                    >
                                      {item?.mobile ? "Edit" : "Add"}
                                    </li>
                                    <li
                                      className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold border-2 border-white"
                                      onClick={() => handleDelete(item._id)}
                                    >
                                      Delete
                                    </li>
                                    <li
                                      className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold border-2 border-white"
                                      onClick={() => handleSendWhatsApp(item)}
                                    >
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
