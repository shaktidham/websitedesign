// import React, { useEffect } from 'react';
// import './App.css';
// import "./index.css";
// import Header from './userpages/header';
// import Main from './userpages/body/main';
// import Footer from './userpages/body/footer';
// import Seating from './userpages/body/seating';
// import { useSelector } from 'react-redux';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import ConformBookingDetails from './userpages/body/conformBooking/conformBookingDetails';
// import Loader from './userpages/Loader/Loader';
// import SuccessMsg from './userpages/body/conformBooking/successmsg';
// import Adminlogin from './adminpanel/adminLogin/adminlogin';
// import Village from './adminpanel/allpages/Village/village';
// import Home from './adminpanel/allpages/home';
// import Busshow from './adminpanel/allpages/BusAdd/busshow';
// import Busadd from './adminpanel/allpages/BusAdd/busAdd';
// import Cookies from 'js-cookie';
// import { jwtDecode } from "jwt-decode";
// import Bookingpage from './adminpanel/allpages/Booking/Bookingpage';
// import Bookingform from './adminpanel/allpages/Booking/bookingform';
// import Agentshow from './adminpanel/allpages/agentpage/agentshow';
// import { cleanDigitSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';

// function RedirectIfAuthenticated({ children }) {
//   const token = Cookies.get('authToken');
  

//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
     
//       if (decodedToken.role === 'superAdmin') {
//         // If the role is 'superAdmin', navigate to /home
//         return <Navigate to="/home" />;
//       }
//     } catch (error) {
//       return <Navigate to="/" />;
//     }
//   }
//   return children;
// }
// function RedirectHomepage({ children }) {
//   const token = Cookies.get('authToken');
  
//   if (!token) {
//     return <Navigate to="/adminlogin" />;
//   }

//   const decodedToken = jwtDecode(token);

//   if (decodedToken.role !== 'superAdmin') {
//     return <Navigate to="/" />;
//   }

//   return children; 
// }

// function App() {
//   const inputs = useSelector((state) => state.inputs);
//   const token = Cookies.get('authToken');

//   useEffect(() => {
   
//     if (token) {
//       try {
//         // Decode the token if needed
//         const decodedToken = jwtDecode(token);
        
//         // Check if the token has expired
//         const currentTime = Date.now() / 1000; // Current time in seconds
//         if (decodedToken.exp < currentTime) {
//           console.log('Token expired');
//           Cookies.remove('authToken'); // Remove expired token
//           window.location.reload(); // Optional: reload page to clear state
//         }
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//         Cookies.remove('authToken'); // Remove invalid token
//         window.location.reload(); // Optional: reload page to clear state
//       }
//     }
    
//   }, [token]);

//   return (
//     <Router>
//       <div className="App">
//         {/* Define your routes */}
//         <Routes>
//           <Route path="/" element={inputs.Tablemanuplation.loading ? <Loader /> : <Main />} />
//           <Route path="/AvailableRoutes" element={<Seating />} />
//           <Route path="/conformBooking" element={<ConformBookingDetails />} />
//           <Route path="/booksuccess" element={<SuccessMsg />} />
          
//           {/* Protect /adminlogin route, redirect if token exists */}
//           <Route
//             path="/adminlogin"
//             element={
//               <RedirectIfAuthenticated>
//                 <Adminlogin />
//               </RedirectIfAuthenticated>
//             }
//           />
//              <Route
//             path="/Agent"
//             element={
//               <RedirectHomepage>
//                 <Agentshow />
//               </RedirectHomepage>
//             }
//           />
//                <Route
//             path="/home"
//             element={
//               <RedirectHomepage>
//                 <Home />
//               </RedirectHomepage>
//             }
//           />
//                <Route
//             path="/Village"
//             element={
//               <RedirectHomepage>
//                 <Village />
//               </RedirectHomepage>
//             }
//           />
//                <Route
//             path="/Bus"
//             element={
//               <RedirectHomepage>
//                 <Busshow />
//               </RedirectHomepage>
//             }
//           />
//                <Route
//             path="/BusAdd"
//             element={
//               <RedirectHomepage>
//                 <Busadd />
//               </RedirectHomepage>
//             }
//           />
//                <Route
//             path="/Bookingpage"
//             element={
//               <RedirectHomepage>
//                 <Bookingpage />
//               </RedirectHomepage>
//             }
//           />
//                <Route
//             path="/Bookingform"
//             element={
//               <RedirectHomepage>
//                 <Bookingform />
//               </RedirectHomepage>
//             }
//           />

//           <Route path="/home" element={<Home />} />
//           <Route path="/Village" element={<Village />} />
//           <Route path="/Bus" element={<Busshow />} />
//           <Route path="/BusAdd" element={<Busadd />} />
//           <Route path="/Bookingpage" element={<Bookingpage />} />
//           <Route path="/Bookingform" element={<Bookingform />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useEffect } from 'react';
import './App.css';
import './index.css';
import Header from './userpages/header';
import Main from './userpages/body/main';
import Footer from './userpages/body/footer';
import Seating from './userpages/body/seating';
import ConformBookingDetails from './userpages/body/conformBooking/conformBookingDetails';
import Loader from './userpages/Loader/Loader';
import SuccessMsg from './userpages/body/conformBooking/successmsg';
import Adminlogin from './adminpanel/adminLogin/adminlogin';
import Village from './adminpanel/allpages/Village/village';
import Home from './adminpanel/allpages/home';
import Busshow from './adminpanel/allpages/BusAdd/busshow';
import Busadd from './adminpanel/allpages/BusAdd/busAdd';
import Bookingpage from './adminpanel/allpages/Booking/Bookingpage';
import Bookingform from './adminpanel/allpages/Booking/bookingform';
import Agentshow from './adminpanel/allpages/agentpage/agentshow';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = Cookies.get('authToken');

  if (!token) {
    return <Navigate to="/adminlogin" />;
  }

  try {
    const decodedToken = jwtDecode(token);

    if (roleRequired && decodedToken.role !== roleRequired) {
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    Cookies.remove('authToken');
    return <Navigate to="/adminlogin" />;
  }
};

function App() {
  const inputs = useSelector((state) => state.inputs);
  const token = Cookies.get('authToken');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          Cookies.remove('authToken');
          window.location.reload();
        }
      } catch (error) {
        Cookies.remove('authToken');
        window.location.reload();
      }
    }
  }, [token]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={inputs.Tablemanuplation.loading ? <Loader /> : <Main />} />
          <Route path="/AvailableRoutes" element={<Seating />} />
          <Route path="/conformBooking" element={<ConformBookingDetails />} />
          <Route path="/booksuccess" element={<SuccessMsg />} />

          {/* Admin Routes with Protection */}
          <Route
            path="/adminlogin"
            element={<Adminlogin />}
           
          />
          <Route
            path="/Agent"
            element={<ProtectedRoute children={<Agentshow />} roleRequired="superAdmin" />}
          />
          <Route
            path="/home"
            element={<ProtectedRoute children={<Home />} roleRequired="superAdmin" />}
          />
          <Route
            path="/Village"
            element={<ProtectedRoute children={<Village />} roleRequired="superAdmin" />}
          />
          <Route
            path="/Bus"
            element={<ProtectedRoute children={<Busshow />} roleRequired="superAdmin" />}
          />
          <Route
            path="/BusAdd"
            element={<ProtectedRoute children={<Busadd />} roleRequired="superAdmin" />}
          />
          <Route
            path="/Bookingpage"
            element={<ProtectedRoute children={<Bookingpage />} roleRequired="superAdmin" />}
          />
          <Route
            path="/Bookingform"
            element={<ProtectedRoute children={<Bookingform />} roleRequired="superAdmin" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
