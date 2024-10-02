import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Tablemanuplation: {
    booked: false,
    AllRoute:[],
    searchdata:[],
    passengerdetails:false,
    bookdetails:[],
    loading:false,
    
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
    setBookDetails: (state, action) => {
      state.Tablemanuplation.bookdetails = action.payload;
    },
    setLoading: (state, action) => {
      state.Tablemanuplation.loading = action.payload;
    },
    
   
  },
});

// Export actions
export const { setBooked,setShowAllRoute,setSearchData,setPassengerDetails,setBookDetails,setLoading } =InputSlice.actions;

// Export reducer
export default InputSlice.reducer;
