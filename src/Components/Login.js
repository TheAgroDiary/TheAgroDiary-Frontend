import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9091/api/authentication/authenticate', formData); // Send login request to the backend
            const { jwt } = response.data;

            // Store the JWT token in localStorage or cookies
            localStorage.setItem('jwt', jwt);

            // Redirect to a protected page
            navigate('/home')
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100-50">
            <form className="m-3 w-25" onSubmit={handleLogin}>
                <div className="form-group">
                    <label> Корисничко име </label>
                    <input type="text"
                           name="username"
                           placeholder="Username"
                           value={formData.username}
                           onChange={handleInputChange}
                           className="form-control"
                           placeholder="Корисничко име"/>
                </div>
                <div className="form-group">
                    <label> Лозинка </label>
                    <input type="password"
                           name="password"
                           placeholder="Password"
                           value={formData.password}
                           onChange={handleInputChange}
                           className="form-control"
                           placeholder="Лозинка"/>
                </div>
                <button type="submit" className="btn btn-primary my-3"> Најави се </button>
            </form>
        </div>

    );
};

export default Login;