'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'mobx-react';
import { stores } from '@/stores';
import { getWorkspaceById } from '@/services/clientSide/workspaceServices';
import UserPreferenceSingleton from '@/helpers/userPreferenceSingleton';
import GroupDetailComponent from './groupDetail';
import InboxLoading from '@/components/inboxLoading/inboxLoading';

interface Props {
  params: {
    groupId: string;
  };
}

const GroupPage = ({ params }: Props) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeWorkspace = async () => {
      try {
        const workspaceId = await UserPreferenceSingleton.getInstance().getCurrentWorkspace();
        if (workspaceId) {
          await getWorkspaceById(workspaceId);
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Error initializing workspace:', error);
        setIsInitialized(true);
      }
    };

    initializeWorkspace();
  }, []);

  if (!isInitialized) {
    return (
      <Provider {...stores}>
        <InboxLoading />
      </Provider>
    );
  }

  return (
    <Provider {...stores}>
      <GroupDetailComponent groupId={params.groupId} />
    </Provider>
  );
};

export default GroupPage; 