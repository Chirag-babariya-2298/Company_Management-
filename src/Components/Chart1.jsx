import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart1 = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    }
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70]
    }
  ]);

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Chart1;
