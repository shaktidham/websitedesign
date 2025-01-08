import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar";
import { cabin, kabin, labels, number } from "../../../constvalue/constvalue";
import {
  GeneratesTableRows,
  generateTableRows,
} from "../../../defultfunction/bookingpagebox/bookingpagebox";
import Bookedsitshow from "./bookedsitshow";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { handleDownload } from "../../../defultfunction/chartdownload/chartdownload";
import Loader from "../../../userpages/Loader/Loader";
import { handleSendWhatsApp } from "../../../defultfunction/whatapp/whatappmsg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";

// import { handleSendWhatsApp } from "../../../defultfunction/whatapp/whatappmsg";
function Bookingpage() {
  const location = useLocation();
  const [date, setDate] = useState(""); // Initialize date
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState(false);
  const [mobilewisedata, setMobilewisedata] = useState([]);
  const [allroute, setAllRoute] = useState([]);
  const [routeids, setRoute] = useState("");
  const token = Cookies.get("authToken");

  // Set today's date initially or handle state changes
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
    handlemobilewiseSeats(today); // Fetch mobile-wise seats for today
  }, []); // Empty dependency array to run only once on component mount

  // Fetch booked seats for the selected date
  const fetchBookedSeats = async () => {
    if (!date) {
      console.error("Date is missing");
      return; // Avoid making API call if date is not set
    }
    setLoading(true);
    const url = routeids
      ? `https://shaktidham-backend.vercel.app/seats/searchbyseats?date=${date}&route=${routeids}`
      : `https://shaktidham-backend.vercel.app/seats/searchbyseats?date=${date}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data)) {
        setBookedSeats(data);
      } else {
        setBookedSeats([]); // In case the data is not an array
        console.error("Expected an array, but got:", data);
      }
    } catch (error) {
      console.error("Error fetching booked seats:", error);
      setBookedSeats([]); // Fallback to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (date || routeids) {
      fetchBookedSeats(); // Fetch booked seats if date is available
    }
  }, [date, routeids]); // Dependency array will trigger fetch on date change

  // If location state is passed, update the date
  useEffect(() => {
    if (location.state && location.state.date) {
      setDate(location.state.date); // Set date from location state if present
      setRoute(location.state.route);
    }
  }, [location.state]); // This runs if location state changes

  // Delete a booked seat by its ID
  const handleDelete = async (id) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!isConfirmed) {
      return; // Exit the function if the user cancels
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://shaktidham-backend.vercel.app/seats/delete/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        fetchBookedSeats(date); // Re-fetch booked seats after deletion
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const Details = (data) => {
    setPopup(true);
    setPopupData(data);
  };

  const handlechartDownloads = async (Route) => {
    const id = Route.route;
    const passengers = Route;
    setLoading(true);
    try {
      const response = await fetch(
        `https://shaktidham-backend.vercel.app/seats/getchartprint?route=${id}`
      );
      const data = await response.json();
      handleDownload(data, passengers); // Handle chart download
    } catch (error) {
      console.error("Error fetching booked seats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlemobilewiseSeats = async (date) => {
    setLoading(true);
    setAllRoute();
    setRoute();
    try {
      const response = await fetch(
        `https://shaktidham-backend.vercel.app/seats/getseatsByMobile?date=${date}`
      );
      const route = await fetch(
        `https://shaktidham-backend.vercel.app/route/readid?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header with Bearer token
            "Content-Type": "application/json", // Ensure the request content is interpreted as JSON
          },
        }
      );
      const data = await response.json();
      const routedata = await route.json();
      setAllRoute(routedata.data);
      setMobilewisedata(data);
    } catch (error) {
      console.error("Error fetching booked seats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlewhatapp = (data) => {
    const filterData = mobilewisedata.filter(
      (item) => item.mobile === data.mobile && item.route === data.route
    );

    const filterRoute = bookedSeats.filter((item) => item.route === data.route);
    handleSendWhatsApp(filterData, filterRoute);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex">
          <Sidebar className="w-full md:w-1/6 bg-white shadow-lg" />
          <div className="flex-1 p-4 ml-64">
            <div className="flex items-center justify-center mb-4 space-x-8">
              {/* Centered content */}
              <div className="w-full max-w-xs sm:w-full">
                {/* Limit width for date picker */}
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-medium"
                >
                  Date
                </label>
                <DatePicker
                  selected={date}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy" // Custom date format
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-full max-w-xs sm:w-full">
                {/* Limit width for select dropdown */}
                <label
                  htmlFor="busName"
                  className="block text-gray-700 font-medium mt-4"
                >
                  Bus Name
                </label>
                <select
                  id="busName"
                  onChange={(e) => setRoute(e.target.value)} // Pass the selected value (e.target.value)
                  value={routeids}
                  className="block px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" selected>
                    Select Bus
                  </option>
                  {allroute?.map((route, index) => (
                    <option key={index} value={route._id} className="w-1/2">
                      {route.Busname}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {Array.isArray(bookedSeats) && bookedSeats.length > 0 ? (
              <div className="lg:flex  lg:flex-wrap justify-between gap-4">
                {/* Added gap-4 for spacing */}
                {bookedSeats.map((Route, index) => (
                  <div key={index} className="lg:w-[48%] mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-bold text-blue-800">
                        Bus Name : {Route.busName}--{Route.last}
                      </div>
                      <div className="text-sm font-bold text-red-800">
                        ભરેલી સિટ : {Route.count}
                        <br></br>
                        ખાલી સિટ: {36 - Route.count}
                      </div>
                      <button
                        className="bg-blue-600 p-2 text-white font-bold rounded"
                        onClick={() => handlechartDownloads(Route)}
                      >
                        Download
                      </button>
                    </div>
                    <div className="flex justify-between   mb-4">
                      <div className="w-1/2 flex flex-stretch pr-2">
                        <table className="min-w-full border-collapse border border-black">
                          <thead>
                            <tr>
                              <th className="bg-red-500 text-white p-1">ઉપર</th>
                              <th className="bg-red-500 text-white p-1">
                                નીચે
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {generateTableRows(
                              labels,
                              Route.passengers,
                              handleDelete,
                              Details,
                              date,
                              Route.route,
                              handlewhatapp,
                              routeids
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="w-1/2 flex flex-stretch pl-2">
                        <table className="min-w-full border-collapse border border-black">
                          <thead>
                            <tr>
                              <th className="bg-red-500 text-white p-1">
                                નીચે
                              </th>
                              <th className="bg-red-500 text-white p-1">ઉપર</th>
                            </tr>
                          </thead>
                          <tbody>
                            {generateTableRows(
                              number,
                              Route.passengers,
                              handleDelete,
                              Details,
                              date,
                              Route.route,
                              handlewhatapp,
                              routeids
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="w-full">
                      <table className="w-full">
                        <GeneratesTableRows
                          kabin={cabin}
                          chartData={Route.passengers}
                          route={Route.route}
                          date={date}
                          handlewhatapp={handlewhatapp}
                          Details={Details}
                          handleDelete={handleDelete}
                          routeids={routeids}
                        />
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No booked seats available for this date.</div>
            )}
          </div>
          <Bookedsitshow popup={popup} setPopup={setPopup} data={popupData} />
        </div>
      )}
    </>
  );
}

export default Bookingpage;
