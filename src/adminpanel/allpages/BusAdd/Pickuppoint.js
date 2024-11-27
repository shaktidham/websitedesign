import React, { useState, useEffect, useCallback } from 'react';

function Pickuppoint({ villages, setData, itemToEdit }) {
  const [selectedPoints, setSelectedPoints] = useState({});
 console.log(selectedPoints,"selectedPoints");

  // Initialize selected points and time values from itemToEdit when it changes
  useEffect(() => {
    if (itemToEdit && itemToEdit.from) {
      const newSelectedPoints = {};
      itemToEdit.from.forEach(({ village, point, time }) => {
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
  
        // Remove the corresponding data from 'from'
        setData((prevData) => ({
          ...prevData,
          from: Array.isArray(prevData.from)
            ? prevData.from.filter(item => !(item.village === villageLabel && item.point === point))
            : [], // Ensure 'from' is an array before filtering
        }));
      } else {
        // If not selected, select and store the village, point, and time
        newSelectedPoints[checkboxKey] = true;
        newSelectedPoints[timeKey] = time || '';
        newSelectedPoints[villageKey] = villageLabel;
  
        // Add the new selected data, but keep the existing ones
        setData((prevData) => ({
          ...prevData,
          from: Array.isArray(prevData.from)
            ? [
                ...prevData.from,
                {
                  village: villageLabel,
                  point: point,
                  time: time || '',
                },
              ]
            : [ // If 'from' is not an array, initialize it with the new entry
                {
                  village: villageLabel,
                  point: point,
                  time: time || '',
                },
              ],
        }));
      }
  
      return newSelectedPoints;
    });
  }, [setData]);
  
  

  // Memoize the handleTimeChange function
  const handleTimeChange = useCallback((villageName, point, time) => {
    setSelectedPoints((prevSelectedPoints) => {
      const newSelectedPoints = { ...prevSelectedPoints };
      const timeKey = `${villageName}-${point}-time`;
  
      // Update the time value for the selected point
      newSelectedPoints[timeKey] = time;
  
      // Update the `from` array with the new time value
      setData((prevData) => ({
        ...prevData,
        from: Array.isArray(prevData.from)
          ? prevData.from.map(item =>
              item.village === newSelectedPoints[`${villageName}-${point}-village`] && item.point === point
                ? { ...item, time }
                : item
            )
          : [], // Ensure 'from' is an array before using map
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

export default Pickuppoint;
