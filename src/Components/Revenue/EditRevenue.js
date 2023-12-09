import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
        axios.put(`http://localhost:9091/api/revenue/edit/${id}`, config)
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
    }, [id, config]);

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
            console.error('Грешка при измена: ', error);
            setResponse('Неуспешна промена на приход. Обидете се повторно!');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    onChange={handleChange}
                    name='revenueSum'
                    placeholder="Сума МКД"
                />
                <input
                    type="date"
                    onChange={handleChange}
                    name='date'
                    placeholder="Датум"
                />
                <input
                    type="number"
                    onChange={handleChange}
                    name='seedAmountKg'
                    placeholder="Количина кг."
                />
                <input
                    type="hidden"
                    onChange={handleChange}
                    name='personId'
                    placeholder="Person"
                    value={formData.personId} // Set value from state
                    readOnly // Prevent user from editing the username field
                />
                <select name="seedId" onChange={handleChange} value={formData.seedId}>
                    <option value="" disabled>Select Seed</option>
                    {seeds.map(seed => (
                        <option key={seed.seedId} value={seed.seedId}>
                            {seed.seedName}
                        </option>
                    ))}
                </select>
                <button type='submit'> Ажурирај приход </button>
            </form>
        </div>
    );
}

export default EditRevenue;

