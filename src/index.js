// // src/index.js
// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import store from "./store";
// import App from "./App";

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Update the import to react-dom/client
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

// Create a root element for React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render your app using the new API
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
