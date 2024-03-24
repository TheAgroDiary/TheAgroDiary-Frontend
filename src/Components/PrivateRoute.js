import { Link, Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const isTokenValid = () => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode token payload
            const expirationTime = tokenData.exp * 1000; // Convert expiration time to milliseconds
            const currentTime = Date.now();

            // If the token is expired, remove it and navigate to login
            if (expirationTime < currentTime) {
                console.log('Expiration time is less than current time')
                console.log(expirationTime, currentTime)
                localStorage.removeItem('jwt');
                return false;
            }
            return true;
        }
        return false;
    };

    return isTokenValid() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
