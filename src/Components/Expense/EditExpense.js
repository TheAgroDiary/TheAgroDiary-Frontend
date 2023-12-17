import React, { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const EditExpense = () => {

    const { id } = useParams();
    const [seeds, setSeeds] = useState([]);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        expenseSum: '',
        date: '',
        seedAmountKg: '',
        description: '',
        personId: '',
        seedId: '',
        categoryId: '',
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
        axios.get(`http://localhost:9091/api/expense/${id}`, config)
            .then((response) => {
                console.log('I am in .then')
                const {
                    expenseSum,
                    date,
                    seedAmountKg,
                    description,
                    personId,
                    seedId,
                    categoryId
                } = response.data;
                setFormData({
                    expenseSum,
                    date,
                    seedAmountKg,
                    description,
                    personId,
                    seedId,
                    categoryId
                });
            })
            .catch((error) => {
                console.error("Error fetching Expense data: ", error);
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

    useEffect(() => {
        // Fetch the list of seeds when the component mounts
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
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`http://localhost:9091/api/expense/edit/${id}`, formData, config);
            setResponse(res.data);

            navigate('/expense/all');
        } catch (error) {
            console.error('Грешка при ажурирање: ', error);
            setResponse('Неуспешно ажурирање. Обидете се повторно!');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <form className="m-3 p-3 w-50 form-body" onSubmit={handleSubmit}>
                <label> Категорија </label>
                <select name="categoryId" className="form-control my-2" required onChange={handleChange} value={formData.categoryId}>
                    <option value="" disabled> Одбери категорија </option>
                    {categories.map(category => (
                        <option key={category.categoryId} value={category.categoryId}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
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
                    type="number"
                    className="form-control my-2"
                    required
                    onChange={handleChange}
                    name='expenseSum'
                    value={formData.expenseSum}
                    placeholder={formData.expenseSum}
                />
                <label> Опис </label>
                <input
                    type="text"
                    className="form-control my-2"
                    onChange={handleChange}
                    name='description'
                    value={formData.description}
                    placeholder={formData.description}
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
                <button type='submit' className="btn btn-success"> Ажурирај трошок </button>
                <Link to="/expense/all" className="mx-3 btn btn-danger text-white"> Откажи </Link>
            </form>
        </div>
    );
}

export default EditExpense;

