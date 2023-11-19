import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const ListPlantation = () => {
    const [formData, setFormData] = useState({
        type: '',
        year: '',
        amountKg: '',
        person: '',
        seed: '',
    });

    const [seeds, setSeeds] = useState([]);
    const [response, setResponse] = useState(null);

    const navigate = useNavigate();

    const token = localStorage.getItem('jwt')
    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`,
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:9091/api/plantation/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log('Fetch Response:', data);

        // try {
        //     const res = await axios.post('http://localhost:9091/api/plantation/add', formData, config);
        //     setResponse(res.data);
        //     console.log('Config is: ')
        //     navigate('/home')
        // }
        // catch (error) {
        //     console.log('Config is: ')
        //     console.error('Грешка при додавање: ', error);
        //     setResponse('Неуспешно додавање на сеидба. Обидете се повторно!')
        //     const res = await axios.post('http://localhost:9091/api/plantation/add', formData, config);
        //     console.log("Result is: " + res);
        //     setResponse(res.data);
        //     navigate('/home')
        // }
    };

    useEffect(() => {
        // Fetch the list of seeds when the component mounts
        axios.get('http://localhost:9091/api/plantation/all', config)
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
                <tr>
                    <td>{plantations}</td>
                </tr>
                <select name="seed" onChange={handleChange} value={formData.seed}>
                    <option value="" disabled>Select Seed</option>
                    {seeds.map(seed => (
                        <option key={seed.id} value={seed.id}>
                            {seed.seedName}
                        </option>
                    ))}
                </select>
                <button type='submit'>Add Seed</button>
            </form>
        </div>
    );
};

export default ListPlantation;