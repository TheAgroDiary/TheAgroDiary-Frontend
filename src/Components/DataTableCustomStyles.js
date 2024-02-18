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
            backgroundColor: 'white',
            '&:nth-child(2n)': {
                backgroundColor: '#EEEEEE',
            },
            fontSize: '15px',
            color: 'black',
            // fontFamily: 'Segoe UI Semibold',
            fontFamily: 'Arial',
        },
    },
}

export default customStyles;