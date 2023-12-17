import React, {useEffect} from 'react';
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

    const checkTokenExpiration = () => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode token payload
            const expirationTime = tokenData.exp * 1000; // Convert expiration time to milliseconds
            const currentTime = Date.now();

            // If the token is expired, log the user out
            if (expirationTime < currentTime) {
                localStorage.removeItem('jwt');
                navigate('/login');
            }
        }
    };

    // Check token expiration when the component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            checkTokenExpiration();
        }, 1000); // Check every second (adjust the interval as needed)

        return () => clearTimeout(timer); // Clear the timer on unmount
    }, []);

    return (
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;