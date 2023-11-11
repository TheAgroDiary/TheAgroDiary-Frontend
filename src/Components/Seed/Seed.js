import React from "react";
import {Link} from "react-router-dom";


const Seed = (props) => {
    // Destructure props to avoid repeating props.term
    const { term, onEdit } = props;

    // Check if term is defined before accessing properties
    if (!term) {
        return null; // or handle the case where term is undefined
    }

    return (
        <tr>
            <td>{term.seedName}</td>
            <td className={"text-right"}>
                <Link className={"btn btn-info ml-2"}
                      onClick={() => onEdit(term.id)}
                      to={`/editSeed/${term.id}`}>
                    Edit
                </Link>
            </td>
        </tr>
    );
};

export default Seed;