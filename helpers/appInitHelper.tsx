/* eslint-disable no-undef */
import { isEmpty } from './common';
import UserPreferenceSingleton from './userPreferenceSingleton';
import { getSessionDetails } from '@/services/serverSide/auth/authentication';
import { APP_INIT_RESPONSE_TYPE } from '@/global/constants';
import {
  getWorkspaceById,
  getWorkspaceList,
} from '@/services/clientSide/workspaceServices';
import { getUserDetails } from '@/services/clientSide/userService';
import { Workspace } from '@/utils/dataTypes';
import { getLabels } from '@/services/clientSide/settingServices';

export const appInit: any = async () => {
  const session = await getSessionDetails();
  if (isEmpty(session)) {
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/signup'
    )
      return;
    return { type: APP_INIT_RESPONSE_TYPE.REDIRECT, path: '/login' };
  }

  if (session?.user) {
    await getUserDetails();

    // Get user's workspace list
    const workspaceList = await getWorkspaceList();

    // If user doesn't exist in any workspace then redirect user to onboarding page
    if (!workspaceList || workspaceList?.length === 0) {
      return { type: APP_INIT_RESPONSE_TYPE.REDIRECT, path: '/onboarding' };
    } else {
      const currentWorkspace =
        await UserPreferenceSingleton.getInstance().getCurrentWorkspace();
      const isFoundWorkspace = workspaceList?.find(
        (workspace: Workspace) => workspace?.id === currentWorkspace,
      );

      // If workspace length is 1 AND current workspace not exist in local
      if (
        (!currentWorkspace || !isFoundWorkspace) &&
        workspaceList?.length === 1
      ) {
        UserPreferenceSingleton.getInstance().setCurrentWorkspace(
          workspaceList[0]?.id,
        );
        await getWorkspaceById(workspaceList[0]?.id);
        await getLabels();
        return true;
      }
      // If workspace length greater than 1 AND current workspace not exist in local
      else if (
        (!currentWorkspace || !isFoundWorkspace) &&
        workspaceList?.length > 1
      ) {
        return {
          type: APP_INIT_RESPONSE_TYPE.REDIRECT,
          path: '/selectworkspace',
        };
      }
      // Load current workspace data
      else if (currentWorkspace && isFoundWorkspace) {
        await getWorkspaceById(currentWorkspace);
        await getLabels();
        return true;
      }
    }
  }
};
