const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination justify-content-center">
            <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only"></span>
                </a>
            </li>
            {pageNumbers.map(number => (
                <li className="page-item" key={number}>
                    <a className="page-link" href="#" onClick={() => paginate(number)}>
                        {number}
                    </a>
                </li>
            ))}
            <li>
                <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only"></span>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
