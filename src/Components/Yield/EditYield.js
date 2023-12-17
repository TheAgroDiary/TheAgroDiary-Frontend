import React, { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const EditYield = () => {

    const { id } = useParams();
    const [seeds, setSeeds] = useState([]);

    const [formData, setFormData] = useState({
        type: '',
        year: '',
        amountKg: '',
        personId: '',
        seedId: '',
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
        axios.get(`http://localhost:9091/api/yield/${id}`, config)
            .then((response) => {
                console.log('I am in .then')
                const { type, year, amountKg, seedId } = response.data;
                setFormData({ type, year, amountKg, seedId });
            })
            .catch((error) => {
                console.error("Error fetching Seed data: ", error);
            });
    }, [id]);

    useEffect(() => {
        // Fetch the list of seeds when the component mounts
        axios.get('http://localhost:9091/api/seed/seeds', config)
            .then(response => {
                setSeeds(response.data);
            })
            .catch(error => {
                console.error('Error fetching seeds: ', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`http://localhost:9091/api/yield/edit/${id}`, formData, config);
            setResponse(res.data);

            navigate('/yield/all');
        } catch (error) {
            console.error('Грешка при ажурирање: ', error);
            setResponse('Неуспешно ажурирање. Обидете се повторно!');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <form className="m-3 p-3 w-50 form-body" onSubmit={handleSubmit}>
                <label> Семе </label>
                <select name="seedId" className="form-control my-2" required onChange={handleChange} value={formData.seedId}>
                    <option value="" disabled> Одбери семе </option>
                    {seeds.map(seed => (
                        <option key={seed.seedId} value={seed.seedId}>
                            {seed.seedName}
                        </option>
                    ))}
                </select>
                <label> Сорта </label>
                <input
                    type="text"
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='type'
                    value={formData.type}
                    placeholder={formData.type}
                />
                <label> Година </label>
                <input
                    type="number"
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='year'
                    value={formData.year}
                    placeholder={formData.year}
                />
                <label> Количина кг. </label>
                <input
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='amountKg'
                    value={formData.amountKg}
                    placeholder={formData.amountKg}
                />
                <button type='submit' className="btn btn-success"> Ажурирај принос </button>
                <Link to="/yield/all" className="mx-3 btn btn-danger text-white"> Откажи </Link>
            </form>
        </div>
    );
}

export default EditYield;

