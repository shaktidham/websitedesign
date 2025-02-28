import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar";
import Cookies from "js-cookie";
import Loader from "../../../userpages/Loader/Loader";
import { ReactComponent as Edit } from "./../../../svg/edit.svg";
import { ReactComponent as Delete } from "./../../../svg/delete.svg";
import Agentadd from "./agentadd";

function Agentshow() {
  const [popup, setPopup] = useState(false);
  const [agent, setAgent] = useState([]); // State to store the agent data
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to store any errors
  const [itemToEdit, setItemToEdit] = useState(null); // State to store the agent being edited
  const token = Cookies.get("authToken");
  // Fetch agent data
  const fetchAgent = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://shaktidham-backend.vercel.app/agent/agents`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header with Bearer token
            "Content-Type": "application/json", // Ensure the request content is interpreted as JSON
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch agent");
      }
      const data = await response.json();
      setAgent(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle agent deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this agent?"
    );
    if (!confirmDelete) return;
    setLoading(true);

    try {
      // Make the delete API call
      const response = await fetch(
        `https://shaktidham-backend.vercel.app/agent/agents/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Authorization header with Bearer token
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the agent");
      }

      fetchAgent(); // Refresh agent list after deletion
    } catch (error) {
      setError(error.message); // Set error message if the API call fails
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (id) => {
    const item = agent.find((item) => item._id === id);
    setItemToEdit(item); // Set the selected agent as the item to be edited
    setPopup(true); // Open the add popup (this could be modified to show an "edit" form)
  };

  useEffect(() => {
    fetchAgent();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader /> // Display loading spinner when data is being fetched
      ) : (
        <div className="flex flex-col md:flex-row h-screen bg-[#ECF0F5]">
          {/* Sidebar */}
          <Sidebar className="w-full md:w-1/6 bg-white shadow-lg" />

          {/* Main Content */}
          <div className="flex-1 p-4 ">
            <div className="flex justify-end w-full">
              {" "}
              {/* Use justify-end and set width to full */}
              <div
                className="bg-red-600 hover:bg-red-300 text-white px-4 py-2 rounded shadow-md transition-all duration-300"
                onClick={() => setPopup(true)}
              >
                Add
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-10 h-[500px]">
              <table className="min-w-full table-auto bg-white mx-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border bg-gray-200 border-gray-400 text-center text-left">
                      Agent
                    </th>
                    <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/12">
                      Edit
                    </th>
                    <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/12">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agent.map((agent) => (
                    <tr key={agent._id}>
                      <td className="px-4 py-2 border border-gray-400 text-center">
                        {agent.name}
                      </td>
                      <td className="px-4 py-2 border border-gray-400">
                        <button
                          className="text-blue-600 hover:text-blue-800 cursor-pointer "
                          onClick={() => handleEditClick(agent._id)}
                        >
                          <Edit fill="red" className="h-6 w-6 mx-auto" />
                        </button>
                      </td>
                      <td
                        className="px-4 py-2 border border-gray-400 text-center cursor-pointer"
                        onClick={() => handleDelete(agent._id)}
                      >
                        <Delete fill="red" className="h-6 w-6 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <Agentadd
        popup={popup}
        setPopup={setPopup}
        itemToEdit={itemToEdit}
        fetchAgent={fetchAgent}
        setItemToEdit={setItemToEdit}
      />
    </div>
  );
}

export default Agentshow;
