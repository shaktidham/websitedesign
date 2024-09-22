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

function App() {
  const inputs = useSelector((state) => state.inputs);

  return (
    <Router>
      <div className="App">
        <Header />
        
        {/* Conditionally render the Main component */}
        {inputs?.Tablemanuplation?.booked !== true && <Main />}
        
        {/* You can conditionally render Seating as well if needed */}
        {/* {inputs.Tablemanuplation.booked && <Seating />} */}
        
       

        {/* Define your routes */}
        <Routes>
          <Route path="/AvailbleRoutes" element={<Seating />} />
        </Routes>

        <Footer />
      </div>
    </Router>
 
  );
}

export default App;
