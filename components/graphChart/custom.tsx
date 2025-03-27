import React, { useRef, useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
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
  const chartRef = useRef<any>(null);
  const [gradient, setGradient] = useState<string | CanvasGradient>('');

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      if (ctx) {
        const gradientFill = ctx.createLinearGradient(0, 0, 0, 250);
        gradientFill.addColorStop(0, 'rgba(92, 103, 244, 0.25)');
        gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0)');
        setGradient(gradientFill);
      }
    }
  }, []);

  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        yAxisID: 'right-y-axis',
        type: 'line',
        label: 'CTR',
        borderColor: '#5C67F4',
        borderWidth: 3,
        fill: true, // Enable fill for gradient effect
        cubicInterpolationMode: 'monotone',
        backgroundColor: gradient, // Apply the gradient here
        data: [1, 2, 1, 3, 5, 4, 9],
      },
      {
        yAxisID: 'left-y-axis',
        type: 'bar',
        label: 'Clicks',
        borderWidth: 1,
        borderRadius: 0,
        borderColor: 'rgba(255, 255, 255, 0), rgba(233, 232, 229, 1)',
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
      {/* Pass the ref to Chart.js */}
      <Chart ref={chartRef} type='bar' data={data as any} options={options} />
    </div>
  );
};

export default CustomChart;
