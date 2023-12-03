import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import {Link} from "react-router-dom";

const ListExpense = () => {
    const [expenses, setExpenses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [expensesPerPage] = useState(5); // Change this value for items per page

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = () => {
        axios.get('http://localhost:9091/api/expense/my', config)
            .then(response => {
                setExpenses(response.data);
            })
            .catch(error => {
                console.error('Error fetching expenses: ', error);
            });
    };

    // Pagination
    const indexOfLastExpense = currentPage * expensesPerPage;
    const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
    const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Link to="/yield/add">
                <button className="btn btn-primary">
                    Додади нов трошок од сеидба
                </button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th> ИД </th>
                    <th> Семе </th>
                    <th> Количина на семе </th>
                    <th> Категорија </th>
                    <th> Опис </th>
                    <th> Датум </th>
                    <th> Сума во денари </th>
                    <th> </th>
                    {/* Add more table headers as needed */}
                </tr>
                </thead>
                <tbody>
                {currentExpenses.map(expense => (
                    <tr key={expense.expenseId}>
                        <td>{expense.expenseId}</td>
                        <td>{expense.seed.seedName}</td>
                        <td>{expense.seedAmountKg}</td>
                        <td>{expense.category.categoryName}</td>
                        <td>{expense.description}</td>
                        <td>{expense.date}</td>
                        <td>{expense.expenseSum}</td>
                        <td> <Link to={`/editExpense/${expense.expenseId}`}> <button> Измени </button> </Link> </td>
                        {/* Add more table data as needed */}
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={expensesPerPage}
                totalItems={expenses.length}
                paginate={paginate}
            />
        </div>
    );
};

export default ListExpense;
