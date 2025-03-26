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
} from 'chart.js';

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
);

const CustomChart = () => {
  const data = {
    labels: ['19 Jan', '26 Jan', '02 Feb', '07 Feb', 'Today'],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Background Bar',
        data: [5, 15, 25, 19, 28],
        backgroundColor: 'transparent',
        borderWidth: 2, // Ensure border is visible
        barPercentage: 0.6,
        categoryPercentage: 1.0,
        borderColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            setTimeout(() => chart.update(), 0);
            return '#3F82F7'; // Fallback color
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top, // Reverse direction
          );
          gradient.addColorStop(0, '#3F82F7'); // Darker at the bottom
          gradient.addColorStop(1, '#A7C3FF'); // Lighter at the top

          return gradient;
        },
      },
      {
        type: 'line' as const,
        label: 'Queue Size',
        data: [5, 15, 25, 19, 28],
        borderColor: '#3F82F7',
        backgroundColor: 'rgba(63, 130, 247, 0.2)',
        pointBackgroundColor: '#3F82F7',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3F82F7',
        borderWidth: 2.5,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.3, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: false },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ccc',
        borderWidth: 1,
        displayColors: false,
        padding: 10,
        cornerRadius: 5,
      },
    },
  };

  return (
    <div style={{ width: '400px', height: '250px' }}>
      <Chart type='bar' data={data} options={options} />
    </div>
  );
};

export default CustomChart;
