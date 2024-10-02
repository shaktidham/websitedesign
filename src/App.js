import logo from './logo.svg';
import './App.css';
import "./index.css";
import Header from './pages/header';
import Main from './pages/body/main';
import Footer from './pages/body/footer';
import Seating from './pages/body/seating';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConformBookingDetails from './pages/body/conformBooking/conformBookingDetails';
import Loader from './pages/Loader/Loader';
import SuccessMsg from './pages/body/conformBooking/successmsg';

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
        </Routes>

      </div>
    </Router>
  );
}

export default App;
