/* eslint-disable max-len */
'use client';
import React, { useRef, useEffect, useState } from 'react';
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
import moment from 'moment';
import SVGIcon from '@/assets/icons/SVGIcon';
import { ChartData } from '@/utils/appTypes';
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
  chartData: ChartData[];
}

const CustomChart = ({ valueTitle, title, chartData }: Props) => {
  const chartRef = useRef<ChartJS<'line'>>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
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

  // Generate array of last 28 days
  const last28Days = Array.from({ length: 28 }, (_, i) =>
    moment().subtract(27 - i, 'days'),
  );

  // Find weekend pairs (Saturday and Sunday together)
  const weekendPairs = last28Days.reduce((acc, date, index) => {
    const day = date.format('ddd');
    if (day === 'Sat') {
      acc.push([index, index + 1]); // Store Saturday and Sunday indexes together
    }
    return acc;
  }, [] as number[][]);

  // Generate labels - show dates for weekends
  const xAxisLabels = last28Days.map((date, index) => {
    const isWeekendStart = weekendPairs.some(([sat]) => sat === index);
    return isWeekendStart ? date.format('D MMM') : '';
  });

  // Generate CTR data for all days
  const ctrData = chartData.map((item) => item.queueSize);

  // Calculate max queue size
  const queueSizes = chartData.map((item) => item.queueSize);
  const maxQueueSize = Math.max(...queueSizes);

  // Calculate dynamic bar height (max size + 50px buffer)
  const dynamicBarHeight = maxQueueSize + 5;

  // Generate bar data (combined weekend bars)
  const weekendHighlightData = last28Days.map((date, index) => {
    // Check if this index is the start of a weekend (Saturday)
    const isWeekendStart = weekendPairs.some(([sat]) => sat === index);
    // Only show bar on Saturday, representing the whole weekend
    return isWeekendStart ? dynamicBarHeight : 0;
  });

  const data = {
    labels: last28Days.map((date) => date.format('D MMM')), // All labels
    datasets: [
      {
        type: 'line',
        label: 'Queue Size',
        borderColor: '#5C67F4',
        borderWidth: 3,
        fill: true,
        cubicInterpolationMode: 'monotone',
        backgroundColor: gradientFill,
        data: ctrData,
        pointBackgroundColor: '#5C67F4',
        pointRadius: (context: any) =>
          context.dataIndex === context.dataset.data.length - 1 ? 5 : 0,
        pointHoverRadius: (context: any) =>
          context.dataIndex === context.dataset.data.length - 1 ? 8 : 0,
      },
      {
        type: 'bar',
        label: 'Weekend',
        borderWidth: 1,
        borderSkipped: false,
        backgroundColor: 'transparent',
        data: weekendHighlightData,
        barThickness: 140, // Increased thickness to cover both weekend days
        borderColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(233, 232, 229, 1)';

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          gradient.addColorStop(0, 'rgba(233, 232, 229, 1)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          return gradient;
        },
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
        { intersect: false },
        true,
      );

      if (activePoints.length > 0) {
        const { datasetIndex, index } = activePoints[0];
        const value = data.datasets[0].data[index]; // Always use queue size data
        const date = last28Days[index];
        const isWeekend = weekendPairs.some(([sat]) => sat === index);

        // Get exact positions
        const meta = chart.getDatasetMeta(datasetIndex);
        const dataPoint = meta.data[index];
        const pointY = dataPoint.y;
        const pointX = dataPoint.x;

        // Get y-axis 0 position (x-axis)
        const yAxis = chart.scales.y;
        const xAxisPosition = yAxis.getPixelForValue(0);

        // Calculate positions
        const tooltipHeight = 50;
        const tooltipTop = pointY - tooltipHeight - 10;
        const lineTop = tooltipTop + tooltipHeight;
        const lineHeight = xAxisPosition - lineTop;

        if (tooltipEl) {
          tooltipEl.innerHTML = `
            <div style="position: relative;">
              <!-- Tooltip Box -->
               <div style="
                background: var(--white);
                border-radius: 4px;
                padding: 6px 10px;
                box-shadow: var(--shadow-dropdown);
              ">
                <div style="font-size: 12px; font-weight: 400; line-height: 16px; color: var(--text);">${value} in todo</div>
                <div style="margin-bottom: 2px; font-size: 12px; line-height: 16px; color: var(--text-text-secondary);">
                  ${date.format('D MMM')}${isWeekend ? ' (Weekend)' : ''}
                </div>
              </div>
              
              <!--Connecting Line -->
              <div style="
                position: absolute;
                left: 50%;
                top: 110%;
                width: 2px;
                height: ${lineHeight}px;
                background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #E9E8E5 100%);
                transform: translateX(-50%);
                z-index: 1;
              "></div>
              
              <!--at X-axis -->
              <div style="
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid var(--white);
                z-index: 11;
              "></div>
            </div>
          `;

          tooltipEl.style.display = 'block';
          tooltipEl.style.left = `${pointX}px`;
          tooltipEl.style.top = `${tooltipTop}px`;
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
  }, [data.datasets, data.labels, last28Days, weekendPairs]);

  const options: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      y: {
        position: 'right',
        min: 0,
        ticks: {
          stepSize: Math.ceil(dynamicBarHeight / 4),
          color: 'var(--text-text-secondary)',
          font: { size: 12 },
        },
        grid: { display: false },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: 'var(--text-text-secondary)',
          font: {
            size: 12,
            family: "'Inter', sans-serif", // Add your font family if needed
          },
          padding: 10, // Adjust padding as needed
          callback: function (value, index) {
            return xAxisLabels[index];
          },
          autoSkip: false,
          maxRotation: 0, // Prevent rotation
          minRotation: 0, // Prevent rotation
        },
        border: { display: false },
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
          data={data as any}
          options={options}
          style={{ width: '100%' }}
        />
        {/* Custom Tooltip Element with Arrow */}
        <TooltipDiv ref={tooltipRef} />
      </ChartDiv>
    </MainChartDiv>
  );
};

export default CustomChart;
