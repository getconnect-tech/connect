import React from 'react';
import { ChartData } from '@/utils/appTypes';
import { List } from './style';
import CustomChart from './chart';

interface Chart {
  valueTitle: string;
  title: string;
  chartData: ChartData[];
}
interface Props {
  chartData: Chart[];
}

function GraphList({ chartData }: Props) {
  return (
    <List>
      {chartData.map((item, index) => (
        <CustomChart
          key={index}
          valueTitle={item.valueTitle}
          title={item.title}
          chartData={item?.chartData}
        />
      ))}
    </List>
  );
}

export default GraphList;
