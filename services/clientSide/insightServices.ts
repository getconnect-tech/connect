import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { messageStore } from '@/stores/messageStore';
import { getAPIErrorMessage } from '@/helpers/common';
import { insightStore } from '@/stores/insightStore';
import { workspaceStore } from '@/stores/workspaceStore';
import UserPreferenceSingleton from '@/helpers/userPreferenceSingleton';
import { QueueSizeResponse } from '../serverSide/insights';
import { getWorkspaceById } from './workspaceServices';

// Configure axios defaults for all requests
axios.interceptors.request.use((config) => {
  const workspaceId = workspaceStore?.currentWorkspace?.id;
  if (workspaceId) {
    config.headers = config.headers || {};
    config.headers['workspace_id'] = workspaceId;
  }
  return config;
});

/**
 * @desc Get queue size insights data
 */
export const getQueueSizeInsights =
  async (): Promise<QueueSizeResponse | null> => {
    try {
      insightStore.setLoading(true);
      console.log('Fetching queue size data...'); // Debug log

      // Check if we have a workspace in the store
      let workspaceId = workspaceStore?.currentWorkspace?.id;

      // If no workspace in store, try to load it from preferences
      if (!workspaceId) {
        const savedWorkspaceId =
          UserPreferenceSingleton.getInstance().getCurrentWorkspace();
        if (savedWorkspaceId) {
          console.log('Loading workspace from preferences...'); // Debug log
          const workspace = await getWorkspaceById(savedWorkspaceId);
          if (workspace) {
            workspaceId = workspace.id;
          }
        }
      }

      if (!workspaceId) {
        messageStore.setErrorMessage(
          'No workspace selected. Please select a workspace first.',
        );
        return null;
      }

      const response = await axios.get(
        `${NEXT_PUBLIC_API_URL}/insights/queue-size`,
      );

      console.log('API Response:', response.data); // Debug log

      if (!response.data || !response.data.data) {
        throw new Error('Invalid data format received from API');
      }

      insightStore.setQueueSizeData(response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage =
        getAPIErrorMessage(err) || 'Failed to fetch queue size insights';
      console.error('Error fetching queue size data:', err); // Debug log
      messageStore.setErrorMessage(errorMessage);
      insightStore.setError(errorMessage);
      return null;
    } finally {
      insightStore.setLoading(false);
    }
  };
