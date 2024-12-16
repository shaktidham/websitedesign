import React, { useState, useEffect, useCallback } from 'react';

function Pickuppoint({ villages, setData, itemToEdit }) {
  const [selectedPoints, setSelectedPoints] = useState({});
  

  // Initialize selected points and time values to itemToEdit when it changes
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

  // Memoize the handleCheckboxChange function
  const handleCheckboxChange = useCallback((villageName, point, time, villageLabel) => {
    setSelectedPoints((prevSelectedPoints) => {
      const newSelectedPoints = { ...prevSelectedPoints };
      const checkboxKey = `${villageName}-${point}`;
      const timeKey = `${villageName}-${point}-time`;
      const villageKey = `${villageName}-${point}-village`;

      // Check if the checkbox is checked or unchecked
      if (newSelectedPoints[checkboxKey]) {
        // If already selected, unselect and remove the entry
        delete newSelectedPoints[checkboxKey];
        delete newSelectedPoints[timeKey];
        delete newSelectedPoints[villageKey];

        // Remove the corresponding point to the 'to' array
        setData((prevData) => ({
          ...prevData,
          to: prevData.to.map((item) =>
            item.village === villageLabel
              ? { ...item, point: item.point.filter((p) => p !== point) }
              : item
          ).filter((item) => item.point.length > 0), // Ensure empty points arrays are removed
        }));
      } else {
        // If not selected, select and store the village, point, and time
        newSelectedPoints[checkboxKey] = true;
        newSelectedPoints[timeKey] = time || '';
        newSelectedPoints[villageKey] = villageLabel;

        // Add or update the data in 'to'
        setData((prevData) => {
          const updatedFrom = prevData.to.map((item) => {
            if (item.village === villageLabel) {
              return {
                ...item,
                point: [...new Set([...item.point, point])], // Add point to the list of points (ensure unique points)
                time: time || item.time, // Update time (use existing time if no new time)
              };
            }
            return item;
          });

          // If village not found, create a new entry
          if (!updatedFrom.some((item) => item.village === villageLabel)) {
            updatedFrom.push({
              village: villageLabel,
              point: [point],
              time: time || '',
            });
          }

          return { ...prevData, to: updatedFrom };
        });
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

      // Update the 'to' array with the new time value
      setData((prevData) => ({
        ...prevData,
        to: prevData.to.map(item =>
          item.village === newSelectedPoints[`${villageName}-${point}-village`] && item.point.includes(point)
            ? { ...item, time }
            : item
        ),
      }));

      return newSelectedPoints;
    });
  }, [setData]);

  // Function to clean up and format points before displaying
  const cleanPoints = (points) => {
    // Join points into a single string, filter out any unwanted characters
    const cleanedPoints = points
      .map(point => point.trim()) // Remove any leading/trailing spaces
      .filter(point => point !== '' && !/[\s\xA0]/.test(point)) // Filter out any spaces or special unwanted characters
      .join(' '); // Join them with a single space

    return cleanedPoints;
  };

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
      {village.point?.map((point, index) => {
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
            <td className="px-4 py-2 border border-gray-400 text-center">
              { village.village} {/* Show village name only on the first point */}
            </td>
            <td className="px-4 py-2 border border-gray-400 text-center">
              {point} {/* Display the individual points */}
            </td>
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
