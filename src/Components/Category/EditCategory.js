import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCategory = () => {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        categoryName: '',
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
        axios.put(`http://localhost:9091/api/category/edit/${id}`, config)
            .then((response) => {
                console.log('I am in .then')
                const { categoryName } = response.data;
                setFormData({ categoryName });
            })
            .catch((error) => {
                console.error("Error fetching Category data: ", error);
            });
    }, [id, config]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`http://localhost:9091/api/category/edit/${id}`, formData, config);
            setResponse(res.data);

            navigate('/categories');
        } catch (error) {
            console.error('Грешка при измена: ', error);
            setResponse('Неуспешна промена на категорија. Обидете се повторно!');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    name='categoryName'
                    value={formData.categoryName}
                    placeholder={formData.categoryName}
                />
                <button type='submit'> Ажурирај категорија </button>
            </form>
        </div>
    );
}

export default EditCategory;

