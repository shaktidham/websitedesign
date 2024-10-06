import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import "./App.css";
import "./index.css";
import Header from "./userpages/header";
import Main from "./userpages/body/main";
import Footer from "./userpages/body/footer";
import Seating from "./userpages/body/seating";
import ConformBookingDetails from "./userpages/body/conformBooking/conformBookingDetails";
import Loader from "./userpages/Loader/Loader";
import SuccessMsg from "./userpages/body/conformBooking/successmsg";
import TicketShow from "./userpages/Ticektshow"; // Renamed for consistency
import AdminLogin from './adminpanel/adminLogin/adminlogin';
import AdminHomePage from "./adminpanel/allpages/adminHomePage";
import Form from "./adminpanel/allpages/form";
import PrivateRoute from "./PrivateRoute";
import RouteAdd from "./adminpanel/allpages/routeshow";
import RouteShow from "./adminpanel/allpages/routeshow";

function App() {
  const inputs = useSelector((state) => state.inputs);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp >= currentTime) {
          setIsTokenValid(true);
        } else {
          Cookies.remove("authToken");
          setIsTokenValid(false);
          console.log("Token expired");
        }
      } catch (error) {
        Cookies.remove("authToken");
        setIsTokenValid(false);
        console.error("Invalid token:", error);
      }
    } else {
      setIsTokenValid(false);
      console.log("No token found");
    }
  }, []);

  return (
    <div className="App">
      <Router>
      
        <Routes>
          <Route
            path="/"
            element={inputs.Tablemanuplation.loading ? <Loader /> : <Main />}
          />
          <Route path="/AvailableRoutes" element={<Seating />} />
          <Route path="/conformBooking" element={<ConformBookingDetails />} />
          <Route path="/booksuccess" element={<SuccessMsg />} />
          <Route path="/MyBooking" element={<TicketShow />} />
          
          {/* Admin routes */}
          <Route path="/adminlogin" element={isTokenValid ? <Navigate to="/adminHome" /> : <AdminLogin />} />
          <Route path="/routeshow" element={<RouteShow />} />
          <Route
            path="/adminHome"
            element={
              <PrivateRoute>
                <AdminHomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/adminform"
            element={
              <PrivateRoute>
                <Form />
              </PrivateRoute>
            }
          />
        </Routes>
    
      </Router>
    </div>
  );
}

export default App;
