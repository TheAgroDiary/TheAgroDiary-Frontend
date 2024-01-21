import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditSeed = () => {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        seedName: '',
    });

    const [response, setResponse] = useState(null);

    const navigate = useNavigate();

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        // Fetch the seed data for editing when the component mounts
        axios.get(`http://localhost:9091/api/seed/${id}`, config)
            .then((response) => {
                const { seedName } = response.data;
                setFormData({ seedName });
            })
            .catch((error) => {
                console.error("Error fetching Seed data: ", error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`http://localhost:9091/api/seed/edit/${id}`, formData, config);
            setResponse(res.data);

            navigate('/home');
        } catch (error) {
            console.error('Грешка при измена: ', error);
            setResponse('Неуспешна промена. Обидете се повторно!');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <form className="m-3 p-3 w-50 form-body" onSubmit={handleSubmit}>
                <label> Семе </label>
                <input
                    type="text"
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='seedName'
                    value={formData.seedName}
                    placeholder={formData.seedName}
                />
                <button type='submit' className="btn btn-success"> Ажурирај семе </button>
                <Link to="/home" className="mx-3 btn btn-danger text-white"> Откажи </Link>
            </form>
        </div>
    );
}

export default EditSeed;

