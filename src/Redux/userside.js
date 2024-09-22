import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Tablemanuplation: {
    booked: false,
    AllRoute:[],
    searchdata:[],
    passengerdetails:false,
    
  },
};
const InputSlice = createSlice({
  name: "inputs",
  initialState,
  reducers: {
    setBooked: (state, action) => {
      state.Tablemanuplation.booked = action.payload;
    },
    setShowAllRoute: (state, action) => {
      state.Tablemanuplation.AllRoute = action.payload;
    },
    setSearchData: (state, action) => {
      state.Tablemanuplation.searchdata = action.payload;
    },
    setPassengerDetails: (state, action) => {
      state.Tablemanuplation.passengerdetails = action.payload;
    },
   
  },
});

// Export actions
export const { setBooked,setShowAllRoute,setSearchData,setPassengerDetails } =InputSlice.actions;

// Export reducer
export default InputSlice.reducer;
