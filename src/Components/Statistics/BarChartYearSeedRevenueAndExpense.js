import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const BarChartYearSeedRevenueAndExpense = ({ data, totals }) => {
    const [chart, setChart] = useState(null);
    const chartRef = React.createRef();

    useEffect(() => {
        if (chartRef && data && data.length > 0) {
            const ctx = chartRef.current.getContext('2d');

            const years = [...new Set(data.map(item => item.year))]; // Get unique years
            const seedNames = [...new Set(data.map(item => item.seedName))]; // Get unique seedNames
            const fixedColors = ["#b0120a", "#ffab91", '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']; // Define fixed colors

            if (chart) {
                chart.destroy(); // Destroy existing chart to prevent duplicates
            }

            setChart(
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: years,
                        datasets: seedNames.map((seedName, seedIndex) => {
                            const seedData = years.map((year, yearIndex) => {
                                const filteredData = data.filter(item => item.year === year && item.seedName === seedName);
                                return filteredData.length > 0 ? filteredData[0][totals] : 0;
                            });

                            return {
                                label: seedName,
                                data: seedData,
                                backgroundColor: fixedColors[seedIndex % fixedColors.length],
                                // backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`, // Bar color
                                // borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`, // Border color
                                // borderWidth: 1,
                            };
                        }),
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                })
            );
        }
    }, [data]);

    return <canvas ref={chartRef} style={{ width: '300px', height:'200px' }} />;
};

export default BarChartYearSeedRevenueAndExpense;

