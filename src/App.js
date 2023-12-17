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
import AddPlantation from "./Components/Plantation/AddPlantation";
import ListPlantation from "./Components/Plantation/ListPlantation";
import EditPlantation from "./Components/Plantation/EditPlantation";
import DeletePlantation from "./Components/Plantation/DeletePlantation";
import AddYield from "./Components/Yield/AddYield";
import ListYield from "./Components/Yield/ListYield";
import EditYield from "./Components/Yield/EditYield";
import ListExpense from "./Components/Expense/ListExpense";
import AddCategory from "./Components/Category/AddCategory";
import EditCategory from "./Components/Category/EditCategory";
import AddExpense from "./Components/Expense/AddExpense";
import EditExpense from "./Components/Expense/EditExpense";
import ListRevenue from "./Components/Revenue/ListRevenue";
import AddRevenue from "./Components/Revenue/AddRevenue";
import EditRevenue from "./Components/Revenue/EditRevenue";
import {AuthProvider} from "./AuthContext";
import Logout from "./Components/Logout";
import PrivateRoute from "./Components/PrivateRoute";
import {Fragment} from "react";


function App() {
  return (
      <Router>
          {/*<Fragment>*/}
              <AuthProvider>
                  <div className="d-flex flex-column min-vh-100">
                      <Header/>
                      <div>
                          <Routes>
                              <Route path="/" element={<Home/>}/>
                              <Route path="/home" element={<Home/>}/>
                              <Route path="/register" element={<Register/>}/>
                              <Route path="/login" element={<Login/>}/>
                              {/*<Route path="/login" element={<Logout/>}/>*/}
                              <Route path="/seed" element={<AddSeed/>}/>
                              <Route path="/editSeed/:id" element={<EditSeed/>}/>
                              <Route path="/category" element={<AddCategory/>}/>
                              <Route path="/editCategory/:id" element={<EditCategory/>}/>
                              <Route path="/plantation/add" element={<AddPlantation/>}/>
                              <Route exact path='/plantation/all' element={<PrivateRoute/>}>
                                  <Route path="/plantation/all" element={<ListPlantation/>}/>
                              </Route>
                              {/*<PrivateRoute path="/plantation/all" element={<ListPlantation/>}/>*/}
                              <Route path="/editPlantation/:id" element={<EditPlantation/>}/>
                              <Route path="/deletePlantation/:id" element={<DeletePlantation/>}/>
                              <Route path="/yield/add" element={<PrivateRoute/>}>
                                  <Route path="/yield/add" element={<AddYield/>}/>
                              </Route>
                              <Route path="/yield/all" element={<PrivateRoute/>}>
                                  <Route path="/yield/all" element={<ListYield/>}/>
                              </Route>
                              <Route path="/editYield/:id" element={<PrivateRoute/>}>
                                  <Route path="/editYield/:id" element={<EditYield/>}/>
                              </Route>
                              <Route path="/expense/all" element={<ListExpense/>}/>
                              <Route path="/expense/add" element={<AddExpense/>}/>
                              <Route path="/editExpense/:id" element={<EditExpense/>}/>
                              <Route path="/revenue/all" element={<ListRevenue/>}/>
                              <Route path="/revenue/add" element={<AddRevenue/>}/>
                              <Route path="/editRevenue/:id" element={<EditRevenue/>}/>
                          </Routes>
                      </div>
                      <Footer/>
                  </div>
              </AuthProvider>
          {/*</Fragment>*/}
      </Router>
    // <div className="App">
    //   <Register/>
    // </div>
  );
}

export default App;
