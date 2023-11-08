import React from 'react';
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the JWT token from localStorage or cookies
        localStorage.removeItem('jwt'); // For localStorage

        // Redirect the user to the login page or another appropriate page
        // You can use React Router to do this
        navigate('/login')
    };

    return (
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;