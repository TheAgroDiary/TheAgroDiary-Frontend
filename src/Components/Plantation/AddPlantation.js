import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AddPlantation = () => {
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
            'Authorization' : `Bearer ${token}`,
        }
    }

    useEffect(() => {
        // const userInfo = getUserInfoFromToken(token);
        const userInfo = 14
        if (userInfo) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                personId: userInfo,
            }));
        }
    }, [token]);

    // useEffect(() => {
    //     // Fetch the list of seeds when the component mounts
    //     axios.get('http://localhost:9091/api/seed/seeds', config)
    //         .then(response => {
    //             setSeeds(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching seeds: ', error);
    //         });
    // }, [config]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:9091/api/plantation/add',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            const data = response.data;
            console.log('Response:', data);
            // Handle success
            setResponse(res.data);
            navigate('/home')
        } catch (error) {
            console.error('Грешка при додавање: ', error);
            setResponse('Неуспешно додавање на сеидба. Обидете се повторно!')
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
                    placeholder="Type of Seed"
                />
                <input
                    type="number"
                    onChange={handleChange}
                    name='year'
                    placeholder="Year"
                />
                <input
                    type="number"
                    onChange={handleChange}
                    name='amountKg'
                    placeholder="Amount in kg"
                />
                <input
                    type="text"
                    onChange={handleChange}
                    name='personId'
                    placeholder="Person"
                    value={formData.personId} // Set value from state
                    readOnly // Prevent user from editing the username field
                />
                {/*<input*/}
                {/*    type="number"*/}
                {/*    onChange={handleChange}*/}
                {/*    name='seed'*/}
                {/*    placeholder="Seed"*/}
                {/*/>*/}
                <select name="seedId" onChange={handleChange} value={formData.seedId}>
                    <option value="" disabled>Select Seed</option>
                    {seeds.map(seedId => (
                        <option key={seedId.id} value={seedId.id}>
                            {seedId.seedId}
                        </option>
                    ))}
                </select>
                <button type='submit'>Add Seed</button>
            </form>
        </div>
    );
}

export default AddPlantation;
