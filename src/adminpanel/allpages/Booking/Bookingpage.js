import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar";
import { labels, number } from "../../../constvalue/constvalue";
import { generateTableRows } from "../../../defultfunction/bookingpagebox/bookingpagebox";
import Bookedsitshow from "./bookedsitshow";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { handleDownload } from "../../../defultfunction/chartdownload/chartdownload";
import Loader from "../../../userpages/Loader/Loader";

function Bookingpage() {
  const location = useLocation();
  const [date, setDate] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState(false);

  // Set today's date initially
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // Fetch booked seats for the selected date
  const fetchBookedSeats = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://shaktidham-backend.vercel.app/seats/searchbymobile?date=${date}`
      );
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
    if (!date) return;
    fetchBookedSeats();
  }, [date]);

  // If location state is passed, update the date
  useEffect(() => {
    if (location.state) {
      setDate(location.state.date);
    }
  }, [location.state]);

  // Delete a booked seat by its ID
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://shaktidham-backend.vercel.app/seats/delete/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        fetchBookedSeats(date);
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const Details = (data) => {
    setPopup(true);
    setPopupData(data);
  };

  const handlechartDownloads = async (Route) => {
    const id = Route.route;
    const passengers = Route?.passengers;
    setLoading(true);
    try {
      const response = await fetch(
        `https://shaktidham-backend.vercel.app/seats/getchartprint?route=${id}`
      );
      const data = await response.json();
      handleDownload(data, passengers);
    } catch (error) {
      console.error("Error fetching booked seats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex">
          <Sidebar className="w-full md:w-1/6 bg-white shadow-lg" />
          <div className="flex-1 p-4 ml-64">
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

            {Array.isArray(bookedSeats) && bookedSeats.length > 0 ? (
              <div>
                {bookedSeats.map((Route, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <div className="text-xl font-bold text-blue-800">
                        Bus Name : {Route.busName}
                      </div>
                      <button
                        className="bg-blue-600 p-2 text-white font-bold rounded"
                        onClick={() => handlechartDownloads(Route)}
                      >
                        Download
                      </button>
                    </div>
                    <div className="flex justify-between mb-4">
                      <div className="w-1/2 pr-2">
                        <table className="min-w-full border-collapse border border-black">
                          <thead>
                            <tr>
                              <th className="bg-red-500 text-white p-1">ઉપર</th>
                              <th className="bg-red-500 text-white p-1">નીચે</th>
                            </tr>
                          </thead>
                          <tbody>
                            {generateTableRows(
                              labels,
                              Route.passengers,
                              handleDelete,
                              Details,
                              date,
                              Route.route
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="w-1/2 pl-2">
                        <table className="min-w-full border-collapse border border-black">
                          <thead>
                            <tr>
                              <th className="bg-red-500 text-white p-1">નીચે</th>
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
                              Route.route
                            )}
                          </tbody>
                        </table>
                      </div>
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
