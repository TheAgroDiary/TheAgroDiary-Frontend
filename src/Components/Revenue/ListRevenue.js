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
                const sortedRevenues = response.data.sort((a, b) => {
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                })
                setRevenues(sortedRevenues);
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
        <div className="container-fluid">
           <h5> </h5>
            <table className="table table-striped table-hover">
                <thead className="bg-secondary-subtle">
                <tr>
                    <th className="bg-secondary-subtle"> Сума во денари </th>
                    <th className="bg-secondary-subtle"> Семе </th>
                    <th className="bg-secondary-subtle"> Количина во кг. </th>
                    <th className="bg-secondary-subtle"> Датум </th>
                    <th className="bg-secondary-subtle"> </th>
                </tr>
                </thead>
                <tbody>
                {currentRevenues.map(revenue => (
                    <tr key={revenue.revenueId}>
                        <td>{revenue.revenueSum}</td>
                        <td>{revenue.seed.seedName}</td>
                        <td>{revenue.seedAmountKg}</td>
                        <td>{revenue.date}</td>
                        <td>
                            <Link to={`/editRevenue/${revenue.revenueId}`}>
                                <button className="edit-buttons p-2 rounded-2"> Измени </button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={revenuesPerPage}
                totalItems={revenues.length}
                paginate={paginate}
            />
            <div className="justify-content-center d-flex my-3">
                <Link to="/revenue/add">
                    <button className="add-new p-2 rounded-2 mx-1">
                        Додади трошок
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
