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
        <div>
            <Link to="/yield/add">
                <button className="btn btn-primary">
                    Додади нов принос од сеидба
                </button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th> ИД </th>
                    <th> Семе </th>
                    <th> Вид семе </th>
                    <th> Количина во кг. </th>
                    <th> </th>
                    {/* Add more table headers as needed */}
                </tr>
                </thead>
                <tbody>
                {currentYields.map(yield_ => (
                    <tr key={yield_.yieldId}>
                        <td>{yield_.yieldId}</td>
                        <td>{yield_.seed.seedName}</td>
                        <td>{yield_.type}</td>
                        <td>{yield_.amountKg}</td>
                        <td> <Link to={`/editYield/${yield_.yieldId}`}> <button> Измени </button> </Link> </td>
                        {/* Add more table data as needed */}
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
