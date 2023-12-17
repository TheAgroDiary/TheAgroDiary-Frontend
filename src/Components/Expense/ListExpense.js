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
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

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
        <div className="container-fluid">
            <div className="justify-content-end d-flex my-3">
                <Link to="/expense/add">
                    <button className="add-new p-2 rounded-2">
                        Додади трошок
                    </button>
                </Link>
            </div>
            <table className="table table-striped table-hover">
                <thead className="bg-secondary-subtle">
                <tr>
                    <th className="bg-secondary-subtle"> Категорија </th>
                    <th className="bg-secondary-subtle"> Сума во денари </th>
                    <th className="bg-secondary-subtle"> Семе </th>
                    <th className="bg-secondary-subtle"> Количина на семе </th>
                    <th className="bg-secondary-subtle"> Опис </th>
                    <th className="bg-secondary-subtle"> Датум </th>
                    <th className="bg-secondary-subtle"> </th>
                </tr>
                </thead>
                <tbody>
                {currentExpenses.map(expense => (
                    <tr key={expense.expenseId}>
                        <td>{expense.category.categoryName}</td>
                        <td>{expense.expenseSum}</td>
                        <td>{expense.seed.seedName}</td>
                        <td>{expense.seedAmountKg}</td>
                        <td>{expense.description}</td>
                        <td>{expense.date}</td>
                        <td>
                            <Link to={`/editExpense/${expense.expenseId}`}>
                                <button className="edit-buttons p-2 rounded-2"> Измени </button>
                            </Link>
                        </td>
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
