const DeleteCategory = ({ category, onDelete, onCancel }) => {
    const handleDelete = () => {
        onDelete(category.categoryId);
    };

    return (
        <div>
            <p>Are you sure you want to delete "{category.categoryName}"?</p>
            <button onClick={handleDelete}> Избриши </button>
            <button onClick={onCancel}> Откажи </button>
        </div>
    );
};

export default DeleteCategory;