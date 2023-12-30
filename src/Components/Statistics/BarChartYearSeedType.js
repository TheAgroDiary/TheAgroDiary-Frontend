import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const BarChartYearSeedType = ({ data }) => {
    const [chart, setChart] = useState(null);
    const chartRef = React.createRef();

    useEffect(() => {
        if (chartRef && data && data.length > 0) {
            const ctx = chartRef.current.getContext('2d');

            const labels = data.map(item => `${item.year} - ${item.seedName} - ${item.type}`);
            const amounts = data.map(item => item.totalAmountKg);

            if (chart) {
                chart.destroy();
            }

            setChart(
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Вкупно кг.',
                                data: amounts,
                                backgroundColor: '#40bf40',
                                // borderColor: 'rgba(54, 162, 235, 1)',
                                // borderWidth: 1,
                            },
                        ],
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

export default BarChartYearSeedType;


