import React, {useState} from "react";
import axios from 'axios';
import AddSeed from "./AddSeed";
import DeleteSeed from "./DeleteSeed";
import EditSeed from "./EditSeed";

const Seed = () => {
    const [seed, setSeed] = useState([]);
    const [editingSeed, setEditingSeed] = useState(null);
    const [deletingSeed, setDeletingSeed] = useState(null);

    const handleAdd = (seedName) => {
        // Make an API request to add a seed
        axios.post('http://localhost:9091/api/seed/add', { name: seedName })
            .then((response) => {
                const newSeed = response.data; // Assuming the API returns the newly created seed
                setSeed([...seed, newSeed]);
            })
            .catch((error) => {
                console.error('Failed to add a seed:', error);
            });
    };

    const handleEdit = (updatedSeed) => {
        // Make an API request to update a seed
        axios.put(`http://localhost:9091/api/seed/edit/${updatedSeed.id}`, updatedSeed)
            .then(() => {
                const updatedSeed = seed.map((seed) =>
                    seed.id === updatedSeed.id ? updatedSeed : seed
                );
                setSeed(updatedSeed);
                setEditingSeed(null);
            })
            .catch((error) => {
                console.error('Failed to update the seed:', error);
            });
    };

    const handleDelete = (seedId) => {
        // Make an API request to delete a seed
        axios.delete(`http://localhost:9091/api/seed/delete/${seedId}`)
            .then(() => {
                const updatedSeed = seed.filter((seed) => seed.id !== seedId);
                setSeed(updatedSeed);
                setDeletingSeed(null);
            })
            .catch((error) => {
                console.error('Failed to delete the seed:', error);
            });
    };

    // const handleAdd = (seedName) => {
    //     // Add a new seed to the seeds list
    //     const newSeed = { id: Date.now(), name: seedName };
    //     setSeeds([...seeds, newSeed]);
    // };
    //
    // const handleEdit = (seed) => {
    //     setEditingSeed(seed);
    // };
    //
    // const handleUpdate = (updatedSeed) => {
    //     // Update the seed in the seeds list
    //     const updatedSeeds = seeds.map((seed) =>
    //         seed.id === updatedSeed.id ? updatedSeed : seed
    //     );
    //     setSeeds(updatedSeeds);
    //     setEditingSeed(null);
    // };
    //
    // const handleDelete = (seedId) => {
    //     // Delete the seed with the specified ID
    //     const updatedSeeds = seeds.filter((seed) => seed.id !== seedId);
    //     setSeeds(updatedSeeds);
    //     setDeletingSeed(null);
    // };

    return (
        <div>
            <h1>Seeds</h1>
            <ul>
                {seed.map((seed) => (
                    <li key={seed.id}>
                        {seed.name}
                        <button onClick={() => handleEdit(seed)}>Edit</button>
                        <button onClick={() => setDeletingSeed(seed)}>Delete</button>
                    </li>
                ))}
            </ul>
            <AddSeed onAdd={handleAdd} />
            {/*{editingSeed && <EditSeed seed={editingSeed} onUpdate={handleUpdate} onCancel={() => setEditingSeed(null)} />}*/}
            {/*{deletingSeed && <DeleteSeed seed={deletingSeed} onDelete={handleDelete} onCancel={() => setDeletingSeed(null)} />}*/}
        </div>
    );
};

export default Seed;