const DeleteSeed = ({ seed, onDelete, onCancel }) => {
    const handleDelete = () => {
        onDelete(seed.seedId);
    };

    return (
        <div>
            <p>Are you sure you want to delete "{seed.seedName}"?</p>
            <button onClick={handleDelete}>Delete Seed</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default DeleteSeed;