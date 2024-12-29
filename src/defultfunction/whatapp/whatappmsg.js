export const handleSendWhatsApp = ( filterData, filterRoute) => {


  // Ensure mobile number exists
  if (!filterData[0]?.mobile) {
    alert("Mobile number is not available.");
    return;
  }

  // Construct message
  const message = `
  🚌🚌 શક્તિધામ ટ્રાવેલ્સ 🚌🚌

  બુકિંગ તારીખ    : ${filterRoute[0].date}
  ટાઇમ              : ${filterData.pickuptime ? filterData.pickuptime : ""}
  ક્યા થી ક્યા       : ${filterData?.from} થી ${filterData?.to} 
  ક્યાંથી બેસવાનું  : ${filterData?.pickup ? filterData?.pickup : " "}
  બસ નંબર        : ${filterRoute[0].busname}
  સીટ નંબર        : ${filterData?.sitnumber ? filterData.sitnumber.join(", ") : " "}
  
  પેસેન્જર મોબાઈલ નંબર : ${filterData?.mobile}
  
  લોકેશન : ${filterRoute[0].location}
  
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
  બસનું લોકેશન જોવા માટે આ Whatapp નંબર સેવ
કરો.
  `;

  // Check for message length
  if (encodeURIComponent(message).length > 4000) {
    alert("Message is too long to send via WhatsApp.");
    return;
  }

  // List of mobile numbers
  const mobileNumbers = [filterData?.mobile];

  // Open WhatsApp for each mobile number
  mobileNumbers.forEach((number) => {
    const url = `https://wa.me/+91${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
};
