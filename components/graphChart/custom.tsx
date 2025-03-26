import React from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
);

const CustomChart: React.FC = () => {
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        yAxisID: 'right-y-axis',
        type: 'line',
        label: 'CTR',
        borderColor: '#ba78cb',
        borderWidth: 3,
        fill: true,
        cubicInterpolationMode: 'monotone',

        backgroundColor:
          'linear-gradient(180deg, rgba(92, 103, 244, 0.25) 0%, rgba(255, 255, 255, 0) 70%);',
        data: [1, 2, 1, 3, 5, 4, 9],
      },
      {
        yAxisID: 'left-y-axis',
        type: 'bar',
        label: 'Clicks',
        borderWidth: 1,
        borderRadius: 0,
        borderSkipped: false,
        backgroundColor: 'transparent',
        data: [30, 30, 30, 30, 30, 30, 30, 30],
        barThickness: 30,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
      'left-y-axis': {
        type: 'linear',
        grid: {
          lineWidth: 0,
        },
      },
      'right-y-axis': {
        type: 'linear',
        position: 'right',
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: '400px', height: '250px' }}>
      {/* Change Chart type to "bar" and use a mixed dataset */}
      <Chart type='bar' data={data as any} options={options} />
    </div>
  );
};

export default CustomChart;
