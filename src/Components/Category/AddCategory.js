import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";



const AddCategory = () => {
    const [formData, setFormData] = useState({
        categoryName: ''
    });

    const [response, setResponse] = useState(null);

    const navigate = useNavigate();

    const token = localStorage.getItem('jwt')
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({... formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:9091/api/category/add', formData, config);
            setResponse(res.data);
            navigate('/categories')
        }
        catch (error) {
            console.error('Грешка при додавање: ', error);
            setResponse('Неуспешно додавање на категорија. Обидете се повторно!')
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    name='categoryName'
                    placeholder="Име на категорија"
                />
                <button type='submit'> Додади категорија </button>
            </form>
        </div>
    );
}

export default AddCategory;
