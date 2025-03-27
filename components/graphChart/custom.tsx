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
        type: 'line',
        label: 'CTR',
        borderColor: '#5C67F4',
        borderWidth: 3,
        fill: true,
        cubicInterpolationMode: 'monotone',
        backgroundColor: gradientFill,
        data: [20, 25, 10, 30, 5, 35, 40], // Keep Line Chart values unchanged
      },
      {
        type: 'bar',
        label: 'Clicks',
        borderWidth: 1,
        borderSkipped: false,
        backgroundColor: 'transparent',
        data: [50, 50, 50, 50, 50, 50, 50], // 🔹 All bars have same height
        barThickness: 50,

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
        border: {
          display: false,
        },
      },
      y: {
        position: 'right',
        min: 0,
        max: 40,
        ticks: {
          stepSize: 10,
          callback: (value: string | number) => `${value} `,
        },
        grid: {
          drawTicks: false,
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '250px' }}>
      {/* Pass the ref to Chart.js */}
      <Chart ref={chartRef} type='bar' data={data as any} options={options} />
    </div>
  );
};

export default CustomChart;
