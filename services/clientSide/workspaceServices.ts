/* eslint-disable no-undef */
import { TeamSize } from '@prisma/client';
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { workspaceStore } from '@/stores/workspaceStore';
import { getAPIErrorMessage, isEmpty } from '@/helpers/common';
import { Workspace } from '@/utils/dataTypes';
import { MakeAdmin } from '@/utils/appTypes';

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
    const newWorkspace = data as Workspace;

    workspaceStore.setCurrentWorkspace(newWorkspace);

    return newWorkspace;
  } catch (err: any) {
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
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
      if (!isEmpty(user.displayName)) {
        alert('Name is required for user.');
        return false;
      }
      if (!isEmpty(user.email)) {
        alert('Email is required for user.');
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
    if (data) alert('User invited succesfully');
    return data;
  } catch (err: any) {
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
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
    // set current workspace as first workspace get in list
    workspaceStore.setCurrentWorkspace(data[0]);
    return data;
  } catch (err: any) {
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};

/**
 * @desc Update workspace details
 * @param {*} organizationName
 */
export const updateWorkspaceDetails = async (payload: { name: string }) => {
  try {
    workspaceStore.setLoading(true);
    const result = await axios.put(
      `${NEXT_PUBLIC_API_URL}/workspaces`,
      payload,
    );
    if (result) alert('Workspace details updated');
    return true;
  } catch (err: any) {
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
    return false;
  } finally {
    workspaceStore.setLoading(false);
  }
};

/**
 * @desc Make admin
 * @param {*} payload
 */
export const makeAdmin = async (payload: MakeAdmin) => {
  try {
    workspaceStore.setLoading(true);
    const result = await axios.put(
      `${NEXT_PUBLIC_API_URL}/workspaces/users/${payload.userId}`,
      { role: payload.role },
    );
    if (result) alert('Make Admin');
    return true;
  } catch (err: any) {
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
    return false;
  } finally {
    workspaceStore.setLoading(false);
  }
};
