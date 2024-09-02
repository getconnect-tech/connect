/* eslint-disable max-len */
import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ListMainDiv } from './style';
import ContactCard from '@/components/contactCard/contactCard';
import { useStores } from '@/stores';
import { isEmpty } from '@/helpers/common';
import { getContactData } from '@/services/clientSide/contactServices';

const PersonList = () => {
  const { workspaceStore, contactStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const { contacts } = contactStore || {};

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      try {
        await getContactData();
      } catch (err: any) {
        console.log('error', err);
      }
    }
  }, [currentWorkspace?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ListMainDiv>
      {contacts?.map((card, index) => (
        <ContactCard
          key={index}
          imgSrc={''}
          name={card.name}
          email={card.email}
          openCount={card.ticketsCount.OPEN ? `${card.ticketsCount.OPEN}` : '0'}
          closeCount={
            card.ticketsCount.CLOSED ? `${card.ticketsCount.CLOSED}` : '0'
          }
          companyImg={''}
          companyName={'Demo'}
        />
      ))}
    </ListMainDiv>
  );
};
export default observer(PersonList);
