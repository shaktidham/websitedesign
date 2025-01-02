import React, { useEffect } from 'react';
import './App.css';
import "./index.css";
import Header from './userpages/header';
import Main from './userpages/body/main';
import Footer from './userpages/body/footer';
import Seating from './userpages/body/seating';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ConformBookingDetails from './userpages/body/conformBooking/conformBookingDetails';
import Loader from './userpages/Loader/Loader';
import SuccessMsg from './userpages/body/conformBooking/successmsg';
import Adminlogin from './adminpanel/adminLogin/adminlogin';
import Village from './adminpanel/allpages/Village/village';
import Home from './adminpanel/allpages/home';
import Busshow from './adminpanel/allpages/BusAdd/busshow';
import Busadd from './adminpanel/allpages/BusAdd/busAdd';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Bookingpage from './adminpanel/allpages/Booking/Bookingpage';
import Bookingform from './adminpanel/allpages/Booking/bookingform';

function RedirectIfAuthenticated({ children }) {
  const token = Cookies.get('authToken');
  
  // If token exists, redirect to /home, else render the children
  if (token) {
    return <Navigate to="/home" />;
  }
  
  return children;
}

function App() {
  const inputs = useSelector((state) => state.inputs);
  const token = Cookies.get('authToken');

  useEffect(() => {
   
    if (token) {
      try {
        // Decode the token if needed
        const decodedToken = jwtDecode(token);
        
        // Check if the token has expired
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp < currentTime) {
          console.log('Token expired');
          Cookies.remove('authToken'); // Remove expired token
          window.location.reload(); // Optional: reload page to clear state
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        Cookies.remove('authToken'); // Remove invalid token
        window.location.reload(); // Optional: reload page to clear state
      }
    }
    
  }, [token]);

  return (
    <Router>
      <div className="App">
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={inputs.Tablemanuplation.loading ? <Loader /> : <Main />} />
          <Route path="/AvailableRoutes" element={<Seating />} />
          <Route path="/conformBooking" element={<ConformBookingDetails />} />
          <Route path="/booksuccess" element={<SuccessMsg />} />
          
          {/* Protect /adminlogin route, redirect if token exists */}
          <Route
            path="/adminlogin"
            element={
              <RedirectIfAuthenticated>
                <Adminlogin />
              </RedirectIfAuthenticated>
            }
          />

          <Route path="/home" element={<Home />} />
          <Route path="/Village" element={<Village />} />
          <Route path="/Bus" element={<Busshow />} />
          <Route path="/BusAdd" element={<Busadd />} />
          <Route path="/Bookingpage" element={<Bookingpage />} />
          <Route path="/Bookingform" element={<Bookingform />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
