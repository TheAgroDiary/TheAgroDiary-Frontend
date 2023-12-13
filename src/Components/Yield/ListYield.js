import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import {Link} from "react-router-dom";

const ListYield = () => {
    const [yields, setYields] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [yieldsPerPage] = useState(5); // Change this value for items per page

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        fetchYields();
    }, []);

    const fetchYields = () => {
        axios.get('http://localhost:9091/api/yield/my', config)
            .then(response => {
                setYields(response.data);
            })
            .catch(error => {
                console.error('Error fetching yields: ', error);
            });
    };

    // Pagination
    const indexOfLastYield = currentPage * yieldsPerPage;
    const indexOfFirstYield = indexOfLastYield - yieldsPerPage;
    const currentYields = yields.slice(indexOfFirstYield, indexOfLastYield);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid">
            <div className="justify-content-end d-flex my-3">
                <Link to="/yield/add">
                    <button className="add-new p-2 rounded-2">
                        Додади нов принос од сеидба
                    </button>
                </Link>
            </div>
            <table className="table table-striped table-hover">
                <thead className="bg-secondary-subtle">
                <tr>
                    <th className="bg-secondary-subtle"> Година </th>
                    <th className="bg-secondary-subtle"> Семе </th>
                    <th className="bg-secondary-subtle"> Вид семе </th>
                    <th className="bg-secondary-subtle"> Количина во кг. </th>
                    <th className="bg-secondary-subtle"> </th>
                </tr>
                </thead>
                <tbody>
                {currentYields.map(yield_ => (
                    <tr key={yield_.yieldId}>
                        <td>{yield_.year}</td>
                        <td>{yield_.seed.seedName}</td>
                        <td>{yield_.type}</td>
                        <td>{yield_.amountKg}</td>
                        <td>
                            <Link to={`/editYield/${yield_.yieldId}`}>
                                <button className="edit-buttons p-2 rounded-2"> Измени </button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={yieldsPerPage}
                totalItems={yields.length}
                paginate={paginate}
            />
        </div>
    );
};

export default ListYield;
