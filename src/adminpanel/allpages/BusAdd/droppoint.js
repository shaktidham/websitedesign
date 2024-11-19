import React, { useState, useEffect, useCallback } from 'react';

function Droppoint({ villages, setData }) {
  const [selectedPoints, setSelectedPoints] = useState({});

  // Memoize the handleCheckboxChange function to avoid re-creating it on each render
  const handleCheckboxChange = useCallback((villageId, point, time, villageName) => {
    setSelectedPoints((prevSelectedPoints) => {
      const newSelectedPoints = { ...prevSelectedPoints };
      const checkboxKey = `${villageId}-${point}`;
      const timeKey = `${villageId}-${point}-time`;
      const villageKey = `${villageId}-${point}-village`;

      if (newSelectedPoints[checkboxKey]) {
        // If already selected, unselect and remove the entry
        delete newSelectedPoints[checkboxKey];
        delete newSelectedPoints[timeKey];
        delete newSelectedPoints[villageKey];

        // Remove from the `from` array in data
        setData((prevData) => ({
          ...prevData,
          to: prevData.to.filter(item => !(item.village === villageName && item.point === point)),
        }));
      } else {
        // If not selected, select and store the village, point, and time
        newSelectedPoints[checkboxKey] = true;
        newSelectedPoints[timeKey] = time || ''; // Default to empty string if no time
        newSelectedPoints[villageKey] = villageName;

        // Also update the `setData` function with the new selected data
        setData((prevData) => ({
          ...prevData,
          to: [
            ...prevData.to,
            {
              village: villageName,
              point: point,
              time: time || '', // Default to empty string if no time
            },
          ],
        }));
      }

      return newSelectedPoints;
    });
  }, [setData]);

  // Memoize the handleTimeChange function
  const handleTimeChange = useCallback((villageId, point, time) => {
    setSelectedPoints((prevSelectedPoints) => {
      const newSelectedPoints = { ...prevSelectedPoints };
      const checkboxKey = `${villageId}-${point}`;
      const timeKey = `${villageId}-${point}-time`;

      // Update the time value for the selected point
      newSelectedPoints[timeKey] = time;

      // Update the `from` array in data with the new time value
      setData((prevData) => ({
        ...prevData,
        to: prevData.to.map(item =>
          item.village === newSelectedPoints[`${villageId}-${point}-village`] && item.point === point
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
            <React.Fragment key={village._id}>
              {village.point?.map((point) => {
                const checkboxKey = `${village._id}-${point}`;
                const timeKey = `${village._id}-${point}-time`;
                const villageKey = `${village._id}-${point}-village`;
                const isChecked = selectedPoints[checkboxKey] || false;

                return (
                  <tr key={`${village._id}-${point}`}>
                    <td className="px-4 py-2 border border-gray-400 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          handleCheckboxChange(village._id, point, isChecked ? '' : '', village.village)
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
                        onChange={(e) => handleTimeChange(village._id, point, e.target.value)}
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
