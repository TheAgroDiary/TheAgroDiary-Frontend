import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // User information, including username

    // Load user information from JWT token on component mount
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            try {
                // Decode the JWT and extract user data
                const decoded = jwtDecode(token);
                const userData = {username: decoded.sub};
                setUser(userData);
                console.log("username is: ", userData)
            }
            catch (error) {
                console.error("Error decoding the token: ", error)
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

// export function useAuth() {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// }