import React from 'react';
import { ReactComponent as CloseButton } from "./../../../svg/close.svg";

function Bookedsitshow({ popup, setPopup, data }) {

  return (
    popup && (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/2 p-6 rounded-lg shadow-lg mx-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <div className="cursor-pointer" onClick={() => setPopup(false)}>
              <CloseButton fill="black" className="h-8 w-8" />
            </div>
          </div>

          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-600">
                <th className="py-2 px-4 border-b ">Field</th>
                <th className="py-2 px-4 border-b">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b ">
                <td className="py-2 px-4 text-gray-600 font-medium border-r">Name</td>
                <td className="py-2 px-4">{data?.name}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 text-gray-600 font-medium border-r">Mobile</td>
                <td className="py-2 px-4">{data?.mobile}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 text-gray-600 font-medium border-r">Seat Number</td>
                <td className="py-2 px-4">{data?.seatNumber}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 text-gray-600 font-medium border-r">To</td>
                <td className="py-2 px-4">{data?.to}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 text-gray-600 font-medium border-r">Pickup</td>
                <td className="py-2 px-4">{data?.pickup}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 text-gray-600 font-medium border-r">Pickup Time</td>
                <td className="py-2 px-4">{data?.pickuptime}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}

export default Bookedsitshow;
