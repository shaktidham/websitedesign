import { configureStore } from "@reduxjs/toolkit";

import inputReducer from "./Redux/userside";

const store = configureStore({
  reducer: {
    inputs: inputReducer,
  },
});

export default store;