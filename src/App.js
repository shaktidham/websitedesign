import logo from './logo.svg';
import './App.css';
import "./index.css"
import Header from './pages/header';
import Hero from './pages/body/hero';
import Main from './pages/body/main';

function App() {
  return (
    <div className="App">
      <Header />
      <Main  />
    </div>
  );
}

export default App;
