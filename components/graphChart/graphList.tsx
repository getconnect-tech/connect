import React from 'react';
import { List } from './style';
import QueueChart from './chart';

interface Props {
  chartData: { valueTitle: string; title: string }[];
}

function GraphList({ chartData }: Props) {
  return (
    <List>
      {chartData.map((item, index) => (
        <QueueChart
          key={index}
          valueTitle={item.valueTitle}
          title={item.title}
        />
      ))}
    </List>
  );
}

export default GraphList;
