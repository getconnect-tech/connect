/* eslint-disable max-len */
'use client';
import React, { useRef, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
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
  LineController,
  BarController,
} from 'chart.js';
import { BarElement } from 'chart.js';
import { ChartOptions } from 'chart.js';
import SVGIcon from '@/assets/icons/SVGIcon';
import {
  ChartDiv,
  HeaderSection,
  HeadingTitle,
  MainChartDiv,
  TooltipDiv,
  TopSection,
  ValueTitle,
} from './style';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface Props {
  valueTitle: string;
  title: string;
}

const QueueChart = ({ valueTitle, title }: Props) => {
  const chartRef = useRef<ChartJS<'line'>>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const taskData = [5, 10, 35, 20, 28, 5, 10, 35, 20, 28];
  const dates = [
    '19 Jan',
    '26 Jan',
    '02 Feb',
    '07 Feb',
    'Today',
    '19 Jan',
    '26 Jan',
    '02 Feb',
    '07 Feb',
    'Today',
  ];

  // Data configuration
  const data = {
    labels: dates,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Background Bar',
        data: taskData,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // If chartArea is not available, return a fallback color
            setTimeout(() => {
              chart.update(); // Trigger re-render once chartArea is available
            }, 0);
            return 'rgba(63, 130, 247, 0.1)'; // Temporary fallback color
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, 'rgba(63, 130, 247, 0)'); // Transparent at top
          gradient.addColorStop(1, 'rgba(63, 130, 247, 0.3)'); // Darker at bottom

          return gradient;
        },
        borderWidth: 0, // Ensures bars have a visible border
        barPercentage: 0.6,
        categoryPercentage: 1.0,
      },
      {
        type: 'line' as const,
        label: 'Queue Size',
        data: taskData, // Your data points
        borderColor: '#5C67F4',
        backgroundColor: 'rgba(63, 130, 247, 0.2)',
        pointBackgroundColor: '#5C67F4',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#5C67F4',
        borderWidth: 2.5, // Makes the line slightly thicker
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.2, // Smooth curve
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
      const { current: chart } = chartRef;
      if (!chart) return;

      const activePoints = chart.getElementsAtEventForMode(
        event,
        'nearest',
        { intersect: false }, // Ensures tooltip only appears when hovering directly over a data point
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
          const left = event.clientX - position.left;
          const top = chart.getDatasetMeta(0).data[index].y - 60; // Adjusted for arrow

          tooltipEl.style.left = `${left}px`;
          tooltipEl.style.top = `${top}px`;
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

  const options: ChartOptions<'bar' | 'line'> = {
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
  };

  return (
    <MainChartDiv>
      <TopSection>
        <HeaderSection>
          <HeadingTitle>{title}</HeadingTitle>
          <SVGIcon
            name='chart-tooltip-icon'
            width='12'
            height='12'
            viewBox='0 0 12 12'
          />
        </HeaderSection>
        <ValueTitle dangerouslySetInnerHTML={{ __html: valueTitle }} />
      </TopSection>
      <ChartDiv>
        <Chart
          ref={chartRef}
          type='bar'
          data={data}
          options={options}
          style={{ width: '100%' }}
        />
        {/* Custom Tooltip Element with Arrow */}
        <TooltipDiv ref={tooltipRef} />
      </ChartDiv>
    </MainChartDiv>
  );
};

export default QueueChart;
