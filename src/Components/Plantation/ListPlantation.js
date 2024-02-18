import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import DataTable from "react-data-table-component";
import customStyles from "../DataTableCustomStyles"

const ListPlantation = () => {
    const [plantations, setPlantations] = useState([]);
    const [originalPlantations, setOriginalPlantations] = useState([]);

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    const columns = [
        {name: 'Година', selector: row => row.year, sortable: true},
        {name: 'Семе', selector: row => row.seed.seedName, sortable: true},
        {name: 'Вид семе', selector: row => row.type, sortable: true},
        {name: 'Количина во кг.', selector: row => row.amountKg, sortable: true},
        {name: '',
            cell: row => (
                <Link to={`/editPlantation/${row.plantationId}`}>
                    <button className="edit-buttons p-2 rounded-2"> Измени </button>
                </Link>
            ),
            button: true,}
    ]

    useEffect(() => {
        fetchPlantations();
    }, []);

    const fetchPlantations = () => {
        axios.get('http://localhost:9091/api/plantation/my', config)
            .then(response => {
                // Sort the plantations by updatedAt or createdAt in descending order
                const sortedPlantations = response.data.sort((a, b) => {
                    return new Date(b.updatedAt) - new Date(a.updatedAt); // Replace 'updatedAt' with the appropriate field
                });
                setPlantations(sortedPlantations);
                setOriginalPlantations(sortedPlantations);
            })
            .catch(error => {
                console.error('Error fetching plantations: ', error);
            });
    };

    const habdleFilter = (event) => {
        const { value } = event.target;
        if (value === '') {
            setPlantations(originalPlantations);
        }
        else {
            const filteredData = plantations.filter(
                row => row.seed.seedName.toLowerCase().includes(value.toLowerCase())
            );
            setPlantations(filteredData);
        }
    }
    
    return (
        <div className="container-fluid">
            <h5> Мои сеидби </h5>
            <div>
                <input type="text" placeholder="Search..." onChange={habdleFilter}/>
            </div>
            <DataTable
                pagination
                columns={columns}
                data={plantations}
                customStyles={customStyles}
                highlightOnHover
            >
            </DataTable>
            <div className="justify-content-center d-flex my-3">
                <Link to="/plantation/add">
                    <button className="add-new p-2 rounded-2 mx-1">
                        Додади сеидба
                    </button>
                </Link>
                <Link to="/plantation/statistics">
                    <button className="add-new p-2 rounded-2 mx-1">
                        Прикажи статистики
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ListPlantation;
