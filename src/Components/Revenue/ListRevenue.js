import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import {Link} from "react-router-dom";

const ListRevenue = () => {
    const [revenues, setRevenues] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [revenuesPerPage] = useState(5); // Change this value for items per page

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        fetchRevenues();
    }, []);

    const fetchRevenues = () => {
        axios.get('http://localhost:9091/api/revenue/my', config)
            .then(response => {
                setRevenues(response.data);
            })
            .catch(error => {
                console.error('Error fetching revenues: ', error);
            });
    };

    // Pagination
    const indexOfLastRevenue = currentPage * revenuesPerPage;
    const indexOfFirstRevenue = indexOfLastRevenue - revenuesPerPage;
    const currentRevenues = revenues.slice(indexOfFirstRevenue, indexOfLastRevenue);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Link to="/revenue/add">
                <button className="btn btn-primary">
                    Додади нов приход од сеидба
                </button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th> ИД </th>
                    <th> Семе </th>
                    <th> Количина на семе </th>
                    <th> Датум </th>
                    <th> Сума во денари </th>
                    <th> </th>
                    {/* Add more table headers as needed */}
                </tr>
                </thead>
                <tbody>
                {currentRevenues.map(revenue => (
                    <tr key={revenue.revenueId}>
                        <td>{revenue.revenueId}</td>
                        <td>{revenue.seed.seedName}</td>
                        <td>{revenue.seedAmountKg}</td>
                        <td>{revenue.date}</td>
                        <td>{revenue.revenueSum}</td>
                        <td> <Link to={`/editRevenue/${revenue.revenueId}`}> <button> Измени </button> </Link> </td>
                        {/* Add more table data as needed */}
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={revenuesPerPage}
                totalItems={revenues.length}
                paginate={paginate}
            />
        </div>
    );
};

export default ListRevenue;
