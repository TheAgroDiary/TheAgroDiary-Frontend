// import React, {useEffect, useState} from "react";
// import axios from "axios";
// import Pagination from "../Pagination";
//
//
// const ListPlantation = () => {
//     const [plantations, setPlantations] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [plantationsPerPage] = useState(5); // Change this value for items per page
//
//     const token = localStorage.getItem('jwt');
//     const config = {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//         }
//     };
//
//     useEffect(() => {
//         fetchPlantations();
//     }, []);
//
//     const fetchPlantations = () => {
//         axios.get('http://localhost:9091/api/plantation/all', config)
//             .then(response => {
//                 setPlantations(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching plantations: ', error);
//             });
//     };
//
//     // Pagination
//     const indexOfLastPlantation = currentPage * plantationsPerPage;
//     const indexOfFirstPlantation = indexOfLastPlantation - plantationsPerPage;
//     const currentPlantations = plantations.slice(indexOfFirstPlantation, indexOfLastPlantation);
//
//     const paginate = pageNumber => setCurrentPage(pageNumber);
//
//     return (
//         <div>
//             <table>
//                 <thead>
//                 <tr>
//                     <th> Ид </th>
//                     <th> Име на сорта </th>
//                     <th> Семе </th>
//                     <th> Година </th>
//                     <th> Човек </th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {currentPlantations.map(plantation => (
//                     <tr key={plantation.id}>
//                         <td>{plantation.id}</td>
//                         <td>{plantation.type}</td>
//                         <td>{plantation.seedId}</td>
//                         <td>{plantation.year}</td>
//                         <td>{plantation.personId}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//             <Pagination
//                 itemsPerPage={plantationsPerPage}
//                 totalItems={plantations.length}
//                 paginate={paginate}
//             />
//         </div>
//     );
// };
//
// export default ListPlantation;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination";

const ListPlantation = () => {
    const [plantations, setPlantations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [plantationsPerPage] = useState(5); // Change this value for items per page

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
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
            <table>
                <thead>
                <tr>
                    <th> ИД </th>
                    <th> Семе </th>
                    <th> Вид семе </th>
                    {/* Add more table headers as needed */}
                </tr>
                </thead>
                <tbody>
                {currentPlantations.map(plantation => (
                    <tr key={plantation.plantationId}>
                        <td>{plantation.plantationId}</td>
                        <td>{plantation.seed.seedName}</td>
                        <td>{plantation.type}</td>
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
