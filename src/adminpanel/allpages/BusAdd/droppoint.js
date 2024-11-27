import React, { useState, useEffect, useCallback } from 'react';

function Droppoint({ villages, setData, itemToEdit }) {
  const [selectedPoints, setSelectedPoints] = useState({});
 

  // Initialize selected points and time values from itemToEdit when it changes
  useEffect(() => {
    if (itemToEdit && itemToEdit.to) {
      const newSelectedPoints = {};
      itemToEdit.to.forEach(({ village, point, time }) => {
        const checkboxKey = `${village}-${point}`;
        const timeKey = `${village}-${point}-time`;
        const villageKey = `${village}-${point}-village`;
      
        newSelectedPoints[checkboxKey] = true;
        newSelectedPoints[timeKey] = time || '';
        newSelectedPoints[villageKey] = village;
      });
      setSelectedPoints(newSelectedPoints);
    }
  }, [itemToEdit]);

  // Memoize the handleCheckboxChange function to avoid re-creating it on each render
  const handleCheckboxChange = useCallback((villageName, point, time, villageLabel) => {
    setSelectedPoints((prevSelectedPoints) => {
      const newSelectedPoints = { ...prevSelectedPoints };
      const checkboxKey = `${villageName}-${point}`;
      const timeKey = `${villageName}-${point}-time`;
      const villageKey = `${villageName}-${point}-village`;
  
      if (newSelectedPoints[checkboxKey]) {
        // If already selected, unselect and remove the entry
        delete newSelectedPoints[checkboxKey];
        delete newSelectedPoints[timeKey];
        delete newSelectedPoints[villageKey];
  
        // Ensure prevData.to is an array before performing filter
        setData((prevData) => ({
          ...prevData,
          to: Array.isArray(prevData.to) 
            ? prevData.to.filter(item => !(item.village === villageLabel && item.point === point))
            : [], // If to is not an array, reset to empty array
        }));
      } else {
        // If not selected, select and store the village, point, and time
        newSelectedPoints[checkboxKey] = true;
        newSelectedPoints[timeKey] = time || ''; // Default to empty string if no time
        newSelectedPoints[villageKey] = villageLabel;
  
        // Also update the `setData` function with the new selected data
        setData((prevData) => ({
          ...prevData,
          to: Array.isArray(prevData.to)
            ? [
                ...prevData.to,
                {
                  village: villageLabel,
                  point: point,
                  time: time || '', // Default to empty string if no time
                },
              ]
            : [
                {
                  village: villageLabel,
                  point: point,
                  time: time || '', // Default to empty string if no time
                },
              ], // If to is not an array, create a new array with the new entry
        }));
      }
  
      return newSelectedPoints;
    });
  }, [setData]);

  // Memoize the handleTimeChange function
  const handleTimeChange = useCallback((villageName, point, time) => {
    setSelectedPoints((prevSelectedPoints) => {
      const newSelectedPoints = { ...prevSelectedPoints };
      const checkboxKey = `${villageName}-${point}`;
      const timeKey = `${villageName}-${point}-time`;

      // Update the time value for the selected point
      newSelectedPoints[timeKey] = time;

      // Update the `to` array in data with the new time value
      setData((prevData) => ({
        ...prevData,
        to: prevData.to.map(item =>
          item.village === newSelectedPoints[`${villageName}-${point}-village`] && item.point === point
            ? { ...item, time }
            : item
        ),
      }));

      return newSelectedPoints;
    });
  }, [setData]);

  return (
    <div className="overflow-x-auto" style={{ maxHeight: '600px', overflowY: 'auto' }}>
      <table className="min-w-full table-auto bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/12">Select</th>
            <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/12">Village</th>
            <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-3/5">Point</th>
            <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/12">Time</th>
          </tr>
        </thead>
        <tbody>
          {villages?.map((village) => (
            <React.Fragment key={village.village}>
              {village.point?.map((point) => {
                const checkboxKey = `${village.village}-${point}`;
                const timeKey = `${village.village}-${point}-time`;
                const villageKey = `${village.village}-${point}-village`;
                const isChecked = selectedPoints[checkboxKey] || false;

                return (
                  <tr key={`${village.village}-${point}`}>
                    <td className="px-4 py-2 border border-gray-400 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          handleCheckboxChange(village.village, point, isChecked ? '' : '', village.village)
                        }
                        className="form-checkbox"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{village.village}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{point}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">
                      <input
                        type="time"
                        value={selectedPoints[timeKey] || ''}
                        onChange={(e) => handleTimeChange(village.village, point, e.target.value)}
                        disabled={!isChecked} // Disable time input if checkbox is not selected
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Droppoint;
