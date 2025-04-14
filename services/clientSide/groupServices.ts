import axios from 'axios';
import { getAPIErrorMessage } from '@/helpers/common';
import { messageStore } from '@/stores/messageStore';
import { groupStore } from '@/stores/groupStore';
import { workspaceStore } from '@/stores/workspaceStore';

/**
 * @desc Get group details by ID
 * @param {string} groupId
 */
export const getGroupDetailById = async (groupId: string) => {
  try {
    const workspaceId = workspaceStore.currentWorkspace?.id;
    if (!workspaceId) {
      throw new Error('No workspace selected');
    }

    groupStore.setLoading(true);
    const response = await axios.get(`/api/groups/${groupId}`, {
      headers: {
        workspace_id: workspaceId,
      },
    });
    const { data } = response;
    if (data) {
      groupStore.setGroupDetails(data);
      return data;
    }
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    groupStore.setLoading(false);
  }
};
