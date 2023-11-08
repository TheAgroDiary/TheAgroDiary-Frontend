// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Register from './Components/Register'
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import AddSeed from "./Components/Seed/AddSeed";
import EditSeed from "./Components/Seed/EditSeed";

function App() {
  return (
      <Router>
          <Header/>
          <div>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/seed" element={<AddSeed/>}/>
                  <Route path="/editSeed/:id" element={<EditSeed/>}/>
              </Routes>
          </div>
          <Footer/>
      </Router>
    // <div className="App">
    //   <Register/>
    // </div>
  );
}

export default App;
