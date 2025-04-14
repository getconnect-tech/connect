/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import ContactCard from '@/components/contactCard/contactCard';
import { useStores } from '@/stores';
import { isEmpty } from '@/helpers/common';
import { getContactData } from '@/services/clientSide/contactServices';
import ContactsLoading from '@/components/contactsLoading/contactsLoading';
import { Contact } from '@/utils/dataTypes';
import { formatGroups } from '@/utils/formatGroups';
import { ListMainDiv } from './style';

interface Props {
  isShowNavbar: boolean;
}

const PersonList = ({ isShowNavbar }: Props) => {
  const router = useRouter();
  const { workspaceStore, contactStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const { contacts = [] } = contactStore;
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      setLoading(true);
      try {
        await getContactData();
      } catch (err) {
        console.error('Error fetching contact data:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [currentWorkspace?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleContactClick = (contactId: string) => {
    router.push(`/contact/${contactId}`);
  };

  if (loading || !contacts || contacts.length === 0) {
    return <ContactsLoading />;
  }

  return (
    <ListMainDiv isShowNavbar={isShowNavbar}>
      {contacts.map((card, index) => (
        <ContactCard
          key={card.id || index}
          imgSrc={card.avatar || ''}
          name={card.name}
          email={card.email}
          openCount={
            card.ticketsCount?.OPEN ? `${card.ticketsCount.OPEN}` : '0'
          }
          closeCount={
            card.ticketsCount?.CLOSED ? `${card.ticketsCount.CLOSED}` : '0'
          }
          groupInfo={formatGroups(card.groups)}
          isShowNavbar={isShowNavbar}
          onClick={() => handleContactClick(card.id)}
        />
      ))}
    </ListMainDiv>
  );
};

export default observer(PersonList);
