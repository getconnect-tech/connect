import { TeamSize, UserRole } from '@prisma/client';
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { workspaceStore } from '@/stores/workspaceStore';
import { getAPIErrorMessage, isEmpty } from '@/helpers/common';
import { CurrentWorkspace } from '@/utils/dataTypes';
import { UpdateRole } from '@/utils/appTypes';
import { ticketStore } from '@/stores/ticketStore';
import { messageStore } from '@/stores/messageStore';

/**
 * @desc Create Workspace
 * @param {*} name teamSize industry invitedUsers
 */
export const createWorkspace = async (
  name: string,
  teamSize: TeamSize,
  industry: string,
  invitedUsers?: { displayName: string; email: string }[],
) => {
  try {
    workspaceStore.setLoading(true);

    const payload = {
      name,
      teamSize,
      industry,
      invitedUsers,
    };

    const { data } = await axios.post(
      `${NEXT_PUBLIC_API_URL}/workspaces`,
      payload,
    );
    const newWorkspace = data as CurrentWorkspace;

    workspaceStore.setCurrentWorkspace(newWorkspace);

    return newWorkspace;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};

/**
 * @desc Invite user in workspace
 * @param {*} usersToInvite
 */
export const inviteUsersToWorkspace = async (
  usersToInvite: { displayName: string; email: string }[],
) => {
  try {
    workspaceStore.setLoading(true);

    // Check for empty displayName or email in usersToInvite array
    for (const user of usersToInvite) {
      if (isEmpty(user.displayName)) {
        messageStore.setErrorMessage('Name is required for user.');
        return false;
      }
      if (isEmpty(user.email)) {
        messageStore.setErrorMessage('Email is required for user.');

        return false;
      }
    }

    const payload = {
      invitedUsers: usersToInvite,
    };
    const { data } = await axios.post(
      `${NEXT_PUBLIC_API_URL}/workspaces/inviteUsers`,
      payload,
      {
        headers: {
          workspace_id: workspaceStore.currentWorkspace?.id,
        },
      },
    );
    if (data) messageStore.setSuccessMessage('User invited succesfully');
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};

/**
 * @desc Get user's workspace list
 * @param {*}
 */
export const getWorkspaceList = async () => {
  try {
    workspaceStore.setLoading(true);
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/workspaces`);
    const { data } = response;
    if (data?.length > 0) {
      workspaceStore.setWorkspaceList(data);
      return data;
    }
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};

/**
 * @desc Get workspace by id
 * @param {*} workspaceId
 */
export const getWorkspaceById = async (workspaceId: string) => {
  try {
    workspaceStore.setLoading(true);
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/workspaces/${workspaceId}`,
    );
    const { data } = response;
    if (data) {
      workspaceStore.setCurrentWorkspace(data);
      return data;
    }
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};

/**
 * @desc Update workspace details
 * @param {*} organizationName
 */
export const updateWorkspaceDetails = async (payload: {
  name: string;
  imageUrl: string | null;
}) => {
  try {
    workspaceStore.setLoading(true);
    const result = await axios.put(
      `${NEXT_PUBLIC_API_URL}/workspaces`,
      payload,
    );
    if (result) messageStore.setSuccessMessage('Workspace details updated');
    return true;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};

/**
 * @desc Update Role
 * @param {*} payload
 */
export const updateRole = async (payload: UpdateRole) => {
  try {
    workspaceStore.setLoading(true);
    const result = await axios.put(
      `${NEXT_PUBLIC_API_URL}/workspaces/users/${payload.userId}`,
      { role: payload.role },
    );
    if (result) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      payload.role === UserRole.ADMIN
        ? messageStore.setSuccessMessage('Updated admin role successfully.')
        : messageStore.setSuccessMessage('Admin role removed successfully.');
    }
    return true;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};

/**
 * @desc Delete user from Member
 * @param {*} userId
 */
export const removeMemberFromWorkspace = async (userId: string) => {
  try {
    workspaceStore.setLoading(true);
    const result = await axios.delete(
      `${NEXT_PUBLIC_API_URL}/workspaces/users/${userId}`,
    );
    if (result) messageStore.setSuccessMessage('User Deleted');
    return true;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};

/**
 * @desc Change workspace
 * @param {*} workspaceId
 */
export const workspaceChange = async (workspaceId: string) => {
  try {
    ticketStore.resetTicketData();
    const result = getWorkspaceById(workspaceId);
    return result;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  }
};

/**
 * @desc Delete invited user from workspace
 * @param {*} userId
 */
export const removeInviteUsersFromWorkspace = async (userId: string) => {
  try {
    workspaceStore.setLoading(true);
    const result = await axios.delete(
      `${NEXT_PUBLIC_API_URL}/workspaces/inviteUsers/${userId}`,
    );
    if (result) messageStore.setSuccessMessage('Invite User Removed');
    return true;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};

/**
 * @desc Re invited user from workspace
 * @param {*} userId
 */
export const reInviteUsersFromWorkspace = async (userId: string) => {
  try {
    workspaceStore.setLoading(true);
    const result = await axios.post(
      `${NEXT_PUBLIC_API_URL}/workspaces/inviteUsers/${userId}/reinvite`,
    );
    if (result) messageStore.setSuccessMessage('User Reinvited');
    return true;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};
