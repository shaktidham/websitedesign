// Utility function to convert 24-hour time format to 12-hour AM/PM format
const convertTo12HourFormat = (time) => {
  // Check if time is a valid string before attempting to split
  if (!time || typeof time !== 'string') {
    console.error("Invalid time format:", time);
    return ""; // Fallback value
  }
  const villageOrder = [
  "વિસાવદર", "કુબા", "ઢેબર", "જાંબુડા", "ના. પિંડાખાઈ", "ભલગામ", "માણેકવાડા", 
  "ઘંટીયાણ", "ન. હળીયાદ", "જુ. હળીયાદ", "મો. મુંજીયાસર", "બગસરા", "જેઠીયાવદર", 
  "માંડવડા", "પાણીયા", "જાળીયા પા.", "ભંડારીયા પા.", "બાબાપુર રોડ", "ગાવડકા", 
  "અમરેલી", "ઈશ્વરીયા", "વરસડા", "ટોડા", "લાઠી", "ચાવંડ", "ઢસા", "માલપરા", 
  "ગુંદાળા", "રણીયાળા", "સ્વા. ગઢડા", "બોટાદ", "સાળંગપુર", "બરવાળા"
];

  let [hour, minute] = time.split(":").map(Number);
  let period = hour >= 12 ? "AM" : "PM";
  hour = hour % 12 || 12; // Convert 24-hour format to 12-hour format
  return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
};

export const handleSendWhatsApp = (filterData, filterRoute) => {
  // Utility function to safely get values with fallback
  const getValueOrDefault = (value, defaultValue = "") => (value ? value : defaultValue);

  // Ensure mobile number exists
  const mobile = filterData[0]?.mobile;
  if (!mobile) {
    alert("Mobile number is not available.");
    return;
  }

  // Utility to format dates safely
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
  const parsedDate = new Date(filterRoute[0].date);
  if (isNaN(parsedDate)) {
   
    alert("Invalid date format. Please check the date input.");
    return;
  }

  // Calculate the price
  const price = (filterData[0].seatCount * filterRoute[0].price) + (filterData[0].cabinCount * filterRoute[0].cabinprice);

  // Convert pickuptime from 24-hour to 12-hour format (add null/undefined check)
  const pickuptimeFormatted = filterData[0].pickuptime && Array.isArray(filterData[0].pickuptime)
  ? filterData[0].pickuptime.map(convertTo12HourFormat) // Ensure this converts times correctly
  : [];

const pickupNames = filterData[0].pickup && Array.isArray(filterData[0].pickup)
  ? filterData[0].pickup
  : [];

const pickupWithTime = pickupNames.map((name, index) => {
  const time = pickuptimeFormatted[index] || 'N/A'; // Ensure there's a corresponding time for each pickup
  return `${name} ${time}`;
}).join(", ");
const isSpecialRoute = villageOrder.includes(filterData[0].to);
  // Construct the message
  const message = `
  🚌🚌 શક્તિધામ ટ્રાવેલ્સ 🚌🚌

  બુકિંગ તારીખ     : ${formatDate(parsedDate)}
  ક્યા થી ક્યા        : ${getValueOrDefault(filterData[0].from)} ${filterData[0].to && "થી"} ${getValueOrDefault(filterData[0].to)}
  ક્યાંથી બેસવાનું  : [ ${pickupWithTime} ]
  બસ નંબર          : ${getValueOrDefault(filterRoute[0].busName)}
  સીટ નંબર         : ${getValueOrDefault(filterData[0]?.seatNumbers?.join(", "))} 
  રકમ                 : ${price}
  
  પેસેન્જર મોબાઈલ નંબર : ${mobile}
  
  લોકેશન : ${getValueOrDefault(filterRoute[0].location)}
  
${contactNumbers}
  હેલ્પલાઇન નંબર: ☎ 8141814190
  બસનું લોકેશન જોવા માટે આ WhatsApp નંબર સેવ કરો.
  `;

  // Check for message length
  if (encodeURIComponent(message).length > 4000) {
    alert("Message is too long to send via WhatsApp.");
    return;
  }

  // Open WhatsApp with the constructed message
  const url = `https://wa.me/+91${mobile}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};
