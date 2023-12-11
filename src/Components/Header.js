import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Header = () => {

    const navigate = useNavigate();
    // const username = getUserInfoFromToken();
    const user  = useAuth();
    // console.log('User is: ', user.username)
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
            <div className="collapse navbar-collapse mx-3">
                <ul className="navbar-nav mr-auto nav-list fw-medium">
                    <li className="nav-item">
                        <Link to="/plantation/all" className="menu-bar-items nav-link rounded-2"> Сеидби </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/yield/all" className="menu-bar-items nav-link rounded-2"> Приноси </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/expense/all" className="menu-bar-items nav-link rounded-2"> Трошоци </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/revenue/all" className="menu-bar-items nav-link rounded-2"> Приходи </Link>
                    </li>
                </ul>
                <span className="navbar-text">
                    <button className="nav-item btn btn-primary" onClick={handleLogout}>
                        Одјави се
                 </button>
                </span>
            </div>
        )
    }
    else {
        authenticate = (
            <div className="collapse navbar-collapse mx-3">
                <ul className="navbar-nav bd-navbar-nav flex-row">
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
            </div>
        )
    }

    return (
        <header className="navbar navbar-expand d-inline-flex justify-content-end bg-secondary-subtle flex-column flex-md-row bd-navbar px-2">
            <div className="navbar-nav-scroll" id="home">
                <a className="navbar-brand menu-bar-items rounded-2 p-2" href="/home"> Почетна </a>
            </div>
            <div className="navbar-nav-scroll">
                {authenticate}
            </div>
        </header>
    )
}

export default Header;