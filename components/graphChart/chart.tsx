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
import moment from 'moment';
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

  // Get formatted labels for the last 28 days
  // Generate last 28 days
  const last28Days = Array.from({ length: 28 }, (_, i) =>
    moment().subtract(27 - i, 'days'),
  );

  // Generate random CTR data (for all 28 days)
  const allDaysLabels = last28Days.map((date) => date.format('D MMM'));

  const ctrData = last28Days.map(() => Math.floor(Math.random() * 40));

  // Clicks data: Keep 0 for non-Monday days and fixed height for Mondays
  const fixedBarHeight = 100;
  const weeklyClicksData = last28Days.map((date) =>
    date.format('ddd') === 'Mon' ? fixedBarHeight : 0,
  );

  // const [gradientFill, setGradientFill] = useState<string | CanvasGradient>('');

  // useEffect(() => {
  //   if (chartRef.current) {
  //     const ctx = chartRef.current.ctx;
  //     if (ctx) {
  //       // Create Fill Gradient for Line Chart
  //       const fillGradient = ctx.createLinearGradient(0, 0, 0, 250);
  //       fillGradient.addColorStop(0, 'rgba(92, 103, 244, 0.25)');
  //       fillGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  //       setGradientFill(fillGradient);
  //     }
  //   }
  // }, []);

  const data = {
    labels: allDaysLabels, // Weekly labels (Mondays)
    datasets: [
      {
        type: 'line',
        label: 'CTR',
        borderColor: '#5C67F4',
        borderWidth: 3,
        fill: true,
        cubicInterpolationMode: 'monotone',
        backgroundColor: 'transparent',
        data: ctrData, // Full 28 days CTR data
        pointBackgroundColor: '#5C67F4',
        pointRadius: (context: any) =>
          context.dataIndex === context.dataset.data.length - 1 ? 5 : 0,
        pointHoverRadius: (context: any) =>
          context.dataIndex === context.dataset.data.length - 1 ? 8 : 0,
      },
      {
        type: 'bar',
        label: 'Clicks',
        borderWidth: 1,
        borderSkipped: false,
        backgroundColor: 'transparent', // Only visible on Mondays
        data: weeklyClicksData, // 0 for non-Mondays
        barThickness: 70,
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
        const value = data.datasets[datasetIndex].data[index];
        const label = data.labels?.[index] || '';

        // Get exact positions
        const meta = chart.getDatasetMeta(datasetIndex);
        const dataPoint = meta.data[index];
        const pointY = dataPoint.y;
        const pointX = dataPoint.x;

        // Get y-axis 0 position (x-axis)
        const yAxis = chart.scales.y;
        const xAxisPosition = yAxis.getPixelForValue(0);

        // Calculate positions
        const tooltipHeight = 50; // Approximate tooltip height
        const tooltipTop = pointY - tooltipHeight - 10; // Position above point
        const lineTop = tooltipTop + tooltipHeight; // Bottom of tooltip
        const lineHeight = xAxisPosition - lineTop; // Distance to x-axis

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
                <div style="margin-bottom: 2px; font-size: 12px; line-height: 16px; color: var(--text-text-secondary);">${label}</div>
              </div>
              
              <!-- Red Connecting Line -->
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
              
              <!-- Red Dot at X-axis -->
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
        max: 120,
        ticks: { stepSize: 20 },
        grid: { drawTicks: false, display: false },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: {
          padding: 10,
          callback: function (value, index) {
            return last28Days[index].format('ddd') === 'Mon'
              ? allDaysLabels[index] // Show only Monday labels
              : '';
          },
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

export default QueueChart;
