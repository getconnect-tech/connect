import { action, makeObservable, observable } from 'mobx';
import {
  FirstResponseTimeInsights,
  QueueSizeInsights,
  ResolutionTimeInsights,
} from '@/utils/dataTypes';

class InsightsStore {
  loading = false;
  queueSize: QueueSizeInsights | null = null;
  firstResponseTime: FirstResponseTimeInsights | null = null;
  resolutionTime: ResolutionTimeInsights | null = null;

  constructor() {
    makeObservable(this, {
      //Loading variable
      loading: observable,
      setLoading: action,

      //Queue Size
      queueSize: observable,
      setQueueSize: action,

      //First Response Time
      firstResponseTime: observable,
      setFirstResponseTime: action,

      //Resolution Time
      resolutionTime: observable,
      setResolutionTime: action,
    });
  }

  // Loading actions
  setLoading(value: boolean) {
    this.loading = value;
  }

  // Queue Size actions
  setQueueSize(value: QueueSizeInsights) {
    this.queueSize = value;
  }

  // First Response Time actions
  setFirstResponseTime(value: FirstResponseTimeInsights) {
    this.firstResponseTime = value;
  }

  // Resolution Time actions
  setResolutionTime(value: ResolutionTimeInsights) {
    this.resolutionTime = value;
  }
}

export const insightsStore = new InsightsStore();
