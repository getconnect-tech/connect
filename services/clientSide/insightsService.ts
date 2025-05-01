import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { messageStore } from '@/stores/messageStore';
import { getAPIErrorMessage } from '@/helpers/common';
import { insightsStore } from '@/stores/insightsStore';

/**
 * @desc Get queue size
 * @param {*}
 */
export const getQueueSize = async (payload?: {
  startDate?: string;
  endDate?: string;
}) => {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/insights/queue-size`,
      { params: payload },
    );
    const { data } = response;
    insightsStore.setQueueSize(data);
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Enable to fetch queue size!',
    );
    return null;
  }
};

/**
 * @desc Get first response time
 * @param {*}
 */
export const getFirstResponseTime = async (payload?: {
  startDate?: string;
  endDate?: string;
}) => {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/insights/first-response-time`,
      { params: payload },
    );
    const { data } = response;
    insightsStore.setFirstResponseTime(data);
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Enable to fetch first response time!',
    );
    return null;
  }
};

/**
 * @desc Get resolution time
 * @param {*}
 */
export const getResolutionTime = async (payload?: {
  startDate?: string;
  endDate?: string;
}) => {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/insights/resolution-time`,
      { params: payload },
    );
    const { data } = response;
    insightsStore.setResolutionTime(data);
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Enable to fetch resolution time!',
    );
    return null;
  }
};
