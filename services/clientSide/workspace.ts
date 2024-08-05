import { NEXT_PUBLIC_API_URL } from "@/helpers/environment";
import { workspaceStore } from "@/stores/workspaceStore";
import { TeamSize, Workspace } from "@prisma/client";
import axios from "axios";

export const createWorkspace = async (
  name: string,
  teamSize: TeamSize,
  industry: string,
  invitedUsers?: { displayName: string; email: string }[]
) => {
  try {
    workspaceStore.setLoading(true);

    const payload = {
      name,
      teamSize,
      industry,
      invitedUsers,
    };

    const { data } = await axios.post(`${NEXT_PUBLIC_API_URL}/workspaces`, payload);
    const newWorkspace = data as Workspace;

    workspaceStore.setCurrentWorkspace(newWorkspace);

    return newWorkspace;
  } catch (err: any) {
    alert(err.message);
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};

export const inviteUsersToWorkspace = async (usersToInvite: { displayName: string; email: string }[]) => {
  try {
    workspaceStore.setLoading(true);

    const payload = {
      invitedUsers: usersToInvite,
    };

    const { data } = await axios.post(`${NEXT_PUBLIC_API_URL}/workspaces/inviteUsers`, payload);

    return data;
  } catch (err: any) {
    alert(err.message);
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};
