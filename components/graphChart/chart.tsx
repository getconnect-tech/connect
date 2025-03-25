/* eslint-disable max-len */
'use client';
import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const QueueChart = () => {
  const chartRef = useRef<ChartJS<'line'>>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Data configuration
  const data: ChartData<'line'> = {
    labels: [
      '31 Jan',
      '01 Feb',
      '02 Feb',
      '03 Feb',
      '04 Feb',
      '05 Feb',
      '06 Feb',
      '07 Feb',
    ],
    datasets: [
      {
        data: [28, 19, 19, 40, 30, 19, 10, 0],
        borderColor: '#5C67F4',
        backgroundColor: 'rgba(75, 141, 248, 0.2)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointStyle: 'circle',
        pointRadius: 3,
        pointHoverRadius: 7,
        pointBackgroundColor: '#4B8DF8',
        pointHoverBackgroundColor: '#4B8DF8',
      },
    ],
  };

  // Tooltip setup with arrow
  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || !tooltipRef.current) return;

    const tooltipEl = tooltipRef.current;
    tooltipEl.style.display = 'none';

    const handleHover = (event: MouseEvent) => {
      if (!chart) return;

      const activePoints = chart.getElementsAtEventForMode(
        event,
        'nearest',
        { intersect: true }, // Ensures tooltip only appears when hovering directly over a data point
        true,
      );

      if (activePoints.length > 0) {
        const { datasetIndex, index } = activePoints[0];
        const value = data.datasets[datasetIndex].data[index];
        const label = data.labels?.[index] || '';

        if (tooltipEl) {
          tooltipEl.innerHTML = `
            <div style="position: relative;">
              <div style="
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid var(--white);
              "></div>
              <div style="
                background: var(--white);
                border-radius: 4px;
                padding: 6px 10px;
                box-shadow: var(--shadow-dropdown);
              ">
                <div style="font-size: 12px; font-weight: 400; line-height: 16px; color: var(--text);">${value} in todo</div>
                <div style="margin-bottom: 2px; font-size: 12px; line-height: 16px; color: var(--text-text-secondary);">${label}</div>
              </div>
            </div>
          `;
          tooltipEl.style.display = 'block';

          const position = chart.canvas.getBoundingClientRect();
          const point = chart.getDatasetMeta(datasetIndex).data[index];

          tooltipEl.style.left = `${point.x}px`;
          tooltipEl.style.top = `${point.y - 60}px`; // Adjusted for tooltip position
        }
      } else {
        tooltipEl.style.display = 'none';
      }
    };

    chart.canvas.addEventListener('mousemove', handleHover);
    chart.canvas.addEventListener('mouseout', () => {
      tooltipEl.style.display = 'none';
    });

    return () => {
      chart.canvas.removeEventListener('mousemove', handleHover);
      chart.canvas.removeEventListener('mouseout', () => {
        tooltipEl.style.display = 'none';
      });
    };
  }, [data.datasets, data.labels]);

  // Chart options with proper TypeScript typing
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
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
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        cubicInterpolationMode: 'monotone',
      },
    },
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '600px',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
      }}
    >
      <h3
        style={{
          margin: '0 0 20px 0',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Queue size
      </h3>

      <div style={{ height: '250px', position: 'relative' }}>
        <Line ref={chartRef} data={data} options={options} />

        {/* Custom Tooltip Element with Arrow */}
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            display: 'none',
            zIndex: 100,
            transform: 'translateX(-50%)',
            minWidth: 80,
          }}
        />
      </div>
    </div>
  );
};

export default QueueChart;
