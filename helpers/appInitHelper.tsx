/* eslint-disable no-undef */
import OneSignal from 'react-onesignal';
import { getSessionDetails } from '@/services/serverSide/auth/authentication';
import { APP_INIT_RESPONSE_TYPE } from '@/global/constants';
import {
  getWorkspaceById,
  getWorkspaceList,
} from '@/services/clientSide/workspaceServices';
import { getUserDetails } from '@/services/clientSide/userService';
import { Workspace } from '@/utils/dataTypes';
import { getLabels } from '@/services/clientSide/settingServices';
import UserPreferenceSingleton from './userPreferenceSingleton';
import { isEmpty, isNotificationSupported } from './common';
import { NEXT_PUBLIC_ONESIGNAL_APP_ID, NODE_ENV } from './environment';

export const initOneSignal = async (userId: string) => {
  try {
    // OneSignal.Debug.setLogLevel('trace');
    await OneSignal.init({
      appId: NEXT_PUBLIC_ONESIGNAL_APP_ID!,
      allowLocalhostAsSecureOrigin: NODE_ENV === 'development',
      autoRegister: true,
    });

    OneSignal.User.addAlias('external_id', userId);
    await OneSignal.login(userId);
  } catch (err) {
    console.log(err);
  }
};

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
    // Init OneSignal for notifications
    if (isNotificationSupported() && Notification.permission === 'granted') {
      initOneSignal(session.user.id);
    }
    getUserDetails();

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
        return { type: APP_INIT_RESPONSE_TYPE.REDIRECT, path: '/inbox' };
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
