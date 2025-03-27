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
  const [gradientFill, setGradientFill] = useState<string | CanvasGradient>('');

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      if (ctx) {
        // Create Fill Gradient for Line Chart
        const fillGradient = ctx.createLinearGradient(0, 0, 0, 250);
        fillGradient.addColorStop(0, 'rgba(92, 103, 244, 0.25)');
        fillGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        setGradientFill(fillGradient);
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
        fill: true,
        cubicInterpolationMode: 'monotone',
        backgroundColor: gradientFill,
        data: [1, 2, 1, 3, 5, 4, 9], // Keep Line Chart values unchanged
      },
      {
        yAxisID: 'left-y-axis',
        type: 'bar',
        label: 'Clicks',
        borderWidth: 1,
        borderSkipped: false,
        backgroundColor: 'transparent',
        data: [50, 50, 50, 50, 50, 50, 50], // 🔹 All bars have same height
        barThickness: 30,

        borderColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(233, 232, 229, 1)'; // Fallback color

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          gradient.addColorStop(0, 'rgba(233, 232, 229, 1)'); // Dark at Bottom
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Light at Top
          return gradient;
        },
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
