import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:9091/api/category/add',
                formData,
                config);
            setResponse(res.data);
            navigate('/home')
        }
        catch (error) {
            console.error('Грешка при додавање: ', error);
            setResponse('Неуспешно додавање на категорија. Обидете се повторно!')
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({... formData, [name]: value});
    };


    return (
        <div className="d-flex justify-content-center align-items-center">
            <form className="m-3 p-3 w-50 form-body" onSubmit={handleSubmit}>
                <label> Категорија </label>
                <input
                    type="text"
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='categoryName'
                    placeholder="Категорија"
                />
                <button type='submit' className="btn btn-success"> Додади категорија </button>
                <Link to="/home" className="mx-3 btn btn-danger text-white"> Откажи </Link>
            </form>
        </div>
    );
}

export default AddCategory;
