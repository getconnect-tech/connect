/* eslint-disable no-undef */
import { isEmpty } from './common';
import { getSessionDetails } from '@/services/serverSide/auth/authentication';
import { APP_INIT_RESPONSE_TYPE } from '@/global/constants';
import { getWorkspaceList } from '@/services/clientSide/workspaceServices';
import { getUserDetails } from '@/services/clientSide/userService';

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
    }

    // User exist in any workspace
    if (workspaceList?.length > 0) {
      if (
        window.location.pathname === '/login' ||
        window.location.pathname === '/signup'
      )
        return { type: APP_INIT_RESPONSE_TYPE.REDIRECT, path: '/' };
      return true;
    }
  }
};
