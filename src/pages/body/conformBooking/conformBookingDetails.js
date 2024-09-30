import React from 'react';
import CustomerInformation from './CustomerInformations';
import JourneyInformation from './JourneyInformation';
import { useSelector } from 'react-redux';

function ConformBookingDetails({ pickup, drop, date, from, to, price, seatNumber }) {
  const inputs = useSelector((state) => state.inputs);
  
  return (
    inputs.Tablemanuplation?.passengerdetails && (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-100">
        <div className="p-4 bg-gray-100 h-[86%] overflow-y-auto"> {/* Adjust height here */}
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomerInformation    
            pickup={pickup} 
              drop={drop} 
              date={date} 
              from={from} 
              to={to} 
              price={price} 
              seatNumber={seatNumber} />
            <JourneyInformation 
              pickup={pickup} 
              drop={drop} 
              date={date} 
              from={from} 
              to={to} 
              price={price} 
              seatNumber={seatNumber} 
            />
          </div>
        </div>
      </div>
    )
  );
}

export default ConformBookingDetails;
