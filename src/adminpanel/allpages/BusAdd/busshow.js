
import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar";
import Loader from "../../../userpages/Loader/Loader";
import { ReactComponent as Edit } from "./../../../svg/edit.svg";
import { ReactComponent as Delete } from "./../../../svg/delete.svg";
import { ReactComponent as Show } from "./../../../svg/eyes.svg";
import { Link, useNavigate } from "react-router-dom";
import Pointshow from "./pointshow";
import Password from "./password";
import Cookies from "js-cookie";

function Busshow() {
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(false);
  const [popuppassword, setPopuppassword] = useState(true);
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const [itemToEdit, setItemToEdit] = useState(null);
  const right = "1681";
  const token = Cookies.get("authToken");

  const [filter, setFilter] = useState({
    search: "",
    limit: 10,
    page: 1,
    order: "asc",
  });

  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchroute();
  }, [filter]);

  const fetchroute = async () => {
    setLoading(true);

    try {
      const dateParam = filter.search ? `?date=${filter.search}` : "";

      const response = await fetch(
        `https://shaktidham-backend.vercel.app/route/read${dateParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch route");
      }

      const data = await response.json();
      setRoute(data.data);
      setTotalEntries(data.totalEntries);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this village?"
    );
    if (!confirmDelete) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://shaktidham-backend.vercel.app/route/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the route");
      }

      fetchroute();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (id) => {
    const item = route.find((item) => item._id === id);
    Navigate("/BusAdd", { state: { itemToEdit: item, password: password } });
  };

  const handlePopup = (id) => {
    setPopup(true);
    const item = route.find((item) => item._id === id);
    setItemToEdit(item);
  };

  const updateFilter = (newFilter) => {
    setFilter((prevFilter) => ({ ...prevFilter, ...newFilter }));
  };

  const totalPages = Math.ceil(totalEntries / filter.limit);

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    updateFilter({ page: newPage });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row h-screen bg-[#ECF0F5]">
          <Sidebar className="w-full md:w-1/6 bg-white shadow-lg" />
          <div className="flex-1 p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="flex items-center mb-4">
                <input
                  type="date"
                  className="border px-4 py-2 rounded mr-4 w-full md:w-auto"
                  placeholder="Search village"
                  value={filter.search}
                  onChange={(e) => updateFilter({ search: e.target.value })}
                />
              </div>
              {right === password && (
                <div>
                  <button
                    className="bg-red-600 hover:bg-red-300 text-white px-4 py-2 rounded shadow-md transition-all duration-300"
                    onClick={() =>
                      Navigate("/BusAdd", { state: { password: password } })
                    }
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full mt-10 table-auto bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/12">
                      Date
                    </th>
                    <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-3/5">
                      Route
                    </th>
                    <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-3/5">
                      BusName
                    </th>
                    <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-3/5">
                      Price
                    </th>
                    <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-3/5">
                      Point
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
                  {route.map((village) => (
                    <tr key={village._id}>
                      <td className="px-4 py-2 border border-gray-400 text-center">
                        {new Date(village.date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-4 py-2 border border-gray-400">
                        {village.first} to {village.last}
                      </td>
                      <td className="px-4 py-2 border border-gray-400">
                        {village.Busname}
                      </td>
                      <td className="px-4 py-2 border border-gray-400">
                        {village.price}
                      </td>
                      <td
                        className="px-4 py-2 border border-gray-400 text-center cursor-pointer"
                        onClick={() => handlePopup(village._id)}
                      >
                        <Show fill="red" className="h-6 w-6 mx-auto" />
                      </td>
                      <td
                        className="px-4 py-2 border border-gray-400 text-center cursor-pointer"
                        onClick={() => handleEditClick(village._id)}
                      >
                        <Edit fill="red" className="h-6 w-6 mx-auto" />
                      </td>
                      {right === password && (
                        <td
                          className="px-4 py-2 border border-gray-400 text-center cursor-pointer"
                          onClick={() => handleDelete(village._id)}
                        >
                          <Delete fill="red" className="h-6 w-6 mx-auto" />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handlePagination(filter.page - 1)}
                disabled={filter.page === 1}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Previous
              </button>
              <div className="flex items-center space-x-2 mx-4">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePagination(index + 1)}
                    className={`px-4 py-2 rounded ${
                      filter.page === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handlePagination(filter.page + 1)}
                disabled={filter.page === totalPages}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      <Pointshow popup={popup} setPopup={setPopup} itemToEdit={itemToEdit} />
      <Password
        setPassword={setPassword}
        setPopuppassword={setPopuppassword}
        popuppassword={popuppassword}
      />
    </div>
  );
}

export default Busshow;
