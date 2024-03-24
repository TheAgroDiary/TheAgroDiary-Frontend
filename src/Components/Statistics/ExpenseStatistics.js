import React, {useEffect, useState} from "react";
import axios from "axios";
import BarChartYearTotalRevenueAndExpense from "./BarChartYearTotalRevenueAndExpense";
import BarChartYearSeedRevenueAndExpense from "./BarChartYearSeedRevenueAndExpense";
import { showHideTableStats } from "../CustomJavaScript";
import DataTable from "react-data-table-component";
import customStyles from "../DataTableCustomStyles";

const ExpenseStatistics = () => {

    const [statistics1, setStatistics1] = useState([]);
    const [statistics2, setStatistics2] = useState([]);
    const totalExpenseAttribute = 'totalExpense'

    const token = localStorage.getItem('jwt');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };

    const columnsT1 = [
        {name: 'Година', selector: row => row.year, sortable: true},
        {name: 'Семе', selector: row => row.seedName, sortable: true},
        {name: 'Вкупна сума мкд.', selector: row => row.totalExpense, sortable: true}
    ]

    const columnsT2 = [
        {name: 'Година', selector: row => row.year, sortable: true},
        {name: 'Вкупна сума мкд.', selector: row => row.totalExpense, sortable: true}
    ]

    useEffect (() => {
        axios.get('http://localhost:9091/api/expense/statistics1', config)
            .then((response) => {
                setStatistics1(response.data);
            })
            .catch(error => {
                console.error('Error fetching summary by Year and Seed: ', error)
            })
        axios.get('http://localhost:9091/api/expense/statistics2', config)
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

    return (
        <div className="container-fluid">
            <h5 className="justify-content-center d-flex"> Вкупна сума од трошоци по година и семе </h5>
            <div className="m-3 justify-content-center">
                <BarChartYearSeedRevenueAndExpense data={statistics1} totals={totalExpenseAttribute}/>
            </div>
            <h5 className="justify-content-center d-flex"> Вкупна сума од трошоци по година </h5>
            <div className="m-3 justify-content-center">
                <BarChartYearTotalRevenueAndExpense data={statistics2} totals={totalExpenseAttribute}/>
            </div>

            <div className="justify-content-center d-flex my-3">
                <button className="add-new p-2 rounded-2 mx-1" onClick={tableStatistics}>
                    Прикажи табеларно
                </button>
            </div>
            <div id="tableStats" style={{display: "none"}}>
                <div id="t1">
                    <h5 className="justify-content-center d-flex"> Вкупна сума од трошоци по година и семе </h5>
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
                    <h5 className="justify-content-center d-flex"> Вкупна сума од трошоци по година </h5>
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

export default ExpenseStatistics;