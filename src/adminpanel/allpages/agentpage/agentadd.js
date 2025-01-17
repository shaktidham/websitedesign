import React, { useState, useEffect } from "react";
import { ReactComponent as CloseButton } from "./../../../svg/close.svg";
import Cookies from "js-cookie";
function Agentadd({ popup, setPopup, itemToEdit, fetchAgent, setItemToEdit }) {
  // State for the name input
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To manage error state
  const token = Cookies.get("authToken");
  // Set the name if editing an agent
  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
    } else {
      setName("");
    }
  }, [itemToEdit]);

  // Helper function to make the API request
  const handleApiRequest = async (method, url, body, headers = {}) => {
    try {
      // Merge provided headers with the default 'Content-Type' header
      const finalHeaders = {
        "Content-Type": "application/json",
        ...headers, // This will ensure that Authorization header is included if passed
      };

      const response = await fetch(url, {
        method,
        headers: finalHeaders,
        body: JSON.stringify(body), // Ensure body is only passed if necessary
      });

      if (!response.ok) throw new Error("Failed to save agent");
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Handle input change for name
  const handleNameChange = (e) => setName(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Ensure token is available
      if (!token) {
        throw new Error("Token is missing");
      }

      const url = itemToEdit
        ? `https://shaktidham-backend.vercel.app/agent/agents/${itemToEdit._id}`
        : "https://shaktidham-backend.vercel.app/agent/agents";
      const method = itemToEdit ? "PUT" : "POST";
      const body = { name }; // Make sure `name` is defined
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ensure the Authorization token is set properly
      };

      const data = await handleApiRequest(method, url, body, headers);

      setPopup(false); // Close the popup after successful submission
      fetchAgent(); // Refresh the agent list
    } catch (err) {
      console.error("Error during submission:", err); // Log the error
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
      setItemToEdit(null); // Reset the item to edit state
    }
  };

  return (
    popup && (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg mx-4 overflow-y-auto">
          <div className="cursor-pointer" onClick={() => setPopup(false)}>
            <CloseButton fill="black" className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold text-center mb-4">
            {itemToEdit ? "Edit Agent" : "Enter Name"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="Name"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter the agent's name"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? "Submitting..." : itemToEdit ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default Agentadd;
