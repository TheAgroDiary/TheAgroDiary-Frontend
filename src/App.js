// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from './Components/Register'
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import AddSeed from "./Components/Seed/AddSeed";
import EditSeed from "./Components/Seed/EditSeed";
import {Component} from "react";
import TheAgroDiaryService from "./Repository/TheAgroDiaryService";
import Seed from "./Components/Seed/Seed";
import ListSeed from "./Components/Seed/ListSeed";

// function App() {
//   return (
//       <Router>
//           <Header/>
//           <div>
//               <Routes>
//                   <Route path="/" element={<Home/>}/>
//                   <Route path="/home" element={<Home/>}/>
//                   <Route path="/register" element={<Register/>}/>
//                   <Route path="/login" element={<Login/>}/>
//                   <Route path="/seed" element={<AddSeed/>}/>
//                   <Route path="/editSeed/:id" element={<EditSeed/>}/>
//               </Routes>
//           </div>
//           <Footer/>
//       </Router>
//   );
// }
//
// export default App;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seeds: [],
            selectedSeed: {},
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        this.loadSeeds();
    };

    loadSeeds = () => {
        TheAgroDiaryService.fetchSeeds().then((data) => {
            this.setState({
                seeds: data.data,
            });
        });
    };

    addSeed = (seedName) => {
        TheAgroDiaryService.addSeed(seedName).then(() => {
            this.loadSeeds();
        });
    };

    getSeed = (id) => {
        TheAgroDiaryService.getSeed(id).then((data) => {
            this.setState({
                selectedSeed: data.data,
            });
        });
    };

    editSeed = (id, seedName) => {
        TheAgroDiaryService.editSeed(id, seedName).then(() => {
            this.loadSeeds();
        });
    };

    render() {
        return (
            <Router>
                <Header />
                <main>
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login/>} />
                            <Route
                                path="/addSeed"
                                element={<AddSeed seeds={this.state.seeds} onAddSeed={this.addSeed} />}
                            />
                            <Route
                                path="/editSeed/:id"
                                element={
                                    <EditSeed
                                        seeds={this.state.seeds}
                                        onEditSeed={this.editSeed}
                                        seed={this.state.selectedSeed}
                                    />
                                }
                            />
                            {/* Add other routes as needed */}
                            <Route path="/seeds" element={<ListSeed/>} />
                        </Routes>
                    </div>
                </main>
                <Footer />
            </Router>
        );
    }
}

export default App;
