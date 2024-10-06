import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFulldetails } from '../../Redux/userside';
import { ReactComponent as Close } from './../../svg/close.svg';

function Fulldetails(data) {
    console.log(data,"data");
    const dispatch=useDispatch()
    const inputs = useSelector((state) => state.inputs);
    // console.log( inputs.Tablemanuplation?.fulldetails," inputs.Tablemanuplation?.fulldetails");
    const OpenBox = () => {
        dispatch(setFulldetails(!inputs.Tablemanuplation?.fulldetails));
    };
  return (
    <div>
       { inputs.Tablemanuplation?.fulldetails && (
            <div className="fixed top-0 left-0 flex  items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-100 p-10">
     

            <div className="flex-grow bg-white rounded shadow p-4">
            <div className='flex justify-end'>
            <div className='p-2 bg-black rounded-full flex items-center justify-center cursor-pointer' onClick={OpenBox}>
              <Close className='h-5 w-5 ' fill='white' />
            </div>
          </div>
          {/* Check if data is available */}
          {data.passengerdata ? (
            
              <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-200 rounded-lg shadow-md mb-4">
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                   
                    { label: 'Name', value: data.passengerdata.name || 'N/A' },
                    { label: 'Mobile', value: data.passengerdata.mobile ||  'N/A' },
                    { label: 'Seatnumber', value: data.passengerdata.seatNumber || 'N/A' },
                    { label: 'From', value: data.passengerdata.from || 'N/A' },
                    { label: 'To', value: data.passengerdata.to || 'N/A' },
                    { label: 'Pickup', value: data.passengerdata.pickup ||  'N/A' },
                    { label: 'Drop', value: data.passengerdata.drop || 'N/A' },
                    { label: 'Price', value: data.passengerdata.price || 'N/A' },
                    { label: 'Date', value: data.passengerdata.date || 'N/A' },
                    { label: 'Age', value: data.passengerdata.age || 'N/A' },
                    { label: 'Gender', value:data.passengerdata.gender || 'N/A' },
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
            
          ) : (
            <p className="text-gray-600">No data available. Please select a date.</p>
          )}
        </div>
            </div>)}
    </div>
  );
}

export default Fulldetails;
