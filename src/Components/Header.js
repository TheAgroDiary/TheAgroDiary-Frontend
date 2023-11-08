import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import getUserInfoFromToken from "./JWTUtils";
import { useAuth } from "../AuthContext";

const Header = () => {

    const navigate = useNavigate();
    // const username = getUserInfoFromToken();
    const user  = useAuth();
    console.log('User is: ', user)
    let authenticate;

    const handleLogout = () => {
        // Clear the JWT token from localStorage or cookies
        localStorage.removeItem('jwt'); // For localStorage

        // Redirect the user to the login page or another appropriate page
        // You can use React Router to do this
        navigate('/login')
    };

    if (localStorage.getItem('jwt')) {
        authenticate = (
            <ul>
                <h3> {user} </h3>
                <button className="btn btn-primary" onClick={handleLogout}>
                    Одјави се
                </button>
            </ul>

        )
    }
    else {
        authenticate = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        <button className="btn btn-success"> Најави се </button>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        <button className="btn btn-primary"> Регистрирај се </button>
                    </Link>
                </li>
            </ul>
        )
    }

    return (
        <header className="bg-gradient bg-secondary-subtle">
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    {/* Left Side - Home and Other Links */}
                    <div className="navbar-collapse justify-content-start">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link text-dark fw-bold">
                                    Почетна
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link"> Друго </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right Side - Login/Logout */}
                    <div className="navbar-collapse justify-content-end">
                        {authenticate}
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Header;