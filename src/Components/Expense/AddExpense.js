import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AddExpense = () => {
    const [formData, setFormData] = useState({
        expenseSum: '',
        date: '',
        seedAmountKg: '',
        description: '',
        personId: '',
        seedId: '',
        categoryId: '',
    });

    const [seeds, setSeeds] = useState([]);
    const [categories, setCategories] = useState([]);
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
                'http://localhost:9091/api/expense/add',
                formData,
                config
            );
            const data = res.data;
            console.log('Response:', data);
            // Handle success
            setResponse(res.data);
            navigate('/expense/all')
        } catch (error) {
            console.error('Грешка при додавање: ', error);
            setResponse('Неуспешно додавање на трошок. Обидете се повторно!')
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

    useEffect(() => {
        // Fetch the list of categories when the component mounts
        axios.get('http://localhost:9091/api/category/categories', config)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories: ', error);
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
                    type="number"
                    onChange={handleChange}
                    name='expenseSum'
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
                    type="text"
                    onChange={handleChange}
                    name='description'
                    placeholder="Опис"
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
                <select name="categoryId" onChange={handleChange} value={formData.categoryId}>
                    <option value="" disabled> Избери категорија </option>
                    {categories.map(category => (
                        <option key={category.categoryId} value={category.categoryId}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
                <button type='submit'> Додади трошок </button>
            </form>
        </div>
    );
}

export default AddExpense;
