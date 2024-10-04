import React from "react";
import Header from "../../header";
import Footer from "../footer";
import { useLocation } from "react-router-dom";

function SuccessMsg() {
  const location = useLocation();
  const { bookeddata } = location.state || {};
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex bookeddatas-center justify-center text-center p-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Your ticket has been booked{" "}
            <span className="text-green-500">successfully</span>!
          </h1>
          <div>
            {bookeddata.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <tbody>
                    <>
                      <tr>
                        <th className="border border-gray-300">BUSNAME</th>
                        <td className="border border-gray-300 text-left">
                          Shaktidham Travels
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300">NAME</th>
                        <td className="border border-gray-300 text-left">
                          {bookeddata.name}
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300">DATE</th>
                        <td className="border border-gray-300 text-left">
                          {bookeddata.date}
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300">SEAT NUMBER</th>
                        <td className="border border-gray-300 text-left">
                          {bookeddata.seatNumber}
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300">FROM</th>
                        <td className="border border-gray-300 text-left">
                          {bookeddata.from}
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300">TO</th>
                        <td className="border border-gray-300 text-left">
                          {bookeddata.to}
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300">Pickup Point</th>
                        <td className="border border-gray-300 text-left">
                          {bookeddata.pickup}
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300">
                          Droping Point
                        </th>
                        <td className="border border-gray-300 text-left">
                          {bookeddata.drop}
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300">Ticket</th>
                        <td className="border border-gray-300 text-left py-3 px-2">
                          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Download
                          </button>
                        </td>
                      </tr>
                    </>
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-red-500">No data available.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SuccessMsg;
