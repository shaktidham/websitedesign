import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Tablemanuplation: {
    booked: false,
    
  },
};
const InputSlice = createSlice({
  name: "inputs",
  initialState,
  reducers: {
    setBooked: (state, action) => {
      state.Tablemanuplation.booked = action.payload;
    },
   
  },
});

// Export actions
export const { setBooked } =InputSlice.actions;

// Export reducer
export default InputSlice.reducer;
