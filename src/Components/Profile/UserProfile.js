import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {

    const [person, setPerson] = useState([]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
    });
    const [initialFormData, setInitialFormData] = useState({});
    const [response, setResponse] = useState(null);
    const [isFormModified, setIsFormModified] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        fetchPersonInfo();
    }, []);

    const fetchPersonInfo = () => {
        axios.get('http://localhost:9091/api/user/info', config)
            .then(response => {
                // Sort the plantations by updatedAt or createdAt in descending order
                const personInfo = response.data;
                const { firstName, lastName, username, password } = response.data;
                setFormData({ firstName, lastName, username, password });
                setPerson(personInfo);
            })
            .catch(error => {
                console.error('Error fetching person: ', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setIsFormModified(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if the password field is empty before submitting
        // const shouldUpdatePassword = formData.password.trim() !== '';

        try {
            const res = await axios.put(`http://localhost:9091/api/user/editUser`, formData, config);
            setResponse(res.data);

            navigate('/myProfile');
        } catch (error) {
            console.error('Грешка при измена: ', error);
            setResponse('Неуспешно ажурирање. Обидете се повторно!');
        }

        // After submitting, reset the form modification state
        setIsFormModified(false);
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <form className="m-3 p-3 w-50 form-body" onSubmit={handleSubmit}>
                <label> Корисничко име </label>
                <input
                    type="text"
                    className="form-control my-2"
                    readOnly
                    disabled
                    onChange={handleChange}
                    name='username'
                    value={formData.username}
                    placeholder={formData.username}/>
                <label> Име </label>
                <input
                    type="text"
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='firstName'
                    value={formData.firstName}
                    placeholder={formData.firstName}/>
                <label> Презиме </label>
                <input
                    type="text"
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='lastName'
                    value={formData.lastName}
                    placeholder={formData.lastName}/>
                <label> Нова лозинка </label>
                <input
                    type="password"
                    className="form-control my-2"
                    onChange={handleChange}
                    name='password'/>

                {isFormModified && (
                    <button type="submit" className="btn btn-primary mt-3"> Зачувај ги промените </button>
                )}
            </form>
        </div>
    )
}

export default UserProfile;