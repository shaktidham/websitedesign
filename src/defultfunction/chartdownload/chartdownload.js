import { kabin, kabin2, labels, number } from "../../constvalue/constvalue";
import html2pdf from "html2pdf.js";

// export const handleDownload = (chartData, pickupsit) => {
//   const generateTableRows = (dataList) => {
//     const isLargeList = dataList.length > 4; // Changed from pickupsit to dataList

//     // Define dynamic padding based on the condition
//     const cellStyle = isLargeList
//       ? "height: 85px; width: 112px;"
//       : "height: 90px; width: 112px;";

//     return dataList
//       .map((pair) => {
//         return `
//           <tr>
//             ${pair
//               .map((seatNumber) => {
//                 // Ensure you are checking 'seatNumbers' instead of 'seatNumber'
//                 const item = chartData.find(
//                   (item) =>
//                     Array.isArray(item.seatNumbers) &&
//                     item.seatNumbers.includes(seatNumber)
//                 );

//                 return `
//                   <td class="border border-black text-center" style="${cellStyle}">
//                     ${
//                       item
//                         ? `
//                           <div class="mt-[-10px] text-red-500">${seatNumber}</div>
//                           <div class="text-sm">${item.to || ""}</div>
//                           <div class="text-sm">${item.name || ""}</div>
//                           <div class="text-sm">${item.mobile || ""}</div>
//                           <div class="text-sm">${item.extradetails || ""}</div>
//                         `
//                         : `
//                           <div class="mt-[-10px] text-red-500">${seatNumber}</div>
//                           <div></div>
//                           <div></div>
//                           <div></div>
//                         `
//                     }
//                   </td>
//                 `;
//               })
//               .join("")}
//           </tr>
//         `;
//       })
//       .join("");
//   };

//   const generatesTableRows = (dataList) => {
//     const isLargeList = dataList.length > 4;

//     // Define dynamic padding based on the condition
//     const cellStyle = isLargeList ? "p-[0.20rem]" : "p-1";

//     return dataList
//       .map((number) => {
//         return `
//           <tr class="border border-black">
//             ${number
//               .map((seatNumber) => {
//                 // Find the item matching the seatNumber from chartData
//                 const item = chartData.find(
//                   (item) =>
//                     Array.isArray(item.seatNumbers) &&
//                     item.seatNumbers.includes(seatNumber)
//                 );

//                 return item
//                   ? `
//                       <td class="border border-black ${cellStyle} pt-[-20px] text-sm text-center w-1/6">${seatNumber}</td>
//                       <td class="border border-black ${cellStyle} pt-[-10px] text-sm text-left">${
//                       item.vilage || ""
//                     } -- ${item.name}</td>
//                       <td class="border border-black ${cellStyle} pt-[-10px] text-sm text-left">${
//                       item.mobile || ""
//                     }</td>
//                     `
//                   : `
//                       <td class="border border-black ${cellStyle} text-sm text-center w-1/6">${seatNumber}</td>
//                       <td class="border border-black ${cellStyle} text-sm text-center"></td>
//                       <td class="border border-black ${cellStyle} text-sm text-center"></td>
//                     `;
//               })
//               .join("")}
//           </tr>
//         `;
//       })
//       .join("");
//   };

//   const pickuprow = (pickupData) => {
//     // Check if pickupsit.length is greater than 4
//     const isLargeList = pickupData.length > 4;

//     // Calculate height dynamically based on the list size
//     // For example, if more than 4 items, increase height, otherwise keep it smaller.

//     const rowHeight = isLargeList ? "h-[10px] p-[0.20rem]" : "p-1";
//     return pickupData
//       .map((item) => {
//         return `
//             <tr>
//                 <td class="border border-black ${rowHeight} text-sm text-center w-1/4">
//                     ${item.pickup}
//                 </td>
//                 <td class="border border-black ${rowHeight} pl-5 text-sm text-left">
//                     ${item.seatNumbers.join(", ")}
//                 </td>
//             </tr>`;
//       })
//       .join("");
//   };

//   // Generate table rows for both tables
//   const firstTableRows = generateTableRows(labels);
//   const secondTableRows = generateTableRows(number);
//   const thirdTableRows = generatesTableRows(kabin);
//   const fourthTableRows = generatesTableRows(kabin2);
//   const fifthTableRows = pickuprow(pickupsit);

//   // Create the HTML content for the PDF
//   const element = document.createElement("div");

//   element.innerHTML = `
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Bus Seating Plan</title>
//         <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
//       </head>
//       <body class="font-sans m-0 p-0">
//         <div class="container mx-auto max-w-4xl px-4">
//           <div class="text-xl text-red-500 flex justify-center font-extrabold mb-3">શક્તિધામ ટ્રાવેલ્સ</div>

//           <div class="flex justify-between mb-4">
//             <div class="w-1/2 pr-2">
//               <table class="min-w-full border-collapse border border-black">
//                 <thead>
//                   <tr>
//                     <th class="bg-red-500 text-white p-1">ઉપર</th>
//                     <th class="bg-red-500 text-white p-1">નીચે</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${firstTableRows}
//                 </tbody>
//               </table>
//             </div>
//             <div class="w-1/2 pl-2">
//               <table class="min-w-full border-collapse border border-black">
//                 <thead>
//                   <tr>
//                     <th class="bg-red-500 text-white p-1">નીચે</th>
//                     <th class="bg-red-500 text-white p-1">ઉપર</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${secondTableRows}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div>
//             <table class="border-collapse border border-black w-full mb-2" >
//               <tbody>
//                 ${fifthTableRows}
//               </tbody>
//             </table>
//           </div>
//           <div class="flex justify-between">
//             <table class="border-collapse border border-black w-full">
//               <tbody>
//                 ${thirdTableRows}
//               </tbody>
//             </table>
//             <table class="border-collapse border border-black w-full">
//               <tbody>
//                 ${fourthTableRows}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </body>
//     </html>
//   `;

//   // Use html2pdf to convert the HTML to a PDF
//   html2pdf()
//     .from(element)
//     .toPdf()
//     .get("pdf")
//     .then((pdf) => {
//       pdf.autoPrint(); // Optional: automatically open the print dialog
//       pdf.save(`શક્તિધામ ટ્રાવેલ્સ.pdf`); // Save the PDF
//     });
// };
export const handleDownload = ( pickupsit,chartData,) => {
  console.log("object",chartData);
  const generateTableRows = (dataList) => {
    const isLargeList = dataList.length > 4; // Changed from pickupsit to dataList

    // Define dynamic padding based on the condition
    const cellStyle = isLargeList
      ? "height: 85px; width: 112px;"
      : "height: 90px; width: 112px;";

    return dataList
      .map((pair) => {
        return `
          <tr>
            ${pair
              .map((seatNumber) => {
                // Ensure you are checking 'seatNumbers' instead of 'seatNumber'
                const item = chartData.find(
                  (item) =>
               
                    item.seatNumber === seatNumber
                );
console.log(item,"item");
                return `
                  <td class="border border-black text-center" style="${cellStyle}">
                    ${
                      item
                        ? `
                          <div class="mt-[-10px] text-red-500">${seatNumber}</div>
                          <div class="text-sm">${item.to || ""}</div>
                          <div class="text-sm">${item.name || ""}</div>
                          <div class="text-sm">${item.mobile || ""}</div>
                          <div class="text-sm">${item.extradetails || ""}</div>
                        `
                        : `
                          <div class="mt-[-10px] text-red-500">${seatNumber}</div>
                          <div></div>
                          <div></div>
                          <div></div>
                        `
                    }
                  </td>
                `;
              })
              .join("")}
          </tr>
        `;
      })
      .join("");
  };

  const generatesTableRows = (dataList) => {
    const isLargeList = dataList.length > 4;

    // Define dynamic padding based on the condition
    const cellStyle = isLargeList ? "p-2" : "p-2";

    return dataList
      .map((number) => {
        return `
          <tr class="border border-black">
            ${number
              .map((seatNumber) => {
                // Find the item matching the seatNumber from chartData
                const item = chartData.find(
                  (item) =>
               
                    item.seatNumber === seatNumber
                );
                return item
                  ? `
                      <td class="border border-black ${cellStyle} pt-[-20px] text-sm text-center w-1/6">${seatNumber}</td>
                      <td class="border border-black ${cellStyle} pt-[-10px] text-sm text-left">${
                      item.vilage || ""
                    } -- ${item.name}</td>
                      <td class="border border-black ${cellStyle} pt-[-10px] text-sm text-left">${
                      item.mobile || ""
                    }</td>
                    `
                  : `
                      <td class="border border-black ${cellStyle} text-sm text-center w-1/6">${seatNumber}</td>
                      <td class="border border-black ${cellStyle} text-sm text-center"></td>
                      <td class="border border-black ${cellStyle} text-sm text-center"></td>
                    `;
              })
              .join("")}
          </tr>
        `;
      })
      .join("");
  };

  const pickuprow = (pickupData) => {
    // Check if pickupsit.length is greater than 4
    const isLargeList = pickupData.length > 4;

    // Calculate height dynamically based on the list size
    // For example, if more than 4 items, increase height, otherwise keep it smaller.

    const rowHeight = isLargeList ? "p-2" : "p-2";
    return pickupData
      .map((item) => {
        return `
            <tr>
                <td class="border border-black ${rowHeight} text-sm text-center w-1/4">
                    ${item.pickup}
                </td>
                <td class="border border-black ${rowHeight} pl-5 text-sm text-left">
                    ${item.seatNumbers.join(", ")}
                </td>
            </tr>`;
      })
      .join("");
  };

  // Generate table rows for both tables
  const firstTableRows = generateTableRows(labels);
  const secondTableRows = generateTableRows(number);
  const thirdTableRows = generatesTableRows(kabin);
  const fourthTableRows = generatesTableRows(kabin2);
  const fifthTableRows = pickuprow(pickupsit);

  // Create the HTML content for the PDF
  const element = document.createElement("div");

  element.innerHTML = `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bus Seating Plan</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="font-sans m-0 p-0">
        <div class="container mx-auto max-w-4xl px-4">
          <div class="text-xl text-red-500 flex justify-center font-extrabold mb-3">શક્તિધામ ટ્રાવેલ્સ</div>

          <div class="flex justify-between mb-4">
            <div class="w-1/2 pr-2">
              <table class="min-w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th class="bg-red-500 text-white p-1">ઉપર</th>
                    <th class="bg-red-500 text-white p-1">નીચે</th>
                  </tr>
                </thead>
                <tbody>
                  ${firstTableRows}
                </tbody>
              </table>
            </div>
            <div class="w-1/2 pl-2">
              <table class="min-w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th class="bg-red-500 text-white p-1">નીચે</th>
                    <th class="bg-red-500 text-white p-1">ઉપર</th>
                  </tr>
                </thead>
                <tbody>
                  ${secondTableRows}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <table class="border-collapse border border-black w-full mb-2" >
              <tbody>
                ${fifthTableRows}
              </tbody>
            </table>
          </div>
          <div class="flex justify-between">
            <table class="border-collapse border border-black w-full">
              <tbody>
                ${thirdTableRows}
              </tbody>
            </table>
            <table class="border-collapse border border-black w-full">
              <tbody>
                ${fourthTableRows}
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  `;

  // Use html2pdf to convert the HTML to a PDF
  html2pdf()
    .from(element)
    .toPdf()
    .get("pdf")
    .then((pdf) => {
      pdf.autoPrint(); // Optional: automatically open the print dialog
      pdf.save(`શક્તિધામ ટ્રાવેલ્સ.pdf`); // Save the PDF
    });
};
