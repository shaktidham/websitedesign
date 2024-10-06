import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Tablemanuplation: {
    passengerdetails:false,
    loading:false,
    seatnumber: null,
    date: null,
    openpop: false,
    msgdata: [],
    totalsit: [],
    sortdata: [],
    busdetails: [],
    routeadd:false,
    fulldetails:false,
    
  },
};
const InputSlice = createSlice({
  name: "inputs",
  initialState,
  reducers: {
 
    setPassengerDetails: (state, action) => {
      state.Tablemanuplation.passengerdetails = action.payload;
    },
  
    setLoading: (state, action) => {
      state.Tablemanuplation.loading = action.payload;
    },
    setSeatNumber: (state, action) => {
      state.Tablemanuplation.seatnumber = action.payload;
    },
    setDate: (state, action) => {
      state.Tablemanuplation.date = action.payload;
    },
    setPopbox: (state, action) => {
      state.Tablemanuplation.date = action.payload;
    },
    setMsgdata: (state, action) => {
      state.Tablemanuplation.msgdata = action.payload;
    },
    setBusDetails: (state, action) => {
      state.Tablemanuplation.busdetails = action.payload;
    },
    setSortdata: (state, action) => {
      state.Tablemanuplation.sortdata = action.payload;
    },
    setTotalsit: (state, action) => {
      state.Tablemanuplation.totalsit = action.payload;
    },
    setRouteadd: (state, action) => {
      state.Tablemanuplation.routeadd = action.payload;
    },
    setFulldetails: (state, action) => {
      state.Tablemanuplation.fulldetails = action.payload;
    },
    
   
  },
});

// Export actions
export const { setPassengerDetails,setLoading, setSeatNumber,
  setDate,
  setPopbox,
  setMsgdata,
  setRouteadd,
  setBusDetails,
  setSortdata,
  setTotalsit,setFulldetails } =InputSlice.actions;

// Export reducer
export default InputSlice.reducer;
