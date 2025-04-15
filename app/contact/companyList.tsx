/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import ContactCard from '@/components/contactCard/contactCard';
import ContactsLoading from '@/components/contactsLoading/contactsLoading';
import EmptyState from '@/components/emptyState/emptyState';
import { useStores } from '@/stores';
import { Group } from '@/utils/dataTypes';
import { ListMainDiv } from './style';

interface Props {
  activeTab: string;
  isShowNavbar: boolean;
}

const CompanyList = observer(({ activeTab, isShowNavbar }: Props) => {
  const router = useRouter();
  const { contactStore } = useStores();
  const { groups = [] } = contactStore;
  const [cardItem, setCardItem] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const cardInformation = useCallback(() => {
    try {
      const cardData = (groups || []).filter(
        (group) => group.group_label === activeTab,
      );
      setCardItem(cardData);
    } catch (error) {
      console.error('Error filtering groups:', error);
      setCardItem([]);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, groups]);

  useEffect(() => {
    setIsLoading(true);
    cardInformation();
  }, [activeTab, cardInformation]);

  const handleGroupClick = (groupId: string) => {
    router.push(`/group/${groupId}`);
  };

  if (isLoading) {
    return <ContactsLoading />;
  }

  if (!cardItem || cardItem.length === 0) {
    return (
      <EmptyState
        iconName='group-icon'
        iconSize='20'
        iconViewBox='0 0 12 12'
        title='No groups found'
        description={`No groups found for ${activeTab} category.`}
      />
    );
  }

  return (
    <ListMainDiv isShowNavbar={isShowNavbar}>
      {cardItem.map((card: Group, index: number) => (
        <ContactCard
          key={card.id || index}
          imgSrc={
            card?.avatar &&
            card.avatar !== 'undefined' &&
            card.avatar !== 'null'
              ? card.avatar
              : ''
          }
          name={card.name}
          openCount={
            card.ticketsCount?.OPEN ? `${card.ticketsCount.OPEN}` : '0'
          }
          closeCount={
            card.ticketsCount?.CLOSED ? `${card.ticketsCount.CLOSED}` : '0'
          }
          isCompany={false}
          peopleCount={card.contacts_count ? `${card.contacts_count}` : '0'}
          isShowNavbar={isShowNavbar}
          onClick={() => card.group_id && handleGroupClick(card.group_id)}
        />
      ))}
    </ListMainDiv>
  );
});

export default CompanyList;
