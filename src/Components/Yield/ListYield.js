import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import DataTable from "react-data-table-component";
import customStyles from "../DataTableCustomStyles"

const ListYield = () => {
    const [yields, setYields] = useState([]);
    const [originalYields, setOriginalYields] = useState([]);

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
                <Link to={`/editYield/${row.yieldId}`}>
                    <button className="edit-buttons p-2 rounded-2"> Измени </button>
                </Link>
            ),
            button: true,}
    ]

    useEffect(() => {
        fetchYields();
    }, []);

    const fetchYields = () => {
        axios.get('http://localhost:9091/api/yield/my', config)
            .then(response => {
                const sortedYields = response.data.sort((a, b) => {
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                })
                setYields(sortedYields);
                setOriginalYields(sortedYields);
            })
            .catch(error => {
                console.error('Error fetching yields: ', error);
            });
    };

    const habdleFilter = (event) => {
        const { value } = event.target;
        if (value === '') {
            setYields(originalYields);
        }
        else {
            const filteredData = yields.filter(
                row => row.seed.seedName.toLowerCase().includes(value.toLowerCase())
            );
            setYields(filteredData);
        }
    }

    return (
        <div className="container-fluid">
            <h5> Мои прионси </h5>
            <div>
                <input type="text" placeholder="Search..." onChange={habdleFilter}/>
            </div>
            <DataTable
                pagination
                columns={columns}
                data={yields}
                customStyles={customStyles}
                highlightOnHover
            >
            </DataTable>
            <div className="justify-content-center d-flex my-3">
                <Link to="/yield/add">
                    <button className="add-new p-2 rounded-2 mx-1">
                        Додади принос
                    </button>
                </Link>
                <Link to="/yield/statistics">
                    <button className="statistics add-new p-2 rounded-2 mx-1">
                        Прикажи статистики
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ListYield;
