import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AddYield = () => {
    const [formData, setFormData] = useState({
        type: '',
        year: '',
        amountKg: '',
        personId: '',
        seedId: '',
    });

    const [seeds, setSeeds] = useState([]);
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
                'http://localhost:9091/api/yield/add',
                formData,
                config
            );
            const data = res.data;
            console.log('Response:', data);
            // Handle success
            setResponse(res.data);
            navigate('/yield/all')
        } catch (error) {
            console.error('Грешка при додавање: ', error);
            setResponse('Неуспешно додавање на принос. Обидете се повторно!')
        }
    };

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
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    name='type'
                    placeholder="Сорта семе"
                />
                <input
                    type="number"
                    onChange={handleChange}
                    name='year'
                    placeholder="Година"
                />
                <input
                    type="number"
                    onChange={handleChange}
                    name='amountKg'
                    placeholder="Количина во кг."
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
                <button type='submit'> Додади принос </button>
            </form>
        </div>
    );
}

export default AddYield;
