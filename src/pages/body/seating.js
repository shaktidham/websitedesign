import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPassengerDetails } from "../../Redux/userside";
import ConformBookingDetails from "./conformBooking/conformBookingDetails";
import Surat from "./../../constvalue/constvalue"



const Seating = () => {
  const searchapi = "https://shaktidham-backend.vercel.app/seats/search";
  const numbers = [
    ["B", "D", "F", "H", "J", "L"],
    ["A", "C", "E", "G", "I", "K"],
    ["1.2", "5.6", "9.10", "13.14", "17.18", "21.22"],
    ["3.4", "7.8", "11.12", "15.16", "19.20", "23.24"],
  ];
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
  console.log(pickup,drop,"ss");

  return (
    <div className="bg-red-400 min-h-screen p-6 flex flex-col items-center">
      <div className="overflow-x-auto rounded-md w-full mb-6">
        {inputs?.Tablemanuplation?.AllRoute.map((item) => (
          <div key={item._id}>
            <table className="divide-y max-w-xl divide-gray-200 bg-white border border-gray-200 rounded-lg mb-10 shadow-md">
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
        <div className="flex bg-red-400 lg:p-4 rounded-md">
          <div className="flex justify-center">
            {numbers.map((group, idx) => (
              <div key={idx} className="mr-5">
                <h1 className="text-center font-bold">LB</h1>
                {group.map((num) => {
                  const item = sortdata.data?.find(item => item.seatNumber === num);

                  return (
                    <div
                      key={num}
                      className={`border border-gray-300 text-center p-5 font-bold rounded-md m-1 cursor-pointer 
                      ${selectedSeats[num] ? 'bg-blue-400' : (item?.seatNumber === num ? 'bg-green-500 text-white' : 'bg-white')}`}
                      onClick={() => handleSeatSelect(num, selectedSeats[num] ? null : num)}
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
          {inputs.Tablemanuplation.searchdata.from === "Village 2" ? (
            Surat.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))
          ) : (
            <option value={inputs.Tablemanuplation.searchdata.from}>
              {inputs.Tablemanuplation.searchdata.from}
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
          {inputs.Tablemanuplation.searchdata.to === "Village 2" ? (
            Surat.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))
          ) : (
            <option value={inputs.Tablemanuplation.searchdata.to}>
              {inputs.Tablemanuplation.searchdata.to}
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
                <td>{totalCount * ticketprice}</td>
              </tr>
              <tr>
                <td className="font-bold"></td>
                <td>
                  <button
                    className={`bg-red-800 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-700 ${!pickup || !drop ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={OpenBox}
                    disabled={!pickup || !drop}
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
        date={inputs.Tablemanuplation.searchdata.date}
        from={inputs.Tablemanuplation.searchdata.from}
        to={inputs.Tablemanuplation.searchdata.to}
        seatNumber={Object.keys(selectedSeats).length > 0 ? Object.keys(selectedSeats).join(", ") : "None"}
        price={totalCount * ticketprice} />
    </div>
  );
};

export default Seating;
