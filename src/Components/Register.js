import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });

    const [response, setResponse] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ... formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post('http://localhost:9091/api/registration/register', formData);
            setResponse(res.data);
            setIsRegistered(true);
            // You can redirect to a different page or show a success message here.
            navigate('/login')
        }
        catch (error) {
            console.error('Грешка при регистрација: ', error);
            setResponse('Неуспешна регистрација. Обидете се повторно!')
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-50">
            {/*<h2 className="d-inline-flex"> Регистрирај се </h2>*/}
            <form className="m-3 w-25" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label> Име </label>
                    <input type="text"
                           id="firstName"
                           name="firstName"
                           placeholder="Име"
                           className="form-control"
                           onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label> Презиме </label>
                    <input type="text"
                           id="lastName"
                           name="lastName"
                           placeholder="Презиме"
                           className="form-control"
                           onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label> Корисничко име </label>
                    <input type="text"
                           id="username"
                           name="username"
                           placeholder="Корисничко име"
                           className="form-control"
                           onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label> Лозинка </label>
                    <input type="password"
                           id="password"
                           name="password"
                           placeholder="Лозинка"
                           className="form-control"
                           onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary my-3"> Регистрирај се </button>
            </form>
        </div>
    )

}

export default Register;