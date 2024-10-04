import React, { useState } from "react";

const Ticektshow = () => {
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date = event.target.date.value;
    const mobile = event.target.mobile.value;

    const requestData = {
      date: date,
      mobile: mobile,
    };

    try {
      const response = await fetch("http://localhost:3002/seats/searchTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const ticketdata = await response.json();
      setData(ticketdata.length > 0 ? ticketdata : []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
        My Booking
      </h1>
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6 items-center">
        <div className="flex-1 mb-4 sm:mb-0 w-full sm:w-auto">
          <label className="block text-gray-700 mb-1" htmlFor="mobile">
            Mobile No:
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your mobile number"
            required
          />
        </div>
        <div className="flex-1 mb-4 sm:mb-0 w-full sm:w-auto">
          <label className="block text-gray-700 mb-1" htmlFor="date">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex-none mb-4 sm:mb-0 w-full sm:w-auto">
          <label className="block text-gray-700 mb-5" htmlFor="mobile"></label>
          <button
            type="submit"
            className="w-full sm:w-32 bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Search
          </button>
        </div>
      </div>

      <div>
        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <tbody>
                {data.map((item, index) => (
                  <>
                    <tr key={`${index}-busname`}>
                      <th className="border border-gray-300">BUSNAME</th>
                      <td className="border border-gray-300 text-left">
                        Shaktidham Travels
                      </td>
                    </tr>
                    <tr key={`${index}-name`}>
                      <th className="border border-gray-300">NAME</th>
                      <td className="border border-gray-300 text-left">
                        {item.name}
                      </td>
                    </tr>
                    <tr key={`${index}-date`}>
                      <th className="border border-gray-300">DATE</th>
                      <td className="border border-gray-300 text-left">
                        {item.date}
                      </td>
                    </tr>
                    <tr key={`${index}-seat`}>
                      <th className="border border-gray-300">SEAT NUMBER</th>
                      <td className="border border-gray-300 text-left">
                        {item.seatNumber}
                      </td>
                    </tr>
                    <tr key={`${index}-actions `}>
                      <th className="border border-gray-300">Ticket</th>
                      <td className="border border-gray-300 text-left py-3 px-2">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                          Download
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-red-500">No data available.</p>
        )}
      </div>
    </form>
  );
};

export default Ticektshow;
