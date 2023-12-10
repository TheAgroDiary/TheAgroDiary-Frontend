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
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/plantation/all"> Сеидби </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/yield/all"> Приноси </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/expense/all"> Трошоци </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/revenue/all"> Приходи </a>
                        </li>
                    </ul>
                    <span className="navbar-text float-end">
                        <button className="nav-item btn btn-primary" onClick={handleLogout}>
                            Одјави се
                     </button>
                    </span>
                </div>
            </nav>
        )
    }
    else {
        authenticate = (
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
        )
    }

    return (
        <header className="navbar navbar-expand bg-success flex-column flex-md-row bd-navbar px-2">
            <a className="navbar-brand" href="/home"> Почетна </a>
            <div className="navbar-nav-scroll justify-content-end float-end">
                {authenticate}
            </div>
        </header>
    )
}

export default Header;