import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

const AddRevenue = () => {
    const [formData, setFormData] = useState({
        revenueSum: '',
        date: '',
        seedAmountKg: '',
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
                'http://localhost:9091/api/revenue/add',
                formData,
                config
            );
            const data = res.data;
            console.log('Response:', data);
            // Handle success
            setResponse(res.data);
            navigate('/revenue/all')
        } catch (error) {
            console.error('Грешка при додавање: ', error);
            setResponse('Неуспешно додавање на приход. Обидете се повторно!')
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
                <label> Количина кг. </label>
                <input
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='seedAmountKg'
                    placeholder="Количина кг."
                />
                <label> Износ мкд </label>
                <input
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='revenueSum'
                    placeholder="Износ мкд"
                />
                <label> Датум </label>
                <input
                    type="date"
                    className="form-control my-2"
                    onChange={handleChange}
                    name='date'
                    placeholder="Датум"
                />
                <input
                    type="hidden"
                    onChange={handleChange}
                    name='personId'
                    placeholder="Person"
                    value={formData.personId} // Set value from state
                    readOnly // Prevent user from editing the username field
                />
                <button type='submit' className="btn btn-success"> Додади приход </button>
                <Link to="/revenue/all" className="mx-3 btn btn-danger text-white"> Откажи </Link>
            </form>
        </div>
    );
}

export default AddRevenue;
