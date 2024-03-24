import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
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
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:9091/api/plantation/add',
                formData,
                config
            );
            const data = res.data;
            console.log('Response:', data);
            // Handle success
            setResponse(res.data);
            navigate('/plantation/all')
        } catch (error) {
            console.error('Грешка при додавање: ', error);
            setResponse('Неуспешно додавање. Обидете се повторно!')
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
                    placeholder="Сорта"
                />
                <label> Година </label>
                <input
                    type="number"
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='year'
                    placeholder="Година"
                />
                <label> Количина кг. </label>
                <input
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='amountKg'
                    placeholder="Количина кг."
                />
                <input
                    type="hidden"
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='personId'
                    placeholder="Person"
                    value={formData.personId} // Set value from state
                    readOnly // Prevent user from editing the username field
                />
                <button type='submit' className="btn btn-success"> Додади сеидба </button>
                <Link to="/plantation/all" className="mx-3 btn btn-danger text-white"> Откажи </Link>
            </form>
        </div>
    );
}

export default AddPlantation;
