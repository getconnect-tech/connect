'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'mobx-react';
import stores from '@/stores';
import { getWorkspaceById } from '@/services/clientSide/workspaceServices';
import UserPreferenceSingleton from '@/helpers/userPreferenceSingleton';
import InboxLoading from '@/components/inboxLoading/inboxLoading';
import GroupDetail from './groupDetail';

interface Props {
  params: {
    groupId: string;
  };
}

const GroupPage = ({ params }: Props) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Get workspace ID from preferences
        const workspaceId =
          await UserPreferenceSingleton.getInstance().getCurrentWorkspace();

        if (!workspaceId) {
          throw new Error('No workspace selected');
        }

        // If workspace data is not already loaded, load it
        if (!stores.workspaceStore.currentWorkspace?.id) {
          await getWorkspaceById(workspaceId);
        }

        // Load group details in parallel with workspace if needed
        await stores.groupStore.loadGroupDetails(params.groupId);

        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing data:', error);
        setIsInitialized(true);
      }
    };

    initializeData();

    // Cleanup function
    return () => {
      stores.groupStore.clearGroupDetails();
    };
  }, [params.groupId]);

  if (!isInitialized) {
    return (
      <Provider {...stores}>
        <InboxLoading />
      </Provider>
    );
  }

  return (
    <Provider {...stores}>
      <GroupDetail groupId={params.groupId} />
    </Provider>
  );
};

export default GroupPage;
