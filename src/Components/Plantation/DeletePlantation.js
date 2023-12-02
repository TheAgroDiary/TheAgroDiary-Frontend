import React, { useEffect, useState } from "react";
import axios from "axios";

const DeletePlantation = ({ plantationId }) => {
    const [response, setResponse] = useState(null);

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:9091/api/plantation/delete/${plantationId}`, config);
            setResponse(res.data);
            // Handle success (e.g., show a success message, redirect, etc.)
        } catch (error) {
            console.error('Error deleting plantation: ', error);
            setResponse('Failed to delete the plantation. Please try again!');
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete Plantation</button>
            {response && <p>{response}</p>}
        </div>
    );
}

export default DeletePlantation;
