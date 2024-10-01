import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPassengerDetails } from "../../Redux/userside";
import ConformBookingDetails from "./conformBooking/conformBookingDetails";
import Surat from "./../../constvalue/constvalue"
import Header from "../header";
import Footer from "./footer";
import { useLocation } from "react-router-dom";



const Seating = () => {
  const searchapi = "https://shaktidham-backend.vercel.app/seats/search";
  const location = useLocation();
  const { formData, result } = location.state || {};


  const numbers = [
    ["B", "D", "F", "H", "J", "L"],
    ["A", "C", "E", "G", "I", "K"],
    ["1.2", "5.6", "9.10", "13.14", "17.18", "21.22"],
    ["3.4", "7.8", "11.12", "15.16", "19.20", "23.24"],
  ];
  const up = ["UP", "DOWN", "UP", "DOWN"]
  const [sortdata, setSortdata] = useState([]);
  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.inputs);
  const [show, setShow] = useState(false);
  const [pickup, setPickup] = useState()
  const [drop, setDrop] = useState()
  const [selectedSeats, setSelectedSeats] = useState({});
  const [visibleSeatsId, setVisibleSeatsId] = useState(null);
  const [ticketprice, setTickitPrice] = useState()




  const handleRoute = (route, id, date, price) => {
    console.log(route, "route");
    localStorage.setItem("route", route);
    localStorage.setItem("routeId", id);
    setTickitPrice(price)
    setShow(true);
    handleShowSeats(route, date);
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
    setVisibleSeatsId((prevId) => (prevId === id ? null : id));
    setSelectedSeats({})
  };

  const totalCount = Object.keys(selectedSeats).reduce((count, seat) => {
    return count + (/\d+\.\d+/.test(seat) ? 2 : 1);
  }, 0);

  const OpenBox = () => {
    dispatch(setPassengerDetails(true));
  };

  const handleShowSeats = useCallback(async (route, date) => {
    try {
      const response = await fetch(`${searchapi}?Date=${date}&route=${route}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setSortdata(result)

      // Handle result (e.g., update state with available seats)
    } catch (error) {
      console.error("Fetch operation error:", error);
    }
  }, [inputs]);


  return (
    <div><Header />
      <div className="bg-gray-100 min-h-screen p-3  flex flex-col items-center">
        <div className=" rounded-md w-full mb-6">
          {result.map((item) => (
            <div key={item._id}>
             <table className="w-full divide-gray-200 bg-white border border-gray-200 rounded-lg mb-10 shadow-md ">
  <tbody className="bg-white divide-gray-200 p-2">
    <tr>
      <th className="pl-2 py-3 text-xl font-medium text-blue-500 font-bold uppercase tracking-wider text-left md:text-left">Bus Name</th>
      <td className="pl-2 py-4 whitespace-nowrap text-lg font-bold text-gray-900 text-left md:text-right">Shaktidham Travels</td>
    </tr>
    <tr>
    <th className="pl-2 py-3 text-xl font-medium text-blue-500 font-bold uppercase tracking-wider text-left md:text-left">Bus Route</th>
    <td className="pl-2 py-4 whitespace-nowrap text-lg font-bold text-gray-900 text-left md:text-right">{item.route || "N/A"}</td>


    </tr>
    <tr>
    <th className="pl-2 py-3 text-xl font-medium text-blue-500 font-bold uppercase tracking-wider text-left md:text-left">Departure Time</th>
    <td className="pl-2 py-4 whitespace-nowrap text-lg font-bold text-gray-900 text-left md:text-right">{item.departureTime || "5:00"}</td>

    </tr>
    <tr>
    <th className="pl-2 py-3 text-xl font-medium text-blue-500 font-bold uppercase tracking-wider text-left md:text-left">Price</th>
    <td className="pl-2 py-4 whitespace-nowrap text-lg font-bold text-gray-900 text-left md:text-right">${item.price || "600"}</td>

    </tr>
    <tr>
    <th className="pl-2 py-3 text-xl font-medium text-blue-500 font-bold uppercase tracking-wider text-left md:text-left"></th>

      <td className="pl-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900 text-left md:text-right">
        <button
          className="bg-red-800 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-700"
          onClick={() => {
            toggleSeatsVisibility(item._id);
            handleRoute(item.route, item._id, item.date, item.price);
          }}
        >
          {visibleSeatsId === item._id ? "Hide Seats" : "View Seats"}
        </button>
      </td>
    </tr>
  </tbody>
</table>


              {/* Conditional Seating Area */}
              {visibleSeatsId === item._id && (
                <div className="w-full">
                  <div className="flex flex-col lg:flex-row lg:p-6 w-full">
                    <div className="flex-1 mb-6 lg:mb-0 lg:mr-10">
                      <div className="flex  lg:p-4 rounded-md w-fit">
                        <div className="flex justify-center">
                          {numbers.map((group, idx) => (

                            <div
                              key={idx}
                              className={`${idx === 1 ? 'mr-10' : idx === 2 ? 'ml-5' : ""
                                }`}
                            >


                              <h1 className="text-center font-bold">{up[idx]}</h1>
                              {group.map((num) => {
                                const item = sortdata.data?.find(item => item.seatNumber === num);
                                const isSelected = selectedSeats[num];
                                const isAvailable = item?.seatNumber === num;

                                return (
                                  <div
                                    key={num}
                                    className={`border border-gray-300 text-center p-5 font-bold rounded-md m-1 cursor-pointer 
    ${isSelected ? 'bg-blue-400' : isAvailable ? 'bg-green-500 text-white' : 'bg-white'}`}
                                    onClick={() => {
                                      // Prevent selection if the seat is available
                                      if (!isAvailable) {
                                        handleSeatSelect(num, !isSelected); // Toggle selection
                                      }
                                    }}
                                  >
                                    {num}
                                  </div>
                                );
                              })}

                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 mb-5">
                      <label className="block text-lg font-bold mb-2">Select Pickup Point:</label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-5"
                        onChange={(e) => setPickup(e.target.value)}
                        value={pickup}
                      >
                        <option value="" >Select</option>
                        {formData.from === "Surat" ? (
                          Surat.map((location, index) => (
                            <option key={index} value={location}>
                              {location}
                            </option>
                          ))
                        ) : (
                          <option value={formData.from}>
                            {formData.from}
                          </option>
                        )}
                      </select>

                      <label className="block text-lg font-bold mb-2">Select Dropping Point:</label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-5"
                        onChange={(e) => setDrop(e.target.value)}
                        value={drop}
                      >
                        <option value="" >Select</option>
                        {formData.to === "Surat" ? (
                          Surat.map((location, index) => (
                            <option key={index} value={location}>
                              {location}
                            </option>
                          ))
                        ) : (
                          <option value={formData.to}>
                            {formData.to}
                          </option>
                        )}
                      </select>

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
                              <td>{formData.from}</td>
                            </tr>
                            <tr>
                              <td className="font-bold">TO:</td>
                              <td>{formData.to}</td>
                            </tr>
                            <tr>
                              <td className="font-bold">TRAVEL DATE:</td>
                              <td>{formData.date}</td>
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
                              <td>{totalCount * ticketprice}</td>
                            </tr>
                            <tr>
                              <td className="font-bold"></td>
                              <td>
                                <button
                                  className={`bg-red-800 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-700 ${!pickup || !drop || Object.keys(selectedSeats).length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  onClick={OpenBox}
                                  disabled={!pickup || !drop || Object.keys(selectedSeats).length === 0}
                                >
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
        <ConformBookingDetails pickup={pickup}
          drop={drop}
          date={formData.date}
          from={formData.from}
          to={formData.to}
          seatNumber={Object.keys(selectedSeats).length > 0 ? Object.keys(selectedSeats).join(", ") : "None"}
          price={totalCount * ticketprice} />
      </div>
      <Footer />
    </div>
  );
};

export default Seating;
