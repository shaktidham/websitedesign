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
    console.error("Invalid date format for filterRoute[0].date:", filterRoute[0].date);
    alert("Invalid date format. Please check the date input.");
    return;
  }
const price =(filterData[0].seatCount * filterRoute[0].price) +   (filterData[0].cabinCount * filterRoute[0].cabinprice)
  // Construct the message
  const message = `
  🚌🚌 શક્તિધામ ટ્રાવેલ્સ 🚌🚌

  બુકિંગ તારીખ    : ${formatDate(parsedDate)}
  ટાઇમ              : ${getValueOrDefault(filterData[0].pickuptime?.join(", "))}
  ક્યા થી ક્યા       : ${getValueOrDefault(filterData[0].from)} થી ${getValueOrDefault(filterData[0].to)}
  ક્યાંથી બેસવાનું  : ${getValueOrDefault(filterData[0].pickup?.join(", "))}
  બસ નંબર        : ${getValueOrDefault(filterRoute[0].busName)}
  સીટ નંબર        : ${getValueOrDefault(filterData[0]?.seatNumbers?.join(", "))}
  રકમ              : ${price}
  
  પેસેન્જર મોબાઈલ નંબર : ${mobile}
  
  લોકેશન : ${getValueOrDefault(filterRoute[0].location)}
  
  સુરત ઓફિસ મોબાઇલ નંબર :
  ☎ 9825450700  
  ☎ 9825805971
  જસદણ ઓફિસ મોબાઇલ નંબર :
  ☎ 9909134545 
  ☎ 9879584545
  મોટા દેવળીયા ઓફિસ મોબાઇલ નંબર:
  ☎ 9825864672 
  ☎ 9586653535
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
