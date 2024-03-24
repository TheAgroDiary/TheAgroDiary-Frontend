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
        {name: 'Количина', selector: row => row.seedAmountKg, sortable: true},
        {name: 'Опис', selector: row => row.description,
            conditionalCellStyles: [
                {
                    when: row => row.description.length > 40, // Adjust the threshold as needed
                    style: {
                        cursor: "pointer",
                        textDecoration: "underline",
                    },
                },
            ],
        },
        // {name: 'Датум', selector: row => new Date(row.date).toLocaleDateString(), sortable: true},
        {name: '',
            cell: row => (
                <Link to={`/editExpense/${row.expenseId}`}>
                    <button className="edit-buttons p-2 rounded-2 ms-5"> Измени </button>
                </Link>
            )
        },
        {name: '',
            cell: row => (
                <button className="delete-buttons p-2 rounded-2" onClick={() => handleDelete(row.expenseId)}> Отстрани </button>
            )
        }
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

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9091/api/expense/delete/${id}`, config)
            .then(() => {
                setExpenses(expenses.filter(expense => expense.expenseId !== id));
                setOriginalExpenses(originalExpenses.filter(expense => expense.expenseId !== id));
            })
            .catch(error => {
                console.error('Error deleting expense: ', error);
            });
    };

    const handleFilter = (event) => {
        const { value } = event.target;
        if (value === '') {
            setExpenses(originalExpenses);
        }
        else {
            const filteredData = expenses?.filter(
                (row) => row?.category?.categoryName?.toLowerCase().includes(value.toLowerCase())
                || row?.seed?.seedName?.toLowerCase().includes(value.toLowerCase())
            );
            setExpenses(filteredData);
        }
    }

    return (
        <div className="container-fluid">
            <h5 className="d-flex justify-content-center"> Мои трошоци </h5>
            <div className="d-flex justify-content-end my-1">
                <label className="me-2 p-1 bg-light bg-gradient"> Пребарај </label>
                <input type="text" placeholder="категорија или семе" onChange={handleFilter}/>
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
