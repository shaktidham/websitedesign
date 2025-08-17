import React, { useState, useEffect, useCallback } from "react";
import Loader from "../../../userpages/Loader/Loader";
import Sidebar from "../sidebar";
import Pickuppoint from "./Pickuppoint";
import Droppoint from "./droppoint";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { modotime, ponasat,ponaeight, velotime } from "../../../constvalue/constvalue";

function Busadd() {
  const [loading, setLoading] = useState(false);
  const [villages, setVillages] = useState([]);
  const Navigate = useNavigate();
  const [data, setData] = useState({
    Busname: "",
    from: [],
    to: [],
    fromtime: "",
    totime: "",
    date: "",
    enddate: "",
    price: "",
    first: "",
    last: "",
    location: "",
    driver: "",
    cabinprice: "",
    phonenumber: "",
  });

  const token = Cookies.get("authToken");
  const [selectedCode, setSelectedCode] = useState("");
  const location = useLocation(); // Access location state (itemToEdit)
  const { itemToEdit } = location.state || {};
  const { password } = location.state || {};
  const [isOther, setIsOther] = useState(false);
  // Fetch villages data
  const fetchVillages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://shaktidham-backend.vercel.app/village/read`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header with Bearer token
            "Content-Type": "application/json", // Ensure the request content is interpreted as JSON
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch villages");
      }
      const data = await response.json();

      setVillages(data.data); // Assuming the data comes in data.data
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVillages();
  }, []);
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    let datas = "";
    if (selectedValue === "velotime") {
      datas = velotime;
    } else if (selectedValue === "modotime") {
      datas = modotime;
    }
    else if (selectedValue === "ponasat") {
      datas = ponasat;
    }
    else if (selectedValue === "ponaeight") {
      datas = ponaeight;
    }
    setData((prevState) => ({
      ...prevState,
      from: datas,
    }));
  };

  useEffect(() => {
    fetchVillages();
    // If we are editing an existing bus, set the form state with itemToEdit
    if (itemToEdit) {
      const formattedDate = new Date(itemToEdit.date).toLocaleDateString(
        "en-CA"
      );
      const formattedendDate = new Date(itemToEdit.enddate).toLocaleDateString(
        "en-CA"
      );

      setData({
        Busname: itemToEdit.Busname,
        first: itemToEdit.first,
        last: itemToEdit.last,
        fromtime: itemToEdit.fromtime,
        totime: itemToEdit.totime,
        date: formattedDate,
        enddate: formattedendDate,
        price: itemToEdit.price,
        from: itemToEdit.from, // Added from
        to: itemToEdit.to,
        location: itemToEdit.location,
        driver: itemToEdit.driver,
        phonenumber: itemToEdit.phonenumber,
        cabinprice: itemToEdit.cabinprice,
        code: itemToEdit.code,
      });
    }
  }, [itemToEdit]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const url =
          itemToEdit && selectedCode
            ? `https://shaktidham-backend.vercel.app/route/update?codes=${itemToEdit.code}`
            : itemToEdit
            ? `https://shaktidham-backend.vercel.app/route/update?id=${itemToEdit._id}`
            : "https://shaktidham-backend.vercel.app/route/create"; // Use POST for create

        const method = itemToEdit ? "PUT" : "POST"; // POST for create, PUT forpdate

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Authorization header with Bearer token
          },
          body: JSON.stringify(data),
        });

        const datas = await response.json();
        if (response.ok) {
          Navigate("/Bus", { state: { date: data.date } });
        } else {
          alert("Error adding village: " + datas.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error sending data to server.");
      } finally {
        setLoading(false);
      }
    },
    [data, itemToEdit, Navigate, selectedCode]
  );

  const handleBusNameChange = (e) => {
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      Busname: value,
    }));

    if (value === "OTHER") {
      setIsOther(true);
    } else {
      setIsOther(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-1 bg-[#ECF0F5]">
          <Sidebar className="w-full md:w-1/6 bg-white shadow-lg" />

          {/* Main Content */}
          <div className="flex-1 p-6 sm:p-8 bg-white rounded-lg shadow-lg ">
            <div className="flex justify-between mb-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Add Bus
              </h2>
              <button
                className="bg-red-600 hover:bg-red-300 text-white px-4 py-2 rounded shadow-md transition-all duration-300"
                onClick={() => Navigate("/Bus")}
              >
                Back
              </button>
            </div>
            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
              <form className="space-y-6">
                {/* Inputs Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Date */}
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
                      placeholder="Enter Date"
                      value={data.date}
                      required
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, date: e.target.value }))
                      }
                    />
                  </div>

                  {/* Bus Name */}
                  <div>
                    <label
                      htmlFor="Busname"
                      className="block text-gray-700 font-medium"
                    >
                      Bus Name
                    </label>
                    <select
                      id="Busname"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.Busname}
                      onChange={handleBusNameChange}
                    >
                      <option value="">Select Bus Name</option>
                      <option value="GJ-05-BZ-0999">GJ-05-BZ-0999</option>
                      <option value="GJ-05-BZ-9999">GJ-05-BZ-9999</option>
                      <option value="GJ-05-CW-9027">GJ-05-CW-9027</option>
                      <option value="GJ-05-CW-9927">GJ-05-CW-9927</option>
                      <option value="GJ-14-Z-9090">GJ-14-Z-9090</option>
                      <option value="GJ-14-Z-9009">GJ-14-Z-9009</option>
                      <option value="GJ-05-CY-9045">GJ-05-CY-9045</option>
                      <option value="GJ-05-CY-9054">GJ-05-CY-9054</option>
                      <option value="GJ-05-CU-9081">GJ-05-CY-9081</option>
                      <option value="GJ-05-CU-9018">GJ-05-CY-9018</option>
                      <option value="OTHER">Other</option>
                    </select>
                    {isOther && (
                      <input
                        type="text"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Bus Name"
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            Busname: e.target.value,
                          }))
                        }
                      />
                    )}
                  </div>

                  {/* From Location */}
                  <div>
                    <label
                      htmlFor="from"
                      className="block text-gray-700 font-medium"
                    >
                      From
                    </label>
                    <input
                      id="from"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Starting Locations"
                      value={data.first}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, first: e.target.value }))
                      }
                    />
                  </div>

                  {/* From Time */}
                  <div>
                    <label
                      htmlFor="fromtime"
                      className="block text-gray-700 font-medium"
                    >
                      From Time
                    </label>
                    <input
                      id="fromtime"
                      type="time"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Starting Locations time"
                      value={data.fromtime}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          fromtime: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* To Location */}
                  <div>
                    <label
                      htmlFor="to"
                      className="block text-gray-700 font-medium"
                    >
                      To
                    </label>
                    <input
                      id="to"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Destination"
                      value={data.last}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, last: e.target.value }))
                      }
                    />
                  </div>

                  {/* To Time */}
                  <div>
                    <label
                      htmlFor="totime"
                      className="block text-gray-700 font-medium"
                    >
                      To Time
                    </label>
                    <input
                      id="totime"
                      type="time"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Destination Time"
                      value={data.totime}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, totime: e.target.value }))
                      }
                    />
                  </div>

                  {/* Price */}
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
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, price: e.target.value }))
                      }
                    />
                  </div>

                  {/* Cabin Price */}
                  <div>
                    <label
                      htmlFor="cabinprice"
                      className="block text-gray-700 font-medium"
                    >
                      Cabin Price
                    </label>
                    <input
                      id="cabinprice"
                      type="number"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.cabinprice}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          cabinprice: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Driver */}
                  <div>
                    <label
                      htmlFor="driver"
                      className="block text-gray-700 font-medium"
                    >
                      Driver
                    </label>
                    <input
                      id="driver"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.driver}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, driver: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone number"
                      className="block text-gray-700 font-medium"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phonenumber"
                      type="number"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.phonenumber}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          phonenumber: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-gray-700 font-medium"
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.location}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                    />
                  </div>
                  {password === "1681" && (
                    <div>
                      <label
                        htmlFor="Edit"
                        className="block text-gray-700 font-medium"
                      >
                        Edit
                      </label>
                      <select
                        id="edit"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedCode}
                        onChange={(e) => setSelectedCode(e.target.value)}
                      >
                        <option value="">Select Value</option>
                        <option value="">Only this</option>
                        <option value="all">All</option>
                      </select>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="pickuptime"
                      className="block text-gray-700 font-medium"
                    >
                      pickuptime
                    </label>
                    <select
                      id="pickuptime"
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleSelectChange}
                    >
                      {" "}
                      <option value="">timeselect</option>
                      <option value="ponasat">પોણાસાત(6:45) </option>
                      <option value="velotime">સાડાસાત(7:00)</option>
                      <option value="ponaeight">પોણઆઠ(7:45) </option>
                      <option value="modotime">સાડાનવ(9:30)</option>
                   
                    </select>
                  </div>
                  {/* End Date */}
                  {!itemToEdit && (
                    <div>
                      <label
                        htmlFor="enddate"
                        className="block text-gray-700 font-medium"
                      >
                        End Date
                      </label>
                      <input
                        id="enddate"
                        type="date"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Enddate"
                        value={data.enddate}
                        required={!itemToEdit}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            enddate: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}
                </div>
              </form>
              {password === "1681" && (
                <div className="flex flex-col sm:flex-row sm:space-x-6 mt-6">
                  <div className="flex-1">
                    <h1 className="text-center text-red-800 font-bold mb-5">
                      PICKUP POINT
                    </h1>
                    <Pickuppoint
                      villages={villages}
                      setData={setData}
                      itemToEdit={itemToEdit}
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-center text-red-800 font-bold mb-5">
                      DROP POINT
                    </h1>
                    <Droppoint
                      villages={villages}
                      setData={setData}
                      itemToEdit={itemToEdit}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Bus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Busadd;
