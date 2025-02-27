import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Swap } from "./../../svg/swap.svg";
import {
  setBooked,
  setLoading,
  setSearchData,
  setShowAllRoute,
} from "../../Redux/userside";

function Form() {
  const [formData, setFormData] = useState({
    from: "",
    date: "",
    to: "",
  });
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [village, setVillages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const api = "http://localhost:3001/route/searchbyvillage";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Filter suggestions based on input
    if (name === "from") {
      // Ensure village is an array
      const filteredSuggestionsFrom = village
        .map((item) => item.village) // Access 'village' property from each object
        .filter((villageItem) =>
          villageItem.toLowerCase().includes(value.toLowerCase())
        );

      setSuggestionsFrom(filteredSuggestionsFrom);
    } else if (name === "to") {
      // Ensure village is an array
      const filteredSuggestionsTo = village
        .map((item) => item.village) // Access 'village' property from each object
        .filter((villageItem) =>
          villageItem.toLowerCase().includes(value.toLowerCase())
        );

      setSuggestionsTo(filteredSuggestionsTo);
    }
  };

  const handleSuggestionSelect = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "from") setSuggestionsFrom([]);
    if (name === "to") setSuggestionsTo([]);
  };

  const swapLocations = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      from: prevFormData.to,
      to: prevFormData.from,
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(setLoading(true));

      // Validation: Check if from and to are valid villages
      if (!formData.from || !formData.to) {
        alert("Please select valid villages for 'From' and 'To'.");
        dispatch(setLoading(false));
        return;
      }

      try {
        const response = await fetch(
          `${api}?date=${formData.date}&from=${formData.from}&to=${formData.to}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        // Pass both formData and result to the AvailableRoutes page
        navigate("/AvailableRoutes", { state: { formData, result } });

        // Clear the form data
        setFormData({
          from: "",
          date: "",
          to: "",
        });
      } catch (error) {
        console.error("Fetch operation error:", error);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [api, formData, navigate, dispatch]
  );
  const fetchVillages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/village/read`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch villages");
      }
      const data = await response.json();
      setVillages(data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchVillages();
  }, []);
  return (
    <div className="relative w-full max-w-md mx-auto mt-6 md:mt-0 md:w-1/4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-800">Bus Booking</h1>

        <div className="relative">
          <input
            type="text"
            name="from"
            placeholder="From"
            value={formData.from}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {suggestionsFrom.length > 0 && (
            <ul className="absolute z-10 w-full bg-gray-800 border border-gray-600 rounded-md mt-1 overflow-y-auto max-h-64">
              {suggestionsFrom.map((village) => (
                <li
                  key={village}
                  onClick={() => handleSuggestionSelect("from", village)}
                  className="p-2 cursor-pointer text-white hover:bg-gray-700"
                >
                  {village}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            name="to"
            placeholder="To"
            value={formData.to}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {suggestionsTo.length > 0 && (
            <ul className="absolute z-10 w-full bg-gray-800 border border-gray-600 rounded-md mt-1">
              {suggestionsTo.map((village) => (
                <li
                  key={village}
                  onClick={() => handleSuggestionSelect("to", village)}
                  className="p-2 cursor-pointer text-white hover:bg-gray-700 border-b-2 border-b-white"
                >
                  {village}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          type="button"
          onClick={swapLocations}
          className="absolute top-20 right-4 p-2 bg-gray-800 text-black rounded-full hover:bg-gray-400 transition"
        >
          <Swap fill="white" className="h-8 w-8 rotate-90 " />
        </button>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Search Bus
        </button>
      </form>
    </div>
  );
}

export default Form;
