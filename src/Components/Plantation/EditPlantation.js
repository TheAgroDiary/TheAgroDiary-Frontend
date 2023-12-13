import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPlantation = () => {

    const { id } = useParams();
    const [seeds, setSeeds] = useState([]);

    console.log("Id from above")
    console.log(id)

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
        axios.put(`http://localhost:9091/api/plantation/edit/${id}`, config)
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
            const res = await axios.put(`http://localhost:9091/api/plantation/edit/${id}`, formData, config);
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
                    name='type'
                    value={formData.type}
                    placeholder={formData.type}
                />
                <select name="seedId" onChange={handleChange} value={formData.seedId}>
                    <option value="" disabled> Одбери семе </option>
                    {seeds.map(seed => (
                        <option key={seed.seedId} value={seed.seedId}>
                            {seed.seedName}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    onChange={handleChange}
                    name='year'
                    value={formData.year}
                    placeholder={formData.year}
                />
                <input
                    type="number"
                    onChange={handleChange}
                    name='amountKg'
                    value={formData.amountKg}
                    placeholder={formData.amountKg}
                />
                <button type='submit'> Ажурирај сеидба </button>
            </form>
        </div>
    );
}

export default EditPlantation;

