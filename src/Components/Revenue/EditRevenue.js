import React, { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const EditRevenue = () => {

    const { id } = useParams();
    const [seeds, setSeeds] = useState([]);

    const [formData, setFormData] = useState({
        revenueSum: '',
        date: '',
        seedAmountKg: '',
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
        axios.get(`http://localhost:9091/api/revenue/${id}`, config)
            .then((response) => {
                console.log('I am in .then')
                const {
                    revenueSum,
                    date,
                    seedAmountKg,
                    personId,
                    seedId,
                } = response.data;
                setFormData({
                    revenueSum,
                    date,
                    seedAmountKg,
                    personId,
                    seedId,
                });
            })
            .catch((error) => {
                console.error("Error fetching Revenue data: ", error);
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
            const res = await axios.put(`http://localhost:9091/api/revenue/edit/${id}`, formData, config);
            setResponse(res.data);

            navigate('/revenue/all');
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
                <label> Количина кг. </label>
                <input
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='seedAmountKg'
                    value={formData.seedAmountKg}
                    placeholder={formData.seedAmountKg}
                />
                <label> Износ мкд </label>
                <input
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='revenueSum'
                    value={formData.revenueSum}
                    placeholder={formData.revenueSum}
                />
                <label> Датум </label>
                <input
                    type="date"
                    className="form-control my-2"
                    onChange={handleChange}
                    name='date'
                    value={formData.date}
                    placeholder={formData.date}
                />
                <button type='submit' className="btn btn-success"> Ажурирај приход </button>
                <Link to="/revenue/all" className="mx-3 btn btn-danger text-white"> Откажи </Link>
            </form>
        </div>
    );
}

export default EditRevenue;

