// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Register from './Components/Register';
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import UserProfile from "./Components/Profile/UserProfile";
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
import PlantationStatistics from "./Components/Statistics/PlantationStatistics";
import YieldStatistics from "./Components/Statistics/YieldStatistics";
import ExpenseStatistics from "./Components/Statistics/ExpenseStatistics";
import RevenueStatistics from "./Components/Statistics/RevenueStatistics";


function App() {
  return (
      <Router>
          <AuthProvider>
              <div className="d-flex flex-column min-vh-100">
                  <Header/>
                  <div>
                      <Routes>
                          <Route path='/protected' element={<PrivateRoute/>}/>
                          <Route path="/register" element={<Register/>}/>
                          <Route path="/login" element={<Login/>}/>

                          <Route path="/myProfile" element={<PrivateRoute/>}>
                              <Route path="/myProfile" element={<UserProfile/>}/>
                          </Route>
                          <Route path="/" element={<PrivateRoute/>}>
                              <Route path="/" element={<Home/>}/>
                          </Route>
                          <Route path="/home" element={<PrivateRoute/>}>
                              <Route path="/home" element={<Home/>}/>
                          </Route>
                          <Route path="/seed" element={<PrivateRoute/>}>
                              <Route path="/seed" element={<AddSeed/>}/>
                          </Route>
                          <Route path="/editSeed/:id" element={<PrivateRoute/>}>
                              <Route path="/editSeed/:id" element={<EditSeed/>}/>
                          </Route>
                          <Route path="/category" element={<PrivateRoute/>}>
                              <Route path="/category" element={<AddCategory/>}/>
                          </Route>
                          <Route path="/editCategory/:id" element={<PrivateRoute/>}>
                              <Route path="/editCategory/:id" element={<EditCategory/>}/>
                          </Route>
                          <Route path="/plantation/add" element={<PrivateRoute/>}>
                              <Route path="/plantation/add" element={<AddPlantation/>}/>
                          </Route>
                          <Route path="/plantation/all" element={<PrivateRoute/>}>
                              <Route path="/plantation/all" element={<ListPlantation/>}/>
                          </Route>
                          <Route path="/editPlantation/:id" element={<PrivateRoute/>}>
                              <Route path="/editPlantation/:id" element={<EditPlantation/>}/>
                          </Route>
                          <Route path="/deletePlantation/:id" element={<PrivateRoute/>}>
                              <Route path="/deletePlantation/:id" element={<DeletePlantation/>}/>
                          </Route>
                          <Route path="/plantation/statistics" element={<PrivateRoute/>}>
                              <Route path="/plantation/statistics" element={<PlantationStatistics/>}/>
                          </Route>
                          <Route path="/yield/add" element={<PrivateRoute/>}>
                              <Route path="/yield/add" element={<AddYield/>}/>
                          </Route>
                          <Route path="/yield/all" element={<PrivateRoute/>}>
                              <Route path="/yield/all" element={<ListYield/>}/>
                          </Route>
                          <Route path="/editYield/:id" element={<PrivateRoute/>}>
                              <Route path="/editYield/:id" element={<EditYield/>}/>
                          </Route>
                          <Route path="/yield/statistics" element={<PrivateRoute/>}>
                              <Route path="/yield/statistics" element={<YieldStatistics/>}/>
                          </Route>
                          <Route path="/expense/all" element={<PrivateRoute/>}>
                              <Route path="/expense/all" element={<ListExpense/>}/>
                          </Route>
                          <Route path="/expense/add" element={<PrivateRoute/>}>
                              <Route path="/expense/add" element={<AddExpense/>}/>
                          </Route>
                          <Route path="/editExpense/:id" element={<PrivateRoute/>}>
                              <Route path="/editExpense/:id" element={<EditExpense/>}/>
                          </Route>
                          <Route path="/expense/statistics" element={<PrivateRoute/>}>
                              <Route path="/expense/statistics" element={<ExpenseStatistics/>}/>
                          </Route>
                          <Route path="/revenue/all" element={<PrivateRoute/>}>
                              <Route path="/revenue/all" element={<ListRevenue/>}/>
                          </Route>
                          <Route path="/revenue/add" element={<PrivateRoute/>}>
                              <Route path="/revenue/add" element={<AddRevenue/>}/>
                          </Route>
                          <Route path="/editRevenue/:id" element={<PrivateRoute/>}>
                              <Route path="/editRevenue/:id" element={<EditRevenue/>}/>
                          </Route>
                          <Route path="/revenue/statistics" element={<PrivateRoute/>}>
                              <Route path="/revenue/statistics" element={<RevenueStatistics/>}/>
                          </Route>
                      </Routes>
                  </div>
                  <Footer/>
              </div>
          </AuthProvider>
      </Router>
  );
}

export default App;
