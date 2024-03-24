import React, {useEffect, useState} from "react";
import axios from "axios";
import BarChartYearSeed from "./BarChartYearSeed";
import BarChartYearSeedType from "./BarChartYearSeedType";
import { showHideTableStats } from "../CustomJavaScript";
import DataTable from "react-data-table-component";
import customStyles from "../DataTableCustomStyles"

const PlantationStatistics = () => {

    const [statistics1, setStatistics1] = useState([]);
    const [statistics2, setStatistics2] = useState([]);

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect (() => {
        axios.get('http://localhost:9091/api/plantation/statistics1', config)
            .then((response) => {
                setStatistics1(response.data);
            })
            .catch(error => {
                console.error('Error fetching summary by Year and Seed: ', error)
            })
        axios.get('http://localhost:9091/api/plantation/statistics2', config)
            .then((response) => {
                setStatistics2(response.data);
            })
            .catch(error => {
                console.error('Error fetching summary by Year, Seed And Type: ', error)
            })
    }, [])

    const tableStatistics = () => {
        showHideTableStats("tableStats")
    }

    const columnsT1 = [
        {name: 'Година', selector: row => row.year, sortable: true},
        {name: 'Семе', selector: row => row.seedName, sortable: true},
        {name: 'Вкупно количина кг.', selector: row => row.totalAmountKg, sortable: true}
    ]

    const columnsT2 = [
        {name: 'Година', selector: row => row.year, sortable: true},
        {name: 'Семе', selector: row => row.seedName, sortable: true},
        {name: 'Сорта', selector: row => row.type, sortable: true},
        {name: 'Вкупно количина кг.', selector: row => row.totalAmountKg, sortable: true}
    ]

    return (
        <div className="container-fluid">
            <h4>  </h4>
            <h5 className="justify-content-center d-flex"> Вкупни количини на сеидби по година и семе </h5>
            <div className="m-3 justify-content-center">
                <BarChartYearSeed data={statistics1}/>
            </div>
            <h5 className="justify-content-center d-flex"> Вкупни количини на сеидби по година, семе и сорта </h5>
            <div className="m-3 justify-content-center">
                <BarChartYearSeedType data={statistics2}/>
            </div>

            <div className="justify-content-center d-flex my-3">
                <button className="add-new p-2 rounded-2 mx-1" onClick={tableStatistics}>
                    Прикажи табеларно
                </button>
            </div>
            <div id="tableStats" style={{display: "none"}}>
                <div id="t1">
                    <h5 className="justify-content-center d-flex"> Вкупни количини на сеидби по година и семе </h5>
                    <DataTable
                        pagination
                        columns={columnsT1}
                        data={statistics1}
                        customStyles={customStyles}
                        highlightOnHover
                    >
                    </DataTable>
                </div>
                <div id="t2">
                    <h5 className="justify-content-center d-flex"> Вкупни количини на сеидби по година, семе и сорта </h5>
                    <DataTable
                        pagination
                        columns={columnsT2}
                        data={statistics2}
                        customStyles={customStyles}
                        highlightOnHover
                    >
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default PlantationStatistics;