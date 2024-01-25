import React, {useEffect, useState} from "react";
import axios from "axios";
import BarChartYearSeed from "./BarChartYearSeed";
import BarChartYearSeedType from "./BarChartYearSeedType";
import { showHideTableStats } from "../CustomJavaScript";

const YieldStatistics = () => {

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
        axios.get('http://localhost:9091/api/yield/statistics1', config)
            .then((response) => {
                setStatistics1(response.data);
            })
            .catch(error => {
                console.error('Error fetching summary by Year and Seed: ', error)
            })
        axios.get('http://localhost:9091/api/yield/statistics2', config)
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
            <h4>  </h4>
            <h5 className="justify-content-center d-flex"> Вкупни количини на приноси по година и семе </h5>
            <div className="m-3 justify-content-center">
                <BarChartYearSeed data={statistics1}/>
            </div>
            <h5 className="justify-content-center d-flex"> Вкупни количини на приноси по година, семе и сорта </h5>
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
                    <h5 className="justify-content-center d-flex"> Вкупни количини на прионси по година и семе </h5>
                    <table className="table table-striped table-hover mt-2">
                        <thead className="bg-secondary-subtle">
                        <tr>
                            <th className="bg-secondary-subtle"> Година </th>
                            <th className="bg-secondary-subtle"> Семе </th>
                            <th className="bg-secondary-subtle"> Вкупно количина кг. </th>
                        </tr>
                        </thead>
                        <tbody>
                        {statistics1.map(s1 => (
                            <tr key={`${s1.year}-${s1.seedName}`}>
                                <td>{s1.year}</td>
                                <td>{s1.seedName}</td>
                                <td>{s1.totalAmountKg}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div id="t2">
                    <h5 className="justify-content-center d-flex"> Вкупни количини на прионси по година, семе и сорта </h5>
                    <table className="table table-striped table-hover mt-2">
                        <thead className="bg-secondary-subtle">
                        <tr>
                            <th className="bg-secondary-subtle"> Година </th>
                            <th className="bg-secondary-subtle"> Семе </th>
                            <th className="bg-secondary-subtle"> Сорта </th>
                            <th className="bg-secondary-subtle"> Вкупно количина кг. </th>
                        </tr>
                        </thead>
                        <tbody>
                        {statistics2.map(s2 => (
                            <tr key={`${s2.year}-${s2.type}`}>
                                <td>{s2.year}</td>
                                <td>{s2.seedName}</td>
                                <td>{s2.type}</td>
                                <td>{s2.totalAmountKg}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default YieldStatistics;