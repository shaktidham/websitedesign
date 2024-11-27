import React, { useState, useRef } from 'react';
import Loader from '../../../userpages/Loader/Loader';
import Sidebar from '../sidebar';
import { ReactComponent as Action } from "./../../../svg/action.svg"; // Assuming you have this component for the action icon
import { ReactComponent as Uparrow } from "./../../../svg/uparrow.svg"; // Assuming you have this component for the arrow icon

function Bookingpage({ loading }) {
  const [selectedRow, setSelectedRow] = useState(null); // Track the selected row
  const [tooltipId, setTooltipId] = useState(null); // Track which tooltip is shown
  const tooltipRef = useRef(null); // For positioning the tooltip if needed
  const buttonRefs = useRef([]); // Store references for the buttons if necessary

  const getLabel = (index) => {
    const alphabet = "ABCDEFGHIJKL";
    if (index < 12) {
      return alphabet[index];
    } else if (index < 24) {
      const pairIndex = index - 12;
      const firstNumber = pairIndex * 2 + 1;
      const secondNumber = firstNumber + 1;
      return `${firstNumber},${secondNumber}`;
    } else {
      const kabinIndex = index - 24 + 1; // starting from 1
      return `કેબિન-${kabinIndex}`;
    }
  };

  const tableData = Array.from({ length: 30 }, (_, index) => getLabel(index)); // Ensure that `loading` is passed as a prop

  const handleClicktd = (index) => {
    setTooltipId(tooltipId === index ? null : index); // Toggle the tooltip visibility
    setSelectedRow(index); // Set the row index for the clicked button
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {loading ? (
        <Loader /> // Display loading component when data is being fetched
      ) : (
        <div className="flex flex-col md:flex-row h-screen">
          {/* Sidebar */}
          <div className="w-full md:w-1/6 bg-white shadow-lg">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 overflow-auto">
            <div className='flex justify-between items-center my-5'>
              <button
                className="bg-red-600 hover:bg-red-300 text-white px-4 py-2 rounded shadow-md transition-all duration-300"
              >
                Back
              </button>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Chital</h2>
              <button
                className="bg-red-600 hover:bg-red-300 text-white px-4 py-2 rounded shadow-md transition-all duration-300"
              >
                Download
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-white shadow-md rounded-lg">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">NUMBER</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">VILLAGE</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">NAME</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">NUMBER</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">EXTRA</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">PICKUP</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((label, index) => (
                    <tr key={index} className="border-t hover:bg-gray-100">
                      <td className="px-6 py-4 text-xl border border-2 font-bold text-gray-700 text-center">{label}</td>
                      <td className="px-6 py-4 text-sm border border-2 text-gray-700">DEVALIYA</td>
                      <td className="px-6 py-4 text-sm border border-2 text-gray-700">MIKESHBHAI</td>
                      <td className="px-6 py-4 text-sm border border-2 text-gray-700">8141814190</td>
                      <td className="px-6 py-4 text-sm border border-2 text-gray-700">500 levana</td>
                      <td className="px-6 py-4 text-sm border border-2 text-gray-700">PARKING</td>
                      <td className="relative border border-2">
                        <button
                          className="ml-4 hover:text-blue-900"
                          onClick={() => handleClicktd(index)} // Pass current index to handle click
                          ref={(el) => (buttonRefs.current[index] = el)}
                        >
                          <div className="flex justify-center">
                            <Action className="w-6 h-6 text-blue-500" />
                          </div>
                        </button>

                        {tooltipId === index && (
                          <div
                            role="tooltip"
                            className="absolute shadow-lg bg-blue-400 z-10 border rounded p-2 w-fit"
                            style={{
                              top: "100%",
                              left: "50%",
                              transform: "translateX(-50%)",
                            }}
                            ref={tooltipRef}
                          >
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                              <Uparrow className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="flex flex-col">
                              <ul className="space-y-2">
                                <li className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold border-2 border-white">
                                  {label ? "Edit" : "Add"}
                                </li>
                                <li className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold border-2 border-white">
                                  Delete
                                </li>
                                <li className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold border-2 border-white">
                                  Send
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingpage;
