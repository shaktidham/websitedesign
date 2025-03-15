// constat.jsx
const Surat = [
    "katargam",
    "nana varacha dhal",
    "jakatnaka",
    "office",
    "shyamdham"
  ];
  
  const village = [
    "Jasdan",
    "Devaliya",
    "Surat",
    "Chital",
    "Dadva",
  ];
    const getLabel=   [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "1.2",
      "3.4",
      "5.6",
      "7.8",
      "9.10",
      "11.12",
      "13.14",
      "15.16",
      "17.18",
      "19.20",
      "21.22",
      "23.24",
      "કેબિન-1",
      "કેબિન-2",
      "કેબિન-3",
      "કેબિન-4",
      "કેબિન-5",
      "કેબિન-6",
      "કેબિન-7",
      "કેબિન-8",
    ];
    const labels = [
      ["B", "A"],
      ["D", "C"],
      ["F", "E"],
      ["H", "G"],
      ["J", "I"],
      ["L", "K"],
    ];

    const number = [
      ["1.2", "3.4"],
      ["5.6", "7.8"],
      ["9.10", "11.12"],
      ["13.14", "15.16"],
      ["17.18", "19.20"],
      ["21.22", "23.24"],
    ];
    const kabin = [
      ["કેબિન-1"],
      ["કેબિન-2"],
      ["કેબિન-3"],
      ["કેબિન-4"],
     
    ];
    const kabin2 = [
      ["કેબિન-5"],
      ["કેબિન-6"],
      ["કેબિન-7"],
      ["કેબિન-8"],
     
    ];
    const cabin=[ 
    ["કેબિન-1"],
    ["કેબિન-2"],
    ["કેબિન-3"],
    ["કેબિન-4"],
    ["કેબિન-5"],
    ["કેબિન-6"],
    ["કેબિન-7"],
    ["કેબિન-8"],]

    const velotime = [
      {
        village: "સુરત",
        evillage: "surat",
        point: [
          { pointName: "વર્જ ભૂમિ પાર્કિંગ ભગવાન નગર સામે જકાતનાકા", time: "19:30" },
          { pointName: "ગેટવે શ્યામધામ મંદિર સામે", time: "19:45" },
          { pointName: "સ્વામિનારાયણ પાર્કિંગ", time: "19:50" },
          { pointName: "વાલક પાટિયા", time: "20:00" },
          { pointName: "લસકાણા", time: "20:10" },
          { pointName: "પસોદરા પાટિયા ડેકોરા ફનીચર", time: "20:15" },
          { pointName: "ભવાની મંદિર કામરેજ", time: "20:20" },
          { pointName: "રાજ હોટેલ", time: "20:30" },
          { pointName: "કીમ ચોકડી", time: "20:40" },
          { pointName: "કોસબાં", time: "20:50" },
          { pointName: "પાલેજ", time: "21:00" },
          { pointName: "કરજણ", time: "22:30" }
        ]
      },
      {
        village: "વડોદરા",
        evillage: "Vadodara",
        point: [
          { pointName: "જામ્બા ચોકડી  વડોદરા", time: "22:45" },
          { pointName: "ગોલ્ડન ચોકડી  વડોદરા", time: "22:50" },
          { pointName: "વાઘોડિયા ચોકડી  વડોદરા", time: "23:00" },
          { pointName: "દુમાડ ચોકડી", time: "23:05" },
          { pointName: "આજવા ચોકડી", time: "23:15" },
          { pointName: "ફર્ટિલાઇઝર", time: "23:30" }
        ]
      },
      {
        village: "અંકલેશ્વર",
        evillage: "Anklaswar",
        point: [
          { pointName: "વાલીયા ચોકડી  અંકલેશ્વર", time: "21:15" }
        ]
      },
      {
        village: "ભરૂચ",
        evillage: "Bharuch",
        point: [
          { pointName: "નર્મદા ચોકડી ભરૂચ", time: "" },
          { pointName: "ઝાડેશ્વર ચોકડી ભરૂચ", time: "21:30" },
          { pointName: "સ્વામિનારાયણ મંદિર ભરૂચ", time: "21:45" }
        ]
      }
    ];
    
    const modotime = [
      {
        village: "અંકલેશ્વર",
        evillage: "Anklaswar",
        point: [
          { pointName: "વાલીયા ચોકડી  અંકલેશ્વર", time: "11:30" },
        ]
      },
      {
        village: "ભરૂચ",
        evillage: "Bharuch",
        point: [
          { pointName: "સ્વામિનારાયણ મંદિર ભરૂચ", time: "11:45" },
          { pointName: "ઝાડેશ્વર ચોકડી ભરૂચ", time: "11:50" },
        ]
      },
      {
        village: "વડોદરા",
        evillage: "Vadodara",
        point: [
          { pointName: "જામ્બા ચોકડી  વડોદરા", time: "13:30" },
          { pointName: "ગોલ્ડન ચોકડી  વડોદરા", time: "13:50" },
          { pointName: "વાઘોડિયા ચોકડી  વડોદરા", time: "14:05" },
          { pointName: "દુમાડ ચોકડી", time: "14:15" },
          { pointName: "આજવા ચોકડી", time: "14:30" },
          { pointName: "ફર્ટિલાઇઝર", time: "14:45" },
        ]
      },
      {
        village: "સુરત",
        evillage: "surat",
        point: [    { pointName: "વડલા પાર્કિંગ", time: "09:30" },
          { pointName: "રિદ્ધિ સિદ્ધિ", time: "09:45" },
          { pointName: "હિરાબાગ શ્રદ્ધા રેસ્ટોરન્ટ", time: "09:50" },
          { pointName: "નાના વરાછા ઈગલ ક્લાસીસ", time: "10:00" },
          { pointName: "સ્વામિનારાયણ પાર્કિંગ", time: "10:15" },
          { pointName: "વાલક પાટિયા", time: "10:20" },
          { pointName: "લસકાણા", time: "10:25" },
          { pointName: "પસોદરા પાટિયા ડેકોરા ફનીચર", time: "10:30" },
          { pointName: "ભવાની મંદિર કામરેજ", time: "10:35" },
          { pointName: "રાજ હોટેલ", time: "11:00" },
          { pointName: "કીમ ચોકડી", time: "11:20" },
          { pointName: "કોસબાં", time: "11:45" },
          { pointName: "પાલેજ", time: "12:10" },
        
        ]
      }
    ];
    
    
  export { Surat, village,getLabel,kabin2,kabin,number,labels,modotime,cabin,velotime };
  