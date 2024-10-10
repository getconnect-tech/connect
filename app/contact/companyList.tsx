/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { ListMainDiv } from './style';
import ContactCard from '@/components/contactCard/contactCard';
import ContactsLoading from '@/components/contactsLoading/contactsLoading';
import { useStores } from '@/stores';
import { Group } from '@/utils/dataTypes';

interface Props {
  activeTab: string;
  isShowNavbar: boolean;
}

export default function PersonList({ activeTab, isShowNavbar }: Props) {
  const { contactStore } = useStores();
  const { groups } = contactStore || {};
  const [cardItem, setCardItem] = useState<Group[]>([]);

  const cardInformation = useCallback(() => {
    const cardData =
      groups?.filter((group) => group.group_label === activeTab) || [];
    setCardItem(cardData);
  }, [activeTab]);

  useEffect(() => {
    cardInformation();
  }, [activeTab]);
  return (
    <>
      {!cardItem || cardItem.length === 0 ? (
        <ContactsLoading />
      ) : (
        <>
          <ListMainDiv isShowNavbar={isShowNavbar}>
            {cardItem.map((card: Group, index: number) => (
              <ContactCard
                key={index}
                imgSrc={''}
                name={card.name}
                openCount={
                  card.ticketsCount.OPEN ? `${card.ticketsCount.OPEN}` : '0'
                }
                closeCount={
                  card.ticketsCount.CLOSED ? `${card.ticketsCount.CLOSED}` : '0'
                }
                isCompany={false}
                peopleCount={
                  card.contacts_count ? `${card.contacts_count}` : '0'
                }
                isShowNavbar={isShowNavbar}
              />
            ))}
          </ListMainDiv>
        </>
      )}
    </>
  );
}
