'use client';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/stores';
import { getContactDetailById } from '@/services/clientSide/contactServices';
import { getWorkspaceById } from '@/services/clientSide/workspaceServices';
import UserPreferenceSingleton from '@/helpers/userPreferenceSingleton';
import InboxLoading from '@/components/inboxLoading/inboxLoading';
import { Contact, GroupInfo } from '@/utils/dataTypes';
import ContactDetail from './contactDetail';

interface Props {
  params: {
    contactId: string;
  };
}

const ContactDetailPage = ({ params }: Props) => {
  const { contactId } = params;
  const { contactStore, workspaceStore } = useStores();
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
        if (!workspaceStore.currentWorkspace?.id) {
          await getWorkspaceById(workspaceId);
        }

        // Load contact details in parallel with workspace if needed
        await getContactDetailById(contactId);

        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing data:', error);
        setIsInitialized(true);
      }
    };

    initializeData();

    // Cleanup function
    return () => {
      contactStore.clearContactDetails();
    };
  }, [contactId, workspaceStore.currentWorkspace?.id]);

  if (!isInitialized) {
    return <InboxLoading />;
  }

  return <ContactDetail contactId={contactId} />;
};

// Create a client-side wrapper component
const ClientContactDetailPage = observer(ContactDetailPage);

// Export a default server component that renders the client component
export default function Page(props: Props) {
  return <ClientContactDetailPage {...props} />;
}

// Add proper type guards
const formatGroups = (groups: Contact['groups']): GroupInfo[] => {
  if (!groups) return [];
  return groups.map((group) => ({
    ...group,
    group_id: group.group_id ?? null,
    avatar: group.avatar ?? null,
    group_label: group.group_label ?? null,
    contacts_count: group.contacts_count ?? 0,
  }));
};
