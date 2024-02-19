import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import DataTable from "react-data-table-component";
import customStyles from "../DataTableCustomStyles";

const ListExpense = () => {
    const [expenses, setExpenses] = useState([]);
    const [originalExpenses, setOriginalExpenses] = useState([]);

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    const columns = [
        {name: 'Категорија', selector: row => row.category.categoryName, sortable: true},
        {name: 'Сума во денари', selector: row => row.expenseSum, sortable: true},
        {name: 'Семе', selector: row => row.seed.seedName, sortable: true},
        {name: 'Количина на семе', selector: row => row.seedAmountKg, sortable: true},
        {name: 'Опис', selector: row => row.description},
        {name: 'Датум', selector: row => new Date(row.date).toLocaleDateString(), sortable: true},
        {name: '',
            cell: row => (
                <Link to={`/editExpense/${row.expenseId}`}>
                    <button className="edit-buttons p-2 rounded-2"> Измени </button>
                </Link>
            )},
    ]

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = () => {
        axios.get('http://localhost:9091/api/expense/my', config)
            .then(response => {
                const sortedExpenses = response.data.sort((a, b) => {
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                })
                setExpenses(sortedExpenses);
                setOriginalExpenses(sortedExpenses);
            })
            .catch(error => {
                console.error('Error fetching expenses: ', error);
            });
    };

    const handleFilter = (event) => {
        const { value } = event.target;
        let filteredData = null;
        if (value === '') {
            setExpenses(originalExpenses);
        }
        else {
            const filteredDataCategory = expenses.filter(
                row => row.category.categpryName.toLowerCase().includes(value.toLowerCase())
            );
            const filteredDataSeed = expenses.filter(
                row => row.seed.seedName.toLowerCase().includes(value.toLowerCase())
            );
            if (filteredDataCategory != null) {
                filteredData = filteredDataCategory;
            }
            if (filteredDataSeed != null) {
                filteredData = filteredDataSeed;
            }
            setExpenses(filteredData);
        }
    }

    return (
        <div className="container-fluid">
            <h5 className="d-flex justify-content-center"> Мои трошоци </h5>
            <div className="d-flex justify-content-end">
                <input type="text" placeholder="Пребарај..." onChange={handleFilter}/>
            </div>
            <DataTable
                pagination
                columns={columns}
                data={expenses}
                customStyles={customStyles}
                highlightOnHover
            >
            </DataTable>
            <div className="justify-content-center d-flex my-3">
                <Link to="/expense/add">
                    <button className="add-new p-2 rounded-2 mx-1">
                        Додади трошок
                    </button>
                </Link>
                <Link to="/expense/statistics">
                    <button className="add-new p-2 rounded-2 mx-1">
                        Прикажи статистики
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ListExpense;
