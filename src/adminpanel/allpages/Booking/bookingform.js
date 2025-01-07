import React, { useEffect, useState } from "react";
import Loader from "../../../userpages/Loader/Loader";
import Sidebar from "../sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { getLabel } from "../../../constvalue/constvalue";

function Bookingform() {
  const [loading, setLoading] = useState(false);
  const [routeData, setRoutedata] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if item is being edited (when data is passed via location.state.item)
  const itemToEdit = location.state?.matchingSeat || null;
  const seatsData = location.state?.passengers;

  const [data, setData] = useState({
    name: itemToEdit?.name || "",
    mobile: itemToEdit?.mobile || "",
    seatNumber: itemToEdit?.seatNumber || "",
    date: itemToEdit?.date || "",
    from: itemToEdit?.from || "",
    to: itemToEdit?.to || "",
    pickup: itemToEdit?.pickup || "",
    drop: itemToEdit?.drop || "",
    gender: itemToEdit?.gender || "",
    price: itemToEdit?.price || "",
    age: itemToEdit?.age || "",
    extradetails: itemToEdit?.extradetails || "",
  });

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [agentSearch, setAgentSearch] = useState("");
  const [filteredFromOptions, setFilteredFromOptions] = useState([]);
  const [filteredToOptions, setFilteredToOptions] = useState([]);
  const [filteredAgentOptions, setFilteredAgentOptions] = useState([]);
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isAgentDropdownOpen, setIsAgentDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
  const [agent, setAgent] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const id = location.state?.id;
    try {
      const response = await fetch(
        `https://shaktidham-backend.vercel.app/route/read?id=${id}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setRoutedata(result.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://shaktidham-backend.vercel.app/agent/agents`);
      if (!response.ok) throw new Error("Failed to fetch agent");
      const data = await response.json();
      setAgent(data.data);
      setFilteredAgentOptions(data.data); // Initially populate the agent dropdown
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAgent();
  }, []);

  useEffect(() => {
    if (location.state && location.state.label) {
      setData((prevData) => ({
        ...prevData,
        seatNumber: String(location.state.label),
        date: location.state.date,
      }));
      setFromSearch(itemToEdit?.from || "");
      setToSearch(itemToEdit?.to || "");
    }
  }, [location.state]);

  useEffect(() => {
    setFilteredFromOptions(
      routeData?.from?.filter((fromVillage) =>
        fromVillage.village.toLowerCase().includes(fromSearch.toLowerCase())
      )
    );
  }, [fromSearch, routeData]);

  useEffect(() => {
    setFilteredToOptions(
      routeData?.to?.filter((toVillage) =>
        toVillage.village.toLowerCase().includes(toSearch.toLowerCase())
      )
    );
  }, [toSearch, routeData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = routeData?._id;
    const formattedData = { ...data, date: data.date };
    const routeid = itemToEdit?.route || routeData._id;
    try {
      setLoading(true);

      const response = await fetch(
        itemToEdit
          ? `https://shaktidham-backend.vercel.app/seats/update/${itemToEdit.id}?id=${itemToEdit.route}`
          : `https://shaktidham-backend.vercel.app/seats/create/${id}`,
        {
          method: itemToEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );
   
      if (response.ok) {
        navigate("/Bookingpage", { state: { id, date: data.date,route:routeid } });
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Fetch operation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFromDropdown = () => setIsFromDropdownOpen(!isFromDropdownOpen);
  const toggleToDropdown = () => setIsToDropdownOpen(!isToDropdownOpen);
  const toggleAgentDropdown = () =>
    setIsAgentDropdownOpen(!isAgentDropdownOpen);
// Handle agent name search (both typing and selecting from dropdown)
const handleAgentSearch = (e) => {
  const searchTerm = e.target.value;
  setAgentSearch(searchTerm); // Update the search term

  // Update the data.name to whatever the user types
  setData((prevData) => ({ ...prevData, name: searchTerm }));

  // Filter agent list based on search term
  setFilteredAgentOptions(
    agent.filter((agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

// Handle selection of agent from dropdown
const handleAgentSelection = (agentName) => {
  setAgentSearch(agentName); // Set the search term to the selected agent name
  setData((prevData) => ({ ...prevData, name: agentName })); // Update the form data with selected agent
  setIsAgentDropdownOpen(false); // Close dropdown after selection
};


  const handleFromSelection = (village) => {
    setFromSearch(village);
    setData((prevData) => ({ ...prevData, from: village }));
    setIsFromDropdownOpen(false);
  };

  const handleToSelection = (village) => {
    setToSearch(village);
    setData((prevData) => ({ ...prevData, to: village }));
    setIsToDropdownOpen(false);
  };

  const handleSeatNumberChange = (e) => {
    const seat = e.target.value;

    setData((prevData) => {
      let updatedSeats = Array.isArray(prevData.seatNumber)
        ? [...prevData.seatNumber]
        : [prevData.seatNumber];

      if (e.target.checked) {
        if (!updatedSeats.includes(seat)) {
          updatedSeats.push(seat);
        }
      } else {
        updatedSeats = updatedSeats.filter((seatNumber) => seatNumber !== seat);
      }

      return {
        ...prevData,
        seatNumber: updatedSeats,
      };
    });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row h-screen bg-[#ECF0F5]">
          <Sidebar className="w-full md:w-1/6 bg-white shadow-lg" />
          <div className="flex-1 p-4 ml-64">
            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
            <div className="flex justify-end w-full">
              {" "}
              {/* Use justify-end and set width to full */}
              <div
                className="bg-red-600 hover:bg-red-300 text-white px-4 py-2 rounded shadow-md transition-all duration-300"
                onClick={() => navigate("/Bookingpage")}
              >
                Back
              </div>
            </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium"
                    >
                      Name
                    </label>
                    <div className="relative">
                    <input
                      id="name"
                      type="text"
                      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={agentSearch}
                      onChange={handleAgentSearch} // Updated to handle search input
                      onClick={toggleAgentDropdown} // Keep the toggle functionality
                    />
                    {isAgentDropdownOpen && filteredAgentOptions.length > 0 && (
                        <ul className="absolute left-0 right-0 bg-white font-bold text-black border border-gray-300 mt-1 max-h-60 overflow-y-auto z-10">
                        {filteredAgentOptions.map((agent) => (
                          <li
                            key={agent.name}
                            onClick={() => handleAgentSelection(agent.name)}
                            className="px-4 py-2 cursor-pointer border border-bottom border-black hover:bg-blue-400"
                          >
                            {agent.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div></div>

                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-gray-700 font-medium"
                    >
                      Mobile
                    </label>
                    <input
                      id="mobile"
                      type="number"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.mobile}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="seatNumber"
                      className="block text-gray-700 font-medium"
                    >
                      Seat Number
                    </label>
                    <input
                      id="seatNumber"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.seatNumber}
                      onChange={handleSeatNumberChange}
                    />
                  </div>

                  <div>
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
                      value={data.date}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>

                  {/* From Village Search */}
                  <div>
                    <label
                      htmlFor="from"
                      className="block text-gray-700 font-medium"
                    >
                      From
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for Village"
                        value={fromSearch} // Use fallback value when no `fromSearch` or `itemToEdit?.from`
                        onChange={(e) => setFromSearch(e.target.value)}
                        onClick={toggleFromDropdown}
                        required
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {isFromDropdownOpen && (
                        <ul className="absolute left-0 right-0 bg-white font-bold text-black border border-gray-300 mt-1 max-h-60 overflow-y-auto z-10">
                          {filteredFromOptions?.map((fromVillage) => (
                            <li
                              key={fromVillage.village}
                              onClick={() =>
                                handleFromSelection(fromVillage?.village)
                              }
                              className="px-4 py-2 cursor-pointer border border-bottom border-black hover:bg-blue-400"
                            >
                              {fromVillage?.village}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* To Village Search */}
                  <div>
                    <label
                      htmlFor="to"
                      className="block text-gray-700 font-medium"
                    >
                      To
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for Village"
                        value={toSearch}
                        onChange={(e) => setToSearch(e.target.value)}
                        onClick={toggleToDropdown}
                        required
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {isToDropdownOpen && (
                        <ul className="absolute left-0 right-0 bg-white text-black text-center font-bold  border border-gray-300 mt-1 max-h-60 overflow-y-auto z-10">
                          {filteredToOptions.map((toVillage) => (
                            <li
                              key={toVillage.village}
                              onClick={() =>
                                handleToSelection(toVillage.village)
                              }
                              className="px-4 py-2 cursor-pointer border border-bottom border-black hover:bg-blue-400"
                            >
                              {toVillage.village}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Pickup and Drop Locations */}
                  <div>
                    <label
                      htmlFor="pickup"
                      className="block text-gray-700 font-medium"
                    >
                      Pickup Location
                    </label>
                    <select
                      id="pickup"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.pickup}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Pickup Location</option>
                      {routeData?.from?.map(
                        (fromVillage) =>
                          fromVillage.village === data.from &&
                          fromVillage.point?.map((point) => (
                            <option
                              key={point.pointName}
                              value={point.pointName}
                            >
                              {point.pointName}
                            </option>
                          ))
                      )}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="drop"
                      className="block text-gray-700 font-medium"
                    >
                      Drop Location
                    </label>
                    <select
                      id="drop"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.drop}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Drop Location</option>
                      {routeData?.to?.map(
                        (toVillage) =>
                          toVillage.village === data.to &&
                          toVillage.point?.map((point) => (
                            <option
                              key={point.pointName}
                              value={point.pointName}
                            >
                              {point.pointName}
                            </option>
                          ))
                      )}
                    </select>
                  </div>

                  {/* Additional Fields */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-gray-700 font-medium"
                    >
                      Gender
                    </label>
                    <input
                      id="gender"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.gender}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="block text-gray-700 font-medium"
                    >
                      Price
                    </label>
                    <input
                      id="price"
                      type="number"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.price}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="age"
                      className="block text-gray-700 font-medium"
                    >
                      Age
                    </label>
                    <input
                      id="age"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.age}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="extradetails"
                      className="block text-gray-700 font-medium"
                    >
                      Extra Details
                    </label>
                    <input
                      id="extradetails"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.extradetails}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  {!itemToEdit && (
                    <>
                      <label
                        htmlFor="otherseatNumber"
                        className="text-left text-gray-700 font-bold block mt-4"
                      >
                        Other Seat Numbers:
                      </label>
                      <div
                        className="space-y-2 border-2 border-gray-800 p-2"
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        {getLabel.map((seat, index) => {
                          // Check if the seat already exists in seatsData
                          const itemExists = seatsData?.some(
                            (item) => item.seatNumber === seat // Ensure seatNumbers matches
                          );

                          // If the seat exists in seatsData, skip rendering this seat
                          if (itemExists) {
                            return null;
                          }

                          return (
                            <div
                              key={index}
                              className="flex items-center border-b border-gray-800"
                            >
                              <input
                                type="checkbox"
                                id={`seat-${seat}`}
                                value={seat}
                                checked={
                                  data?.seatNumber?.includes(seat) || false
                                } // Safe check for data and seatNumbers
                                onChange={handleSeatNumberChange}
                                className="mr-2"
                              />
                              <label
                                htmlFor={`seat-${seat}`}
                                className="text-gray-700"
                              >
                                {seat}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingform;
