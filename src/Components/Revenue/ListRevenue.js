import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import DataTable from "react-data-table-component";
import customStyles from "../DataTableCustomStyles";

const ListRevenue = () => {
    const [revenues, setRevenues] = useState([]);
    const [originalRevenues, setOriginalRevenues] = useState([]);

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    const columns = [
        {name: 'Сума во денари', selector: row => row.revenueSum, sortable: true},
        {name: 'Семе', selector: row => row.seed.seedName, sortable: true},
        {name: 'Количина во кг.', selector: row => row.seedAmountKg, sortable: true},
        {name: 'Датум', selector: row => new Date(row.date).toLocaleDateString(), sortable: true},
        {name: '',
            cell: row => (
                <Link to={`/editRevenue/${row.revenueId}`}>
                    <button className="edit-buttons p-2 rounded-2 ms-5"> Измени </button>
                </Link>
            )
        },
        {name: '',
            cell: row => (
                <button className="delete-buttons p-2 rounded-2" onClick={() => handleDelete(row.revenueId)}> Отстрани </button>
            )
        }
    ]

    useEffect(() => {
        fetchRevenues();
    }, []);

    const fetchRevenues = () => {
        axios.get('http://localhost:9091/api/revenue/my', config)
            .then(response => {
                const sortedRevenues = response.data.sort((a, b) => {
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                })
                setRevenues(sortedRevenues);
            })
            .catch(error => {
                console.error('Error fetching revenues: ', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9091/api/expense/delete/${id}`, config)
            .then(() => {
                setRevenues(revenues.filter(revenue => revenue.revenueId !== id));
                setOriginalRevenues(originalRevenues.filter(revenue => revenue.revenueId !== id));
            })
            .catch(error => {
                console.error('Error deleting revenue: ', error);
            });
    };

    const handleFilter = (event) => {
        const { value } = event.target;
        if (value === '') {
            setRevenues(originalRevenues);
        }
        else {
            const filteredData = revenues.filter(
                row => row.seed.seedName.toLowerCase().includes(value.toLowerCase())
            );
            setRevenues(filteredData);
        }
    }

    return (
        <div className="container-fluid">
           <h5 className="d-flex justify-content-center"> Мои приходи </h5>
            <div className="d-flex justify-content-end my-1">
                <label className="me-2 p-1 bg-light bg-gradient"> Пребарај </label>
                <input type="text" placeholder="семе" onChange={handleFilter}/>
            </div>
            <DataTable
                pagination
                columns={columns}
                data={revenues}
                customStyles={customStyles}
                highlightOnHover
            >
            </DataTable>
            <div className="justify-content-center d-flex my-3">
                <Link to="/revenue/add">
                    <button className="add-new p-2 rounded-2 mx-1">
                        Додади приход
                    </button>
                </Link>
                <Link to="/revenue/statistics">
                    <button className="add-new p-2 rounded-2 mx-1">
                        Прикажи статистики
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ListRevenue;
