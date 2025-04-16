'use client';

import { makeAutoObservable } from 'mobx';
import { QueueSizeResponse } from '@/services/serverSide/insights';

class InsightStore {
  loading = false;
  queueSizeData: QueueSizeResponse | null = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(value: boolean) {
    this.loading = value;
  }

  setQueueSizeData(data: QueueSizeResponse | null) {
    console.log('Setting queue size data:', data); // Debug log
    this.queueSizeData = data;
    this.error = null;
  }

  setError(error: string | null) {
    this.error = error;
    this.queueSizeData = null;
  }

  resetData() {
    this.queueSizeData = null;
    this.error = null;
  }
}

export const insightStore = new InsightStore();
