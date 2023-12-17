import { Link, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isTokenValid = () => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode token payload
            const expirationTime = tokenData.exp * 1000; // Convert expiration time to milliseconds
            const currentTime = Date.now();

            // If the token is expired, remove it and return false
            if (expirationTime < currentTime) {
                localStorage.removeItem('jwt');
                return false;
            }
            return true;
        }
        return false;
    };

    return isTokenValid ? <Outlet /> : <Link to="/login"/>
};

export default PrivateRoute;
