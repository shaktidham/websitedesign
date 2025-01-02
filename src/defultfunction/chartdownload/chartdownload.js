import { kabin, kabin2, labels, number } from "../../constvalue/constvalue";
import html2pdf from "html2pdf.js";


export const handleDownload = (pickupsit, chartData) => {
    const formatDate = (date) => {
        if (isNaN(date)) {
          console.error("Invalid date:", date);
          return "Invalid date"; // Fallback for invalid date
        }
        
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
    
      // Manually create the Date object from the ISO string and check for validity
      const parsedDate = new Date(chartData.date);
  const generateTableRows = (dataList) => {
      const isLargeList = dataList.length > 4;
      const cellStyle = isLargeList ? "height: 85px; width: 112px;" : "height: 90px; width: 112px;";


     
      return dataList
          .map((pair) => {
              return `
                  <tr>
                      ${pair
                          .map((seatNumber) => {
                              const item = chartData.passengers.find((item) => item.seatNumber === seatNumber);
                              return `
                                  <td class="border border-black text-center" style="${cellStyle}">
                                      ${
                                          item
                                              ? `
                                                  <div class="mt-[-10px] text-xl font-bold text-red-500">${seatNumber}</div>
                                                  <div class="text-sm font-bold">${item.name || ""}</div>
                                                  <div class="text-sm font-bold">${item.mobile || ""}</div>
                                                    <div class="text-sm font-bold">${item.to || ""}</div>
                                                  <div class="text-sm font-bold">${item.extradetails || ""}</div>`
                                              : `
                                                  <div class="mt-[-10px]  text-xl font-bold text-red-500">${seatNumber}</div>
                                                  <div></div>
                                                  <div></div>
                                                  <div></div>`
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
      const cellStyle = isLargeList ? "p-1" : "p-1";
      
      return dataList
          .map((number) => {
              return `
                  <tr class="border border-black">
                      ${number
                          .map((seatNumber) => {
                              const item = chartData.passengers.find((item) => item.seatNumber === seatNumber);
                              return item
                                  ? `
                                      <td class="border border-black ${cellStyle} pt-[-20px] font-bold text-sm text-center w-1/6">${seatNumber}</td>
                                      <td class="border border-black ${cellStyle} pt-[-10px] font-bold text-sm text-left">${item.to || ""} -- ${item.name}</td>
                                      <td class="border border-black ${cellStyle} pt-[-10px] font-bold text-sm text-left">${item.mobile || ""}</td>
                                
                                  `
                                  : `
                                      <td class="border border-black ${cellStyle} text-sm text-center  w-1/6">${seatNumber}</td>
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
      const isLargeList = pickupData.length > 4;
      const rowHeight = isLargeList ? "p-1" : "p-1";
      return pickupData
          .map((item) => {
              return `
                  <tr>
                      <td class="border border-black font-bold ${rowHeight} text-sm text-center w-1/4">${item.pickup}</td>
                      <td class="border border-black font-bold ${rowHeight} pl-5 text-sm text-left">${item.seatNumbers.join(", ")}</td>
                  </tr>`;
          })
          .join("");
  };

  // Generate table rows for all tables   
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
             <style>
        @media print {
          body {
            -webkit-print-color-adjust: exact; /* For Safari */
            print-color-adjust: exact; /* For Chrome and other browsers */
          }
        }
      </style>
      </head>
      <body class="font-sans m-0 p-0">
          <div class="container mx-auto max-w-4xl px-4">
              <div class="text-xl text-red-500 flex justify-center font-extrabold mb-2">શક્તિધામ ટ્રાવેલ્સ</div>
              <div class="flex justify-between">
              <div class="font-bold"><span class="text-red-800">બસ નંબર:</span> ${chartData.busName}</div>
              <div class="font-bold"><span class="text-red-800">ડ્રાઈવર:</span> ${chartData.driver}</div>
              <div class="font-bold"><span class="text-red-800">તારીખ:</span> ${formatDate(parsedDate)}</div>
              </div>
              <div class="flex justify-between mb-4">
                  <div class="w-1/2 pr-2 flex flex-stretch">
                      <table class="min-w-full border-collapse border border-black">
                          <thead>
                              <tr>
                                  <th class="bg-red-500  text-white p-1">ઉપર</th>
                                  <th class="bg-red-500 text-white p-1">નીચે</th>
                              </tr>
                          </thead>
                          <tbody>
                              ${firstTableRows}
                          </tbody>
                      </table>
                  </div>
                  <div class="w-1/2 pl-2 flex flex-stretch">
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
                  <table class="border-collapse border border-black w-full mb-2">
                      <tbody>
                          ${fifthTableRows}
                      </tbody>
                  </table>
              </div>

              <div class="flex justify-between mt-12">
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
  </html>`;

  // Open a new tab to generate the PDF
  const printWindow = window.open("", "_blank");

  // Append the HTML content to the new tab
  printWindow.document.body.innerHTML = element.innerHTML;

  printWindow.onload = () => {
    setTimeout(() => {
        console.log("object");
        printWindow.print();
    }, 1000);  // Add a small delay (100ms) to ensure proper loading
};

};



