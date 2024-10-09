/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ListMainDiv } from './style';
import ContactCard from '@/components/contactCard/contactCard';
import { useStores } from '@/stores';
import { isEmpty } from '@/helpers/common';
import { getContactData } from '@/services/clientSide/contactServices';
import ContactsLoading from '@/components/contactsLoading/contactsLoading';

interface Props {
  isShowNavbar: boolean;
}

const PersonList = ({ isShowNavbar }: Props) => {
  const { workspaceStore, contactStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const { contacts } = contactStore || {};
  const [loading, setLoading] = useState(true); // Loading state added

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      setLoading(true);
      try {
        await getContactData();
      } catch (err: any) {
        console.error('Error fetching contact data:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [currentWorkspace?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      {loading && (!contacts || contacts.length === 0) ? (
        <ContactsLoading />
      ) : (
        <ListMainDiv isShowNavbar={isShowNavbar}>
          {contacts?.map((card, index) => (
            <ContactCard
              key={index}
              imgSrc={''}
              name={card.name}
              email={card.email}
              openCount={
                card.ticketsCount.OPEN ? `${card.ticketsCount.OPEN}` : '0'
              }
              closeCount={
                card.ticketsCount.CLOSED ? `${card.ticketsCount.CLOSED}` : '0'
              }
              companyImg={''}
              companyName={'Demo'}
              isShowNavbar={isShowNavbar}
            />
          ))}
        </ListMainDiv>
      )}
    </>
  );
};

export default observer(PersonList);
