import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


function Showbusnumber({ showQuestion, popbox, busdetails, handleDateChange }) {
  const inputs = useSelector((state) => state.inputs);
  const location = useLocation();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatDateForDisplay = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const formatDateForAPI = (date) => {
    if (!date) return "";
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const date = formatDateForDisplay(inputs.Tablemanuplation.date);

  const [data, setData] = useState({
    busNumber: "",
    location: "",
    price: "",
    kabinprice: "",
    driver: "",
    date: date,
    bustime: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
      date: date,
    }));

    if (name === "busNumber") {
      setShowOtherInput(value === "other");
    }
  };

  const handleOtherInputChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      busNumber: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formattedData = {
      ...data,
      date: formatDateForAPI(data.date),
    };

    try {
      const hasId = busdetails.data[0]?._id;

      const endpoint = hasId
        ? `https://shaktidham-backend.vercel.app/bus/update/${busdetails.data[0]._id}`
        : "https://shaktidham-backend.vercel.app/bus/create";
      const method = hasId ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const result = await response.json();

        setData({
          busNumber: "",
          location: "",
          price: "",
          kabinprice: "",
          driver: "",
          date: date,
          bustime: "",
        });
        showQuestion();
        handleDateChange(inputs.Tablemanuplation.date);
      } else {
        const errorText = await response.text();
        console.error("Submission failed:", errorText);
        setError("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Fetch operation error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {popbox && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-100">
          <div className="bg-white w-3/4 md:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <div className="font-bold text-xl"></div>
              <div className="cursor-pointer" onClick={showQuestion}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="35px"
                  width="35px"
                >
                  <path
                    fill="#64748B"
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                  />
                </svg>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="busNumber"
                  className="text-left text-gray-700 font-bold block"
                >
                  બસ નંબર:
                </label>
                <select
                  id="busNumber"
                  name="busNumber"
                  onChange={handleChange}
                  value={data.busNumber}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  // required
                >
                  <option value="">Select your Bus Number</option>
                  <option value="GJ-05-CW-9027">GJ-05-CW-9027</option>
                  <option value="GJ-05-CW-9927">GJ-05-CW-9927</option>
                  <option value="GJ-14-Z-9090">GJ-14-Z-9090</option>
                  <option value="GJ-14-Z-9009">GJ-14-Z-9009</option>
                  <option value="GJ-05-BZ-0999">GJ-05-BZ-0999</option>
                  <option value="GJ-05-BZ-9999">GJ-05-BZ-9999</option>
                  <option value="other">Other</option>
                </select>
                {showOtherInput && (
                  <input
                    type="text"
                    placeholder="Enter your Bus Number"
                    className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    value={data.busNumber === "other" ? "" : data.busNumber}
                    onChange={handleOtherInputChange}
                    // required
                  />
                )}
              </div>
              <label
                htmlFor="price"
                className="text-left text-gray-700 font-bold block mt-4"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                onChange={handleChange}
                value={data.price}
                placeholder="Enter Price"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                // required
              />
              <label
                htmlFor="kabinprice"
                className="text-left text-gray-700 font-bold block mt-4"
              >
                કેબિન Price:
              </label>
              <input
                type="number"
                id="kabinprice"
                name="kabinprice"
                onChange={handleChange}
                value={data.kabinprice}
                placeholder="Enter Price"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              <label
                htmlFor="location"
                className="text-left text-gray-700 font-bold block mt-4"
              >
                લોકેશન:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                onChange={handleChange}
                value={data.location}
                placeholder="Enter Location"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                // required
              />
              <label
                htmlFor="driver"
                className="text-left text-gray-700 font-bold block mt-4"
              >
                ડ્રાઈવર:
              </label>
              <input
                type="text"
                id="driver"
                name="driver"
                onChange={handleChange}
                value={data.driver}
                placeholder="Enter Driver Name"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                // required
              />
              <label
                htmlFor="bustime"
                className="text-left text-gray-700 font-bold block mt-4"
              >
                બસ ઉપાડવાનો સમય:
              </label>
              <input
                type="text"
                id="bustime"
                name="bustime"
                onChange={handleChange}
                value={data.bustime}
                placeholder="Enter bustime"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                // required
              />
              <label
                htmlFor="date"
                className="text-left text-gray-700 font-bold block mt-4"
              >
                તારીખ:
              </label>
              <input
                type="text"
                id="date"
                name="date"
                onChange={handleChange}
                value={date}
                placeholder="Enter Date (dd/mm/yyyy)"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
                readOnly
              />
              <div className="flex space-x-2 mt-3">
                <button
                  type="submit"
                  className={`bg-blue-500 text-white font-bold py-2 px-4 rounded w-full ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {busdetails.data[0]?._id ? "Update" : "Submit"}
                </button>
              </div>
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </form>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4">Bus Number</td>
                    <td className="p-4">
                      {busdetails?.data?.[0]?.busNumber || ""}
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4">Driver</td>
                    <td className="p-4">
                      {busdetails?.data?.[0]?.driver || ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Showbusnumber;
