import React, { useState } from 'react';
import Sidebar from './sidebar';
import { setRouteadd } from '../../Redux/userside';
import { useDispatch, useSelector } from 'react-redux';
import Routeadd from './routeadd';

function RouteShow() {
  const [data, setData] = useState(null);
  const inputs = useSelector((state) => state.inputs);
  const api = "https://shaktidham-backend.vercel.app/route/searchbyvillage";
  const dispatch = useDispatch();
  // Handle date change
  const handleDateChange = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const date = e.target.value; // Get the selected date

    try {
      const response = await fetch(`${api}?Date=${date}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result); // Set the data from the response
    } catch (error) {
      console.error("Fetch operation error:", error);
    }
  };
  const OpenBox = () => {
    dispatch(setRouteadd(!inputs.Tablemanuplation?.routeadd));
  };
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          {/* Right Side - Date Select Options */}
          <div className="flex items-center space-x-4">
            <label htmlFor="endDate" className="text-gray-700">Date:</label>
            <input
              type="date"
              id="endDate"
              onChange={handleDateChange} // Update state on change
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition" onClick={OpenBox}>
            Add
          </button>
        </div>

        {/* Additional Content or Sections (Optional) */}
        <div className="flex-grow bg-white rounded shadow p-4">
          {/* Check if data is available */}
          {data && Array.isArray(data) ? (
            data.map((item, index) => (
              <table key={index} className="min-w-full divide-y divide-gray-200 bg-white border border-gray-200 rounded-lg shadow-md mb-4">
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                   
                    { label: 'Bus Route', value: item.route || 'N/A' },
                    { label: 'from', value: item.from || 'N/A' },
                    { label: 'to', value: item.to || 'N/A' },
                    { label: 'Date', value: item.date || '5:00' },
                    { label: 'Price', value: item.price || '600' },
                  ].map(({ label, value }) => (
                    <tr key={label} className="flex flex-col md:flex-row md:items-center">
                      <th className="pl-2 py-3 text-xl font-medium text-blue-500 font-bold uppercase tracking-wider text-left md:w-1/3">
                        {label}
                      </th>
                      <td className="pl-2 py-4 whitespace-nowrap text-lg font-bold text-gray-900 text-left md:w-2/3">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))
          ) : (
            <p className="text-gray-600">No data available. Please select a date.</p>
          )}
        </div>
      </div>
      <Routeadd />
    </div>
  );
}

export default RouteShow;
