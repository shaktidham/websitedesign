import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ReactComponent as Onoff } from "../svg/onoff.svg";

function Form() {
  const inputs = useSelector((state) => state.inputs);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const villageNames = [
    "અરજણસુખ",
    "ખાખરીયા",
    "સૂર્યપ્રતાપગઢ",
    "અનીડા",
    "ઉજળા",
    "મોટાઉજળા",
    "તાલાળિ",
    "સનાળિ",
    "રાણસીકી",
    "દેરડી",
    "મોટીખીલોરી",
    "મેતાખંભાળિયા",
    "કેશવાળા",
    "કેશવાળાપાટીયુ",
    "કમઢીયા",
    "બિલડી",
    "ડોડીયાળા",
    "સાણથલી",
    "નવાગામ",
    "જુનાપીપળીયા",
    "જીવાપર",
    "પાંચવડા",
    "પાંચવડાચોકડી",
    "આટકોટ",
    "જસદણ",
    "સૂર્યાપંપ",
    "લીલાપુર",
    "લાલાવદર",
    "વિછીયા",
    "રાણપુર",
  ];

  // Get the item to edit from location state
  const itemToEdit = location.state?.itemToEdit || null;
  const route = localStorage.getItem("routeId")

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

  const initialData = {
    name: "",
    from: "",
    to: "",
    pickup: "",
    drop: "",
    mobile: "",
    seatNumbers: "",
    date: "",
    gender: "",
    age: "",
 
  };


  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (itemToEdit) {
      setData({
        name: itemToEdit.name || "",
        from: itemToEdit.to || "",
        to: itemToEdit.mobile || "",
        pickup: itemToEdit.pickup || "",
        drop: itemToEdit.drop || "",
        date: formatDateForDisplay(itemToEdit.date) || "",
        mobile: itemToEdit.mobile || "",
        seatNumbers: itemToEdit.seatNumber || "",
      

      });
    } else {
      setData({
        ...initialData,
        seatNumbers: inputs.Tablemanuplation.seatnumber || "",
        date: formatDateForDisplay(inputs.Tablemanuplation.date) || "",
      });
    }
  }, [itemToEdit, inputs.Tablemanuplation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "vilage") {
      const firstLetter = value[0]?.toLowerCase();
      if (firstLetter) {
        const filteredSuggestions = villageNames.filter((name) =>
          name.toLowerCase().startsWith(firstLetter)
        );
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  const handleSelect = (suggestion) => {
    setData((prevData) => ({
      ...prevData,
      vilage: suggestion,
    }));
    setSuggestions([]);
    setShowSuggestions(false);
  };
  const handleSubmit = useCallback(async (e) => {
    setLoading(true);
    e.preventDefault();
    const formattedData = {
      ...data,
      date: formatDateForAPI(data.date),
    };

    try {
      const endpoint = itemToEdit
        ? `https://shaktidham-backend.vercel.app/seats/update/${itemToEdit._id}`
        : `https://shaktidham-backend.vercel.app/seats/create/${route}`;
      const method = itemToEdit ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        await response.json();
        navigate("/adminHome");
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Fetch operation error:", error);
    } finally {
      setLoading(false);
    }
  });
  const handleClick = useCallback((event) => {
    // Set suggestions to an empty array on mouse click
    setSuggestions([]);
  }, []);
  // Fetch suggestions from Geoapify API
  useEffect(() => {
    document.addEventListener("click", handleClick);
  }, [handleClick]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="main bg-gray-100 rounded-lg shadow-md p-10 w-96">
        <h1 className="text-green-500 text-3xl mb-6">
          {itemToEdit ? "Edit Booking" : "Add Booking"}
        </h1>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="name"
            className="text-left text-gray-700 font-bold block"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={data.name}
            placeholder="Enter your Name"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />

          <label
            htmlFor="vilage"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            From:
          </label>
          <div className="relative">
            <input
              type="text"
              id="from"
              name="from"
              onChange={handleChange}
              value={data.from}
              placeholder="Enter your Village"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-10 bg-gray-200 border-2 border-gray-500  font-bold border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(suggestion)}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b-2 border-gray-500 "
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <label
            htmlFor="vilage"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            To:
          </label>
          <div className="relative">
            <input
              type="text"
              id="to"
              name="to"
              onChange={handleChange}
              value={data.to}
              placeholder="Enter your Village"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-10 bg-gray-200 border-2 border-gray-500  font-bold border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(suggestion)}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b-2 border-gray-500 "
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <label
            htmlFor="mobile"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            pickup:
          </label>
          <input
            type="text"
            id="pickup"
            name="pickup"
            onChange={handleChange}
            value={data.pickup}
            placeholder="Enter your વધારાની મહિતી"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
          <label
            htmlFor="mobile"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            drop:
          </label>
          <input
            type="text"
            id="drop"
            name="drop"
            onChange={handleChange}
            value={data.drop}
            placeholder="Enter your વધારાની મહિતી"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />

          <label
            htmlFor="mobile"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            Mobile No:
          </label>

          <input
            type="number" // Set input type based on state
            id="mobile"
            name="mobile"
            onChange={handleChange}
            value={data.mobile}
            placeholder="Enter your Mobile Number"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />

          <label
            htmlFor="seatNumber"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            Seat Number:
          </label>
          <input
            type="text"
            id="seatNumber"
            name="seatNumber"
            onChange={handleChange}
            value={data.seatNumbers}
            placeholder="Enter your Seat Number"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
            required
            readOnly
          />

          <label
            htmlFor="date"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            Date:
          </label>
          <input
            type="text"
            id="date"
            name="date"
            onChange={handleChange}
            value={data.date}
            placeholder="Enter your Date (dd/mm/yyyy)"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
            required
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
              {loading ? "Submitting..." : itemToEdit ? "Update" : "Submit"}
            </button>
            <Link to={"/adminHome"}>
              <button
                type="button"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
              >
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
