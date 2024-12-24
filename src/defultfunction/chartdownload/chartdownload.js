import { kabin, kabin2, labels, number } from "../../constvalue/constvalue";
import html2pdf from "html2pdf.js";

export const handleDownload = (chartData) => {


  // Function to generate table rows from labels or numbers
// Assuming you're using 'seatNumbers' as the property for seat numbers in your chart data

const generateTableRows = (dataList) => {
    return dataList
      .map((pair) => {
        return `
          <tr>
            ${pair
              .map((seatNumber) => {
                // Ensure you are checking 'seatNumbers' instead of 'seatNumber'
                const item = chartData.find(item => 
                  Array.isArray(item.seatNumbers) && item.seatNumbers.includes(seatNumber)
                );
                
            
  
                return `
                  <td class="border border-black text-center" style="height: 120px; width: 112px;">
                    ${
                      item
                        ? `
                        <div class="font-bold text-lg text-red-500">${seatNumber    }</div>
                        <div class="font-bold">${item.to || ""}</div>
                        <div class="font-bold">${item.name || ""}</div>
                        <div class="font-bold">${item.mobile || ""}</div>
                        <div class="font-bold">${item.extradetails || ""}</div>
                      `
                        : `
                        <div class="font-bold text-lg text-red-500">${seatNumber}</div>
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
    return dataList
      .map((number) => {
        return `
          <tr class="border border-black">
            ${number
              .map((seatNumber) => {
                // Find the item matching the seatNumber from chartData
                const item = chartData.find(item => 
                  Array.isArray(item.seatNumbers) && item.seatNumbers.includes(seatNumber)
                );
  
           
  
                return item
                  ? `
                    <td class="border border-black p-2 text-center w-1/6">${seatNumber}</td>
                    <td class="border border-black p-2 text-left font-bold">${item.vilage || ""}--${item.name}</td>
                    <td class="border border-black p-2 text-left font-bold">${item.mobile || ""}</td>
                  `
                  : `
                    <td class="border border-black p-2 text-center w-1/6">${seatNumber}</td>
                    <td class="border border-black p-2 text-center"></td>
                    <td class="border border-black p-2 text-center"></td>
                  `;
              })
              .join("")}
          </tr>
        `;
      })
      .join("");
  };
  

  // Generate table rows for both tables
  const firstTableRows = generateTableRows(labels);
  const secondTableRows = generateTableRows(number);
  const thirdTableRows = generatesTableRows(kabin);
  const fourthTableRows = generatesTableRows(kabin2);

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
          <div class="text-3xl text-red-500 flex justify-center font-extrabold mb-5">શક્તિધામ ટ્રાવેલ્સ</div>
          <table class="min-w-full mb-3">
            <thead>
              <tr class="flex justify-between">
                <th class="text-right pr-2">તારીખ:- </th>
                <th class="text-right pr-2">ડ્રાઇવર:-</th>
              </tr>
              <tr class="flex justify-between">
                <th class="text-right pr-2">ઉપડવાનો સમય:- </th>
                <th class="text-right pr-2">બસ નંબર:-</th>
              </tr>
            </thead>
          </table>

          <div class="flex justify-between mb-4">
            <div class="w-1/2 pr-2">
              <table class="min-w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th class="bg-red-500 text-white p-2">ઉપર</th>
                    <th class="bg-red-500 text-white p-2">નીચે</th>
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
                    <th class="bg-red-500 text-white p-2">નીચે</th>
                    <th class="bg-red-500 text-white p-2">ઉપર</th>
                  </tr>
                </thead>
                <tbody>
                  ${secondTableRows}
                </tbody>
              </table>
            </div>
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
