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
                // Sort the plantations by updatedAt or createdAt in descending order
                const sortedPlantations = response.data.sort((a, b) => {
                    return new Date(b.updatedAt) - new Date(a.updatedAt); // Replace 'updatedAt' with the appropriate field
                });
                setPlantations(sortedPlantations);
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
        <div className="container-fluid">
            <div className="justify-content-end d-flex my-3">
                <Link to="/plantation/add">
                    <button className="add-new p-2 rounded-2">
                        Додади сеидба
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
                    <th className="bg-secondary-subtle">  </th>
                </tr>
                </thead>
                <tbody>
                {currentPlantations.map(plantation => (
                    <tr key={plantation.plantationId}>
                        <td>{plantation.year}</td>
                        <td>{plantation.seed.seedName}</td>
                        <td>{plantation.type}</td>
                        <td>{plantation.amountKg}</td>
                        <td>
                            <Link to={`/editPlantation/${plantation.plantationId}`}>
                                <button className="edit-buttons p-2 rounded-2"> Измени </button>
                            </Link>
                        </td>
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
