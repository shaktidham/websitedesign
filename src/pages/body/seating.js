import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPassengerDetails } from "../../Redux/userside";
import ConformBookingDetails from "./conformBooking/conformBookingDetails";

const SeatSelection = ({ id, seatNumber, onSeatSelect }) => (
  <form className="mb-6">
    <label htmlFor={`seatSelect-${id}`} className="block text-lg font-bold mb-2">
      Select Seat:
    </label>
    <select
      id={`seatSelect-${id}`}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      onChange={(e) => onSeatSelect(seatNumber, e.target.value)}
    >
      <option value="">Select</option>
      <option value={seatNumber}>{seatNumber}</option>
    </select>
  </form>
);

const Seating = () => {
  const searchapi = "https://shaktidham-backend.vercel.app/seats/search";
  const numbers = [
    ["B", "D", "F", "H", "J", "L"],
    ["A", "C", "E", "G", "I", "K"],
    ["1.2", "5.6", "9.10", "13.14", "17.18", "21.22"],
    ["3.4", "7.8", "11.12", "15.16", "19.20", "23.24"],
  ];

  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.inputs);
  const [show, setShow] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [visibleSeats, setVisibleSeats] = useState({});

  const handleRoute = (route, id, date) => {
    localStorage.setItem("route", route);
    localStorage.setItem("routeId", id);
    setShow(true);
    hadleshowsit(route, date);
  };

  const handleSeatSelect = (seatNumber, selected) => {
    setSelectedSeats((prev) => {
      const newSeats = { ...prev };
      if (selected) {
        newSeats[seatNumber] = selected;
      } else {
        delete newSeats[seatNumber];
      }
      return newSeats;
    });
  };

  const toggleSeatsVisibility = (id) => {
    setVisibleSeats((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalCount = Object.keys(selectedSeats).reduce((count, seat) => {
    return count + (/\d+\.\d+/.test(seat) ? 2 : 1);
  }, 0);

  const OpenBox = () => {
    dispatch(setPassengerDetails(true));
  };

  const hadleshowsit = useCallback(async (route, date) => {
    try {
      const response = await fetch(`${searchapi}?Date=${date}&route=${route}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      // Handle result (e.g., update state with available seats)
    } catch (error) {
      console.error("Fetch operation error:", error);
    }
  }, [inputs]);

  return (
    <div className="bg-red-400 min-h-screen p-6 flex flex-col items-center">
      <div className="overflow-x-auto rounded-md w-full max-w-xl mb-6">
        {inputs?.Tablemanuplation?.AllRoute.map((item) => (
          <div key={item._id}>
            <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-200 rounded-lg mb-10 shadow-md">
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus Name</th>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Shaktidham Travels</td>
                </tr>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus Route</th>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.route || "N/A"}</td>
                </tr>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure Time</th>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.departureTime || "5:00"}</td>
                </tr>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price || "600"}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="bg-red-800 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-700"
                      onClick={() => {
                        toggleSeatsVisibility(item._id);
                        handleRoute(item.route, item._id, item.date);
                      }}
                    >
                      {visibleSeats[item._id] ? "Hide Seats" : "View Seats"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Conditional Seating Area */}
            {visibleSeats[item._id] && (
              <div className="overflow-x-auto w-full">
                <div className="flex flex-col lg:flex-row p-6 w-full">
                  <div className="flex flex-col lg:w-2/3 mb-6 lg:mb-0 lg:mr-10">
                    <div className="flex bg-red-400 p-4 rounded-md">
                      <div className="flex justify-center">
                        <div className="mr-5">
                          <h1 className="text-center font-bold">LB</h1>
                          {numbers[0].map((num, idx) => (
                            <div
                              key={idx}
                              className={`border border-gray-300 text-center p-5 font-bold rounded-md m-1 cursor-pointer ${selectedSeats[num] ? 'bg-blue-400' : 'bg-white'}`}
                              onClick={() => handleSeatSelect(num, selectedSeats[num] ? null : num)}
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                        <div>
                          <h1 className="text-center font-bold">LB</h1>
                          {numbers[1].map((num, idx) => (
                            <div
                              key={idx}
                              className={`border border-gray-300 text-center p-5 font-bold rounded-md m-1 cursor-pointer ${selectedSeats[num] ? 'bg-blue-400 text-white' : 'bg-white'}`}
                              onClick={() => handleSeatSelect(num, selectedSeats[num] ? null : num)}
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mx-10" />

                      <div className="flex justify-center">
                        <div className="mr-5">
                          <h1 className="text-center font-bold">LB</h1>
                          {numbers[2].map((num, idx) => (
                            <div
                              key={idx}
                              className={`border border-gray-300 text-center p-5 rounded-md m-1 font-bold cursor-pointer ${selectedSeats[num] ? 'bg-blue-400 text-white' : 'bg-white'}`}
                              onClick={() => handleSeatSelect(num, selectedSeats[num] ? null : num)}
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                        <div>
                          <h1 className="text-center font-bold">LB</h1>
                          {numbers[3].map((num, idx) => (
                            <div
                              key={idx}
                              className={`border border-gray-300 text-center p-5 rounded-md font-bold m-1 cursor-pointer ${selectedSeats[num] ? 'bg-blue-400 text-white' : 'bg-white'}`}
                              onClick={() => handleSeatSelect(num, selectedSeats[num] ? null : num)}
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/3">
                    <SeatSelection id="1" seatNumber="1.2" onSeatSelect={handleSeatSelect} />
                    <SeatSelection id="2" seatNumber="5.6" onSeatSelect={handleSeatSelect} />
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="text-left font-bold text-xl mb-4">SEAT DETAILS</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="font-bold">FROM:</td>
                            <td>{inputs.Tablemanuplation.searchdata.from}</td>
                          </tr>
                          <tr>
                            <td className="font-bold">TO:</td>
                            <td>{inputs.Tablemanuplation.searchdata.to}</td>
                          </tr>
                          <tr>
                            <td className="font-bold">TRAVEL DATE:</td>
                            <td>{inputs.Tablemanuplation.searchdata.date}</td>
                          </tr>
                          <tr>
                            <td className="font-bold">SEAT NUMBER:</td>
                            <td>{Object.keys(selectedSeats).length > 0 ? Object.keys(selectedSeats).join(", ") : "None"}</td>
                          </tr>
                          <tr>
                            <td className="font-bold">TOTAL SEATS:</td>
                            <td>{totalCount}</td>
                          </tr>
                          <tr>
                            <td className="font-bold">PRICE:</td>
                            <td>{totalCount * 600}</td>
                          </tr>
                          <tr>
                            <td className="font-bold"></td>
                            <td>
                              <button className="bg-red-800 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-700" onClick={OpenBox}>
                                Book
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <ConformBookingDetails />
    </div>
  );
};

export default Seating;
