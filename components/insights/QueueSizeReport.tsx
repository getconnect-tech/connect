'use client'
import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { getQueueSizeInsights } from '@/services/clientSide/insightServices';
import { useStores } from '@/stores';
import GraphList from '@/components/graphChart/graphList';

function QueueSizeReport() {
  const { insightStore } = useStores();
  const { loading, queueSizeData } = insightStore;

  const loadData = useCallback(async () => {
    const data = await getQueueSizeInsights();
    console.log('Queue size data loaded:', data); // Debug log
  }, []);

  useEffect(() => {
    loadData();
    return () => {
      insightStore.resetData();
    };
  }, [loadData]);

  // Calculate the current queue size (latest data point)
  const currentQueueSize = queueSizeData?.data?.[queueSizeData.data.length - 1]?.queueSize || 0;
  console.log('Current queue size:', currentQueueSize); // Debug log

  // Format the chart data for the custom chart component
  const chartData = [
    {
      valueTitle: `<span>${currentQueueSize}</span> in todo`,
      title: 'Queue size',
      chartData: queueSizeData?.data || [],
    }
  ];

  if (loading) {
    return <div>Loading queue size insights...</div>;
  }

  return <GraphList chartData={chartData} />;
}

export default observer(QueueSizeReport); 