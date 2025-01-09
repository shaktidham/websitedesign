// import React, { useCallback, useState, useEffect } from "react";
// import { ReactComponent as CloseButton } from "./../../../svg/close.svg";
// import { ReactComponent as PlushButton } from "./../../../svg/plush.svg";
// import { useDispatch } from "react-redux";
// import { setLoading } from "../../../Redux/userside"; // Assuming you have a global loading state here
// import Loader from "./../../../userpages/Loader/Loader"; // Assuming Loader is a component that shows a loading spinner

// function Villageadd({ popup, setPopup, itemToEdit,onSuccess }) {
//   const dispatch = useDispatch();
//   const [village, setVillage] = useState(""); // State for the village name
//   const [evillage, setEvillage] = useState(""); // State for the village name
//   const [points, setPoints] = useState([""]); // Array to store point values
//   const [loading, setLoadingState] = useState(false); // Local loading state

//   // Handle adding new input field for points
//   const addPoint = () => {
//     setPoints([...points, ""]); // Add a new empty string to the points array
//   };

//   // Handle point input field changes
//   const handlePointChange = (index, value) => {
//     const updatedPoints = [...points];
//     updatedPoints[index] = value;
//     setPoints(updatedPoints);
//   };

//   // Remove a point input field
//   const removePoint = (index) => {
//     const updatedPoints = points.filter((_, i) => i !== index);
//     setPoints(updatedPoints);
//   };

//   // Use useEffect to pre-fill the form fields when editing
//   useEffect(() => {
//     if (itemToEdit) {
//       setVillage(itemToEdit.village);
//       setEvillage(itemToEdit.evillage)
//       setPoints(itemToEdit.point || []); // Set points if available
//     }
//   }, [itemToEdit]);

//   // Handle form submission (add or edit)
//   const handleSubmit = useCallback(async (e) => {
//     e.preventDefault();

//     setLoadingState(true); // Set loading to true when API request starts
//     dispatch(setLoading(true)); // Optionally use Redux to set global loading state if needed

//     try {
//       const url = itemToEdit
//         ? `https://shaktidham-backend.vercel.app/village/update/${itemToEdit._id}` // Edit endpoint if itemToEdit exists
//         : "https://shaktidham-backend.vercel.app/village/create"; // Create endpoint otherwise
//       const method = itemToEdit ? "PUT" : "POST"; // Use PUT if editing, POST if creating

//       const response = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ village, point: points,evillage }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         onSuccess();
//         setPopup(false); // Close the popup on success
//         setVillage(""); // Clear the village input field
//         setPoints([""]); // Clear the points array
//         setEvillage("")
//       } else {
//         alert("Error adding village: " + data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error sending data to server.");
//     } finally {
//       setLoadingState(false); // Set loading to false once the API request completes
//       dispatch(setLoading(false)); // Optionally reset global loading state
//     }
//   }, [dispatch, points, village, itemToEdit]);

//   return (
//     <div>
//       {popup && (
//         <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-100">
//           <div className="bg-white w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg mx-4">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-bold text-lg sm:text-xl text-gray-800">
//                 {itemToEdit ? "Edit Village" : "Add Village"}
//               </h2>
//               <div
//                 className="cursor-pointer"
//                 onClick={() => setPopup(!popup)}
//               >
//                 <CloseButton fill="black" className="h-8 w-8" />
//               </div>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit}>
//               {/* Village Name */}
//               <label
//                 htmlFor="village"
//                 className="text-left text-gray-700 font-bold block mb-2"
//               >
//                 Village:
//               </label>
//               <input
//                 type="text"
//                 id="village"
//                 name="village"
//                 value={village}
//                 onChange={(e) => setVillage(e.target.value)}
//                 placeholder="Enter village name"
//                 className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
//               />
//                 <label
//                 htmlFor="evillage"
//                 className="text-left text-gray-700 font-bold block mb-2"
//               >
//                 Eng. Village:
//               </label>
//               <input
//                 type="text"
//                 id="evillage"
//                 name="evillage"
//                 value={evillage}
//                 onChange={(e) => setEvillage(e.target.value)}
//                 placeholder="Enter village name"
//                 className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
//               />

//               {/* Points Section */}
//               <div className="mt-4">
//                 <label
//                   htmlFor="point"
//                   className="text-left text-gray-700 font-bold block mb-2"
//                 >
//                   Points:
//                 </label>
//                 <div className="h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
//                   {points.map((point, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between mt-2 space-x-2"
//                     >
//                       <input
//                         type="text"
//                         id={`point-${index}`}
//                         name={`point-${index}`}
//                         value={point}
//                         onChange={(e) =>
//                           handlePointChange(index, e.target.value)
//                         }
//                         placeholder={`Enter point ${index + 1}`}
//                         className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
//                       />
//                       {/* Show remove button only for points after the first one */}
//                       {points.length > 1 && (
//                         <CloseButton
//                           fill="black"
//                           className="h-6 w-6 cursor-pointer"
//                           onClick={() => removePoint(index)}
//                         />
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Add Point Button */}
//                 <div className="flex justify-end mt-2">
//                   <PlushButton
//                     fill="black"
//                     className="h-8 w-8 cursor-pointer"
//                     onClick={addPoint}
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex space-x-2 mt-6">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-600 transition-all duration-300 disabled:bg-blue-300"
//                   disabled={loading} // Disable the button while loading
//                 >
//                   {itemToEdit ? "Update" : "Add"} Village
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Show loader when loading is true */}
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
//           <Loader /> {/* Assuming Loader component is a spinner */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Villageadd;
import React, { useCallback, useState, useEffect } from "react";
import { ReactComponent as CloseButton } from "./../../../svg/close.svg";
import { ReactComponent as PlushButton } from "./../../../svg/plush.svg";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../Redux/userside"; // Assuming you have a global loading state here
import Loader from "./../../../userpages/Loader/Loader"; // Assuming Loader is a component that shows a loading spinner

function Villageadd({ popup, setPopup, itemToEdit, onSuccess }) {
  const dispatch = useDispatch();
  const [village, setVillage] = useState(""); // State for the village name
  const [evillage, setEvillage] = useState(""); // State for the village name
  const [points, setPoints] = useState([""]); // Array to store point values
  const [loading, setLoadingState] = useState(false); // Local loading state

  // Handle adding new input field for points
  const addPoint = () => {
    setPoints([...points, ""]); // Add a new empty string to the points array
  };

  // Handle point input field changes
  const handlePointChange = (index, value) => {
    const updatedPoints = [...points];
    updatedPoints[index] = value;
    setPoints(updatedPoints);
  };

  // Remove a point input field
  const removePoint = (index) => {
    const updatedPoints = points.filter((_, i) => i !== index);
    setPoints(updatedPoints);
  };

  // Use useEffect to pre-fill the form fields when editing
  useEffect(() => {
    if (itemToEdit) {
      setVillage(itemToEdit.village);
      setEvillage(itemToEdit.evillage);
      setPoints(itemToEdit.point || []); // Set points if available
    }
  }, [itemToEdit]);

  // Handle form submission (add or edit)
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setLoadingState(true); // Set loading to true when API request starts
      dispatch(setLoading(true)); // Optionally use Redux to set global loading state if needed

      try {
        const url = itemToEdit
          ? `https://shaktidham-backend.vercel.app/village/update/${itemToEdit._id}` // Edit endpoint if itemToEdit exists
          : "https://shaktidham-backend.vercel.app/village/create"; // Create endpoint otherwise
        const method = itemToEdit ? "PUT" : "POST"; // Use PUT if editing, POST if creating

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ village, point: points, evillage }),
        });

        const data = await response.json();
        if (response.ok) {
          onSuccess();
          setPopup(false); // Close the popup on success
          setVillage(""); // Clear the village input field
          setPoints([""]); // Clear the points array
          setEvillage("");
        } else {
          alert("Error adding village: " + data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error sending data to server.");
      } finally {
        setLoadingState(false); // Set loading to false once the API request completes
        dispatch(setLoading(false)); // Optionally reset global loading state
      }
    },
    [dispatch, points, village, itemToEdit]
  );

  return (
    <div>
      {popup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-100">
          <div className="bg-white w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 sm:p-8 rounded-lg shadow-lg mx-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg sm:text-xl text-gray-800">
                {itemToEdit ? "Edit Village" : "Add Village"}
              </h2>
              <div className="cursor-pointer" onClick={() => setPopup(!popup)}>
                <CloseButton fill="black" className="h-8 w-8" />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Village Name */}
              <label
                htmlFor="village"
                className="text-left text-gray-700 font-bold block mb-2"
              >
                Village:
              </label>
              <input
                type="text"
                id="village"
                name="village"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="Enter village name"
                className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              <label
                htmlFor="evillage"
                className="text-left text-gray-700 font-bold block mb-2"
              >
                Eng. Village:
              </label>
              <input
                type="text"
                id="evillage"
                name="evillage"
                value={evillage}
                onChange={(e) => setEvillage(e.target.value)}
                placeholder="Enter village name"
                className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />

              {/* Points Section */}
              <div className="mt-4">
                <label
                  htmlFor="point"
                  className="text-left text-gray-700 font-bold block mb-2"
                >
                  Points:
                </label>
                <div className="h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                  {points.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between mt-2 space-x-2"
                    >
                      <input
                        type="text"
                        id={`point-${index}`}
                        name={`point-${index}`}
                        value={point}
                        onChange={(e) =>
                          handlePointChange(index, e.target.value)
                        }
                        placeholder={`Enter point ${index + 1}`}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      />
                      {/* Show remove button only for points after the first one */}
                      {points.length > 1 && (
                        <CloseButton
                          fill="black"
                          className="h-6 w-6 cursor-pointer"
                          onClick={() => removePoint(index)}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Point Button */}
                <div className="flex justify-end mt-2">
                  <PlushButton
                    fill="black"
                    className="h-8 w-8 cursor-pointer"
                    onClick={addPoint}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-2 mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-600 transition-all duration-300 disabled:bg-blue-300"
                  disabled={loading} // Disable the button while loading
                >
                  {itemToEdit ? "Update" : "Add"} Village
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Show loader when loading is true */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <Loader /> {/* Assuming Loader component is a spinner */}
        </div>
      )}
    </div>
  );
}

export default Villageadd;
