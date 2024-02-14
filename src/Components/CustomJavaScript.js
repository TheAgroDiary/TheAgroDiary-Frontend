
export function showHideTableStats (e) {
    const element = document.getElementById(e);
    if (element.style.display === "none") {
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }

    // $(document).ready( function () {
    //     $(".table table-striped table-hover mt-2").DataTable();
    // })
}

const customStyles = {
    head: {
        style: {
            color: 'black', // Text color for header
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer'
        },
    },
    headRow: {
        style: {
            backgroundColor: '#E2E3E5',
        },
    },
    rows: {
        style: {
            '&:hover': {
                backgroundColor: '#ECECEC'
            },
            fontSize: '15px',
            color: 'black',
            fontFamily: 'Segoe UI Semibold'
        },
    },
}

export default customStyles;