import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';


const AddSeed = (props) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        seedName: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const seedName = formData.seedName;

        props.onAddSeed(seedName);
        navigate('/home')
    }

    // const token = localStorage.getItem('jwt')
    // const config = {
    //     headers: {
    //         'Authorization' : `Bearer ${token}`,
    //     }
    // }

    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setFormData({... formData, [name]: value});
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     try {
    //         const res = await axios.post('http://localhost:9091/api/seed/add', formData, config);
    //         setResponse(res.data);
    //
    //         navigate('/home')
    //     }
    //     catch (error) {
    //         console.error('Грешка при додавање: ', error);
    //         setResponse('Неуспешно додавање на семе. Обидете се повторно!')
    //     }
    // };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    name='seedName'
                    placeholder="Seed Name"
                />
                <button type='submit'>Add Seed</button>
            </form>
        </div>
    );
}

export default AddSeed;
