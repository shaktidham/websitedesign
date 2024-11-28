import logo from './logo.svg';
import './App.css';
import "./index.css";
import Header from './userpages/header';
import Main from './userpages/body/main';
import Footer from './userpages/body/footer';
import Seating from './userpages/body/seating';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConformBookingDetails from './userpages/body/conformBooking/conformBookingDetails';
import Loader from './userpages/Loader/Loader';
import SuccessMsg from './userpages/body/conformBooking/successmsg';
import Adminlogin from './adminpanel/adminLogin/adminlogin';
import Village from './adminpanel/allpages/Village/village';
import Home from './adminpanel/allpages/home';
import Busshow from './adminpanel/allpages/BusAdd/busshow';
import Busadd from './adminpanel/allpages/BusAdd/busAdd';
import Bookinghomepage from './adminpanel/allpages/Booking/bookinghomepage';
import Bookingpage from './adminpanel/allpages/Booking/Bookingpage';
import Bookingform from './adminpanel/allpages/Booking/bookingform';



function App() {
  const inputs = useSelector((state) => state.inputs);

  return (
    <Router>
      <div className="App">
    
        
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={inputs.Tablemanuplation.loading ? <Loader /> : <Main />} />
          <Route path="/AvailableRoutes" element={<Seating />} />
          {/* Add other routes as needed */}
          <Route path="/conformBooking" element={<ConformBookingDetails />} />
          <Route path="/booksuccess" element={<SuccessMsg />} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Village" element={<Village />} />
          <Route path="/Bus" element={<Busshow />} />
          <Route path="/BusAdd" element={<Busadd />} />
          <Route path="/Bookinghomepage" element={<Bookinghomepage />} />
          <Route path="/Bookingpage" element={<Bookingpage />} />
          <Route path="/Bookingform" element={<Bookingform />} />
    
        </Routes>

      </div>
    </Router>
  );
}

export default App;
