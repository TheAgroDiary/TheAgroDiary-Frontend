import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditSeed = () => {

    const { id } = useParams();

    console.log("Id from above")
    console.log(id)

    const [formData, setFormData] = useState({
        seedName: '',
    });

    const [response, setResponse] = useState(null);

    const navigate = useNavigate();

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        // Fetch the seed data for editing when the component mounts
        axios.put(`http://localhost:9091/api/seed/edit/${id}`, config)
            .then((response) => {
                console.log('I am in .then')
                const { seedName } = response.data;
                setFormData({ seedName });
            })
            .catch((error) => {
                console.error("Error fetching Seed data: ", error);
            });
    }, [id, config]);

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
            setResponse('Неуспешна промена на семето. Обидете се повторно!');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    name='seedName'
                    value={formData.seedName}
                    placeholder={formData.seedName}
                />
                <button type='submit'>Edit Seed</button>
            </form>
        </div>
    );
}

export default EditSeed;

