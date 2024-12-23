import React, { useState, useEffect, useCallback } from "react";

function Pickuppoint({ villages, setData, itemToEdit }) {
  const [selectedPoints, setSelectedPoints] = useState({});

  // Initialize selected points and time values from itemToEdit when it changes
  useEffect(() => {
    if (itemToEdit && itemToEdit.from) {
      const newSelectedPoints = {};
      itemToEdit.from.forEach(({ village, point }) => {
        point.forEach(({ pointName, time }) => {
          const checkboxKey = `${village}-${pointName}`;
          const timeKey = `${village}-${pointName}-time`;
          const villageKey = `${village}-${pointName}-village`;

          newSelectedPoints[checkboxKey] = true;
          newSelectedPoints[timeKey] = time || "";
          newSelectedPoints[villageKey] = village;
        });
      });
      setSelectedPoints(newSelectedPoints);
    }
  }, [itemToEdit]);

  // Memoize the handleCheckboxChange function
  const handleCheckboxChange = useCallback(
    (villageName, pointName, time, villageLabel) => {
      setSelectedPoints((prevSelectedPoints) => {
        const newSelectedPoints = { ...prevSelectedPoints };
        const checkboxKey = `${villageName}-${pointName}`;
        const timeKey = `${villageName}-${pointName}-time`;
        const villageKey = `${villageName}-${pointName}-village`;

        // Check if the checkbox is checked or unchecked
        if (newSelectedPoints[checkboxKey]) {
          // If already selected, unselect and remove the entry
          delete newSelectedPoints[checkboxKey];
          delete newSelectedPoints[timeKey];
          delete newSelectedPoints[villageKey];

          // Remove the corresponding point from the 'from' array
          setData((prevData) => ({
            ...prevData,
            from: prevData.from
              .map((item) =>
                item.village === villageLabel
                  ? {
                      ...item,
                      point: item.point.filter(
                        (p) => p.pointName !== pointName
                      ),
                    }
                  : item
              )
              .filter((item) => item.point.length > 0), // Ensure empty points arrays are removed
          }));
        } else {
          // If not selected, select and store the village, point, and time
          newSelectedPoints[checkboxKey] = true;
          newSelectedPoints[timeKey] = time || "";
          newSelectedPoints[villageKey] = villageLabel;

          // Add or update the data in 'from'
          setData((prevData) => {
            const updatedFrom = prevData.from.map((item) => {
              if (item.village === villageLabel) {
                return {
                  ...item,
                  point: [
                    ...item.point.filter((p) => p.pointName !== pointName),
                    { pointName, time: time || "" },
                  ], // Add point with the correct time
                };
              }
              return item;
            });

            // If village not found, create a new entry
            if (!updatedFrom.some((item) => item.village === villageLabel)) {
              updatedFrom.push({
                village: villageLabel,
                point: [{ pointName, time: time || "" }],
              });
            }

            return { ...prevData, from: updatedFrom };
          });
        }

        return newSelectedPoints;
      });
    },
    [setData]
  );

  // Memoize the handleTimeChange function
  const handleTimeChange = useCallback(
    (villageName, pointName, time) => {
      setSelectedPoints((prevSelectedPoints) => {
        const newSelectedPoints = { ...prevSelectedPoints };
        const timeKey = `${villageName}-${pointName}-time`;

        // Update the time value for the selected point
        newSelectedPoints[timeKey] = time;

        // Update the 'from' array with the new time value
        setData((prevData) => ({
          ...prevData,
          from: prevData.from.map((item) =>
            item.village ===
              newSelectedPoints[`${villageName}-${pointName}-village`] &&
            item.point.some((p) => p.pointName === pointName)
              ? {
                  ...item,
                  point: item.point.map((p) =>
                    p.pointName === pointName ? { ...p, time } : p
                  ),
                }
              : item
          ),
        }));

        return newSelectedPoints;
      });
    },
    [setData]
  );

  return (
    <div
      className="overflow-x-auto"
      style={{ maxHeight: "600px", overflowY: "auto" }}
    >
      <table className="min-w-full table-auto bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/12">
              Select
            </th>
            <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/12">
              Village
            </th>
            <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-3/5">
              Point
            </th>
            <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/12">
              Time
            </th>
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
                          handleCheckboxChange(
                            village.village,
                            point,
                            isChecked ? "" : "",
                            village.village
                          )
                        }
                        className="form-checkbox"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-400 text-center">
                      {village.village}
                    </td>
                    <td className="px-4 py-2 border border-gray-400 text-center">
                      {point} {/* Display the individual points */}
                    </td>
                    <td className="px-4 py-2 border border-gray-400 text-center">
                      <input
                        type="time"
                        value={selectedPoints[timeKey] || ""}
                        onChange={(e) =>
                          handleTimeChange(
                            village.village,
                            point,
                            e.target.value
                          )
                        }
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
