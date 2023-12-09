import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import {Link} from "react-router-dom";

const ListPlantation = () => {
    const [plantations, setPlantations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [plantationsPerPage] = useState(5); // Change this value for items per page

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        fetchPlantations();
    }, []);

    const fetchPlantations = () => {
        axios.get('http://localhost:9091/api/plantation/my', config)
            .then(response => {
                setPlantations(response.data);
            })
            .catch(error => {
                console.error('Error fetching plantations: ', error);
            });
    };

    // Pagination
    const indexOfLastPlantation = currentPage * plantationsPerPage;
    const indexOfFirstPlantation = indexOfLastPlantation - plantationsPerPage;
    const currentPlantations = plantations.slice(indexOfFirstPlantation, indexOfLastPlantation);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Link to="/yield/add">
                <button className="btn btn-primary">
                    Додади нова сеидба
                </button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th> ИД </th>
                    <th> Семе </th>
                    <th> Вид семе </th>
                    <th> Количина во кг. </th>
                    <th>  </th>
                    {/* Add more table headers as needed */}
                </tr>
                </thead>
                <tbody>
                {currentPlantations.map(plantation => (
                    <tr key={plantation.plantationId}>
                        <td>{plantation.plantationId}</td>
                        <td>{plantation.seed.seedName}</td>
                        <td>{plantation.type}</td>
                        <td>{plantation.amountKg}</td>
                        <td> <Link to={`/editYield/${plantation.plantationId}`}> <button> Измени </button> </Link> </td>
                        {/* Add more table data as needed */}
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={plantationsPerPage}
                totalItems={plantations.length}
                paginate={paginate}
            />
        </div>
    );
};

export default ListPlantation;
