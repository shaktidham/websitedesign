import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Tablemanuplation: {
  
    // passengerdetails:false,
 
    // loading:false,
    
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
    
   
  },
});

// Export actions
export const { setPassengerDetails,setLoading } =InputSlice.actions;

// Export reducer
export default InputSlice.reducer;
