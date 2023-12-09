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
        <div>
            <h2> Регистрација </h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName"> Име </label>
                        <input type="text" id="firstName" name="firstName" onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lastName"> Презиме </label>
                        <input type="text" id="lastName" name="lastName" onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="username"> Корисничко име </label>
                        <input type="text" id="username" name="username" onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="password"> Лозинка </label>
                        <input type="password" id="password" name="password" onChange={handleChange} required />
                    </div>
                    <button type="submit"> Потврди </button>
                </form>

        </div>
    )

}

export default Register;