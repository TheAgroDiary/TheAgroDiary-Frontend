import React, {useEffect, useState} from "react";
import axios from "axios";
import BarChartYearSeed from "./BarChartYearSeed";
import BarChartYearSeedType from "./BarChartYearSeedType";
import BarChartYearSeedExpense from "./BarChartYearSeedExpense";

const ExpenseStatistics = () => {

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

    const showTables = () => {
        document.getElementById("t1").style.display = 'block';
        document.getElementById("t2").style.display = 'block';
    }

    return (
        <div className="container-fluid">
            <h5 className="justify-content-center d-flex"> Вкупна сума од трошоци по година и семе </h5>
            <div className="m-3 justify-content-center">
                <BarChartYearSeedExpense data={statistics1}/>
            </div>
            <h5 className="justify-content-center d-flex"> Вкупна сума од трошоци по година </h5>
            <div className="m-3 justify-content-center">
                <BarChartYearSeedType data={statistics2}/>
            </div>

            <div className="justify-content-center d-flex my-3">
                <button className="add-new p-2 rounded-2 mx-1" onClick={showTables}>
                    Прикажи табеларно
                </button>
            </div>
            <div id="t1" style={{display: "none"}}>
                <h5 className="justify-content-center d-flex"> Вкупна сума од трошоци по година и семе </h5>
                <table className="table table-striped table-hover mt-2">
                    <thead className="bg-secondary-subtle">
                    <tr>
                        <th className="bg-secondary-subtle"> Година </th>
                        <th className="bg-secondary-subtle"> Семе </th>
                        <th className="bg-secondary-subtle"> Вкупна сума мкд. </th>
                    </tr>
                    </thead>
                    <tbody>
                    {statistics1.map(s1 => (
                        <tr key={`${s1.year}-${s1.seedName}`}>
                            <td>{s1.year}</td>
                            <td>{s1.seedName}</td>
                            <td>{s1.totalExpense}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div id="t2" style={{display: "none"}}>
                <h5 className="justify-content-center d-flex"> Вкупна сума од трошоци по година </h5>
                <table className="table table-striped table-hover mt-2">
                    <thead className="bg-secondary-subtle">
                    <tr>
                        <th className="bg-secondary-subtle"> Година </th>
                        <th className="bg-secondary-subtle"> Вкупна сума мкд. </th>
                    </tr>
                    </thead>
                    <tbody>
                    {statistics2.map(s2 => (
                        <tr key={`${s2.year}-${s2.type}`}>
                            <td>{s2.year}</td>
                            <td>{s2.totalExpense}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ExpenseStatistics;