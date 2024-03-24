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

    let home = (
        <a id="home" className="text-light text-opacity-75 navbar-brand rounded-2 p-2" href="/home">
            <img src="./assets/images/logo3.png" className="logo" alt="Почетна"/>
        </a>
    )

    if (localStorage.getItem('jwt')) {
        authenticate = (
            <div className="container-fluid">
                {home}
                <ul className="my-list navbar-nav d-flex flex-row me-1">
                    <li className="nav-item me-3 me-lg-0 fw-medium">
                        <Link to="/plantation/all" className="menu-bar-items nav-link rounded-2"> Сеидби </Link>
                    </li>
                    <li className="nav-item me-3 me-lg-0 fw-medium">
                        <Link to="/yield/all" className="menu-bar-items nav-link rounded-2"> Приноси </Link>
                    </li>
                    <li className="nav-item me-3 me-lg-0 fw-medium">
                        <Link to="/expense/all" className="menu-bar-items nav-link rounded-2"> Трошоци </Link>
                    </li>
                    <li className="nav-item me-3 me-lg-0 fw-medium">
                        <Link to="/revenue/all" className="menu-bar-items nav-link rounded-2"> Приходи </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle fw-medium" href="#" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-user mx-1"></i> Профил
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-nav-list" aria-labelledby="navbarDropdown">
                            <li>
                                <Link to="/myProfile" className="ropdown-item fw-medium unlink"
                                      style={{ textDecoration: 'none' }}>
                                    <button className="dropdown-item fw-medium" href="/myProfile">
                                        Мој профил
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <button className="dropdown-item fw-medium" onClick={handleLogout}> Одјави се </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
    else {
        authenticate = (
            <div className="container-fluid">
                {home}
                <ul className="navbar-nav d-flex flex-row me-1">
                    <li className="nav-item me-3 me-lg-0 fw-medium">
                        <Link to="/login" className="menu-bar-items nav-link rounded-2 fw-medium"> Најави се </Link>
                    </li>
                    <li className="nav-item me-3 me-lg-0 fw-medium">
                        <Link to="/register" className="menu-bar-items nav-link rounded-2 fw-medium"> Регистрирај се </Link>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navigation-bar">
            {authenticate}
        </nav>
    )
}

export default Header;