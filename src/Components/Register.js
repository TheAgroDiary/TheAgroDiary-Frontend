import React, {useState} from 'react';
// import {useHistory} from 'react-router-dom';
import Link from 'react-router-dom';
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

    // const history = useHistory();

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
            // history.push('http://localhost:9091/api/authentication/authenticate')
        }
        catch (error) {
            console.error('Грешка при регистрација: ', error);
            setResponse('Неуспешна регистрација. Обидете се повторно!')
        }
    };

    return (
        <div>
            <h2> Регистрација </h2>
            {isRegistered ? (
                <div>
                    <p> Успешна регистрација! </p>
                    <p> Име: {response.firstName} </p>
                    <p> Презиме: {response.lastName} </p>
                    <p> Корисничко име: {response.username} </p>
                    <p> Лозинка: {response.password} </p>
                </div>
            ) : (
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
            )}
            {/*{typeof response === 'string' ? (*/}
            {/*    <p> {response} </p>*/}
            {/*) : (*/}
            {/*    <div>*/}
            {/*        <p> Успешна регистрација! </p>*/}
            {/*        <p> Име: {response.firstName} </p>*/}
            {/*        <p> Презиме: {response.lastName} </p>*/}
            {/*        <p> Корисничко име: {response.username} </p>*/}
            {/*        <p> Лозинка: {response.password} </p>*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*{response && <p> {response} </p>}*/}
            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="firstName"> Име </label>*/}
            {/*        <input type="text" id="firstName" name="firstName" onChange={handleChange} required />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="lastName"> Презиме </label>*/}
            {/*        <input type="text" id="lastName" name="lastName" onChange={handleChange} required />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="username"> Корисничко име </label>*/}
            {/*        <input type="text" id="username" name="username" onChange={handleChange} required />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="password"> Лозинка </label>*/}
            {/*        <input type="password" id="password" name="password" onChange={handleChange} required />*/}
            {/*    </div>*/}
            {/*    <button type="submit"> Потврди </button>*/}
            {/*</form>*/}
        </div>
    )

}

export default Register;