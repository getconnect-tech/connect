/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import ContactCard from '@/components/contactCard/contactCard';
import ContactsLoading from '@/components/contactsLoading/contactsLoading';
import { useStores } from '@/stores';
import { Group } from '@/utils/dataTypes';
import { ListMainDiv } from './style';

interface Props {
  activeTab: string;
  isShowNavbar: boolean;
  isCompany?: boolean;
}

export default function CompanyList({
  activeTab,
  isShowNavbar,
  isCompany,
}: Props) {
  const { contactStore } = useStores();
  const { groups } = contactStore || {};
  const [cardItem, setCardItem] = useState<Group[]>([]);

  const cardInformation = useCallback(() => {
    const cardData =
      groups?.filter((group) => group.group_label === activeTab) || [];
    setCardItem(cardData);
  }, [activeTab, groups]);

  useEffect(() => {
    cardInformation();
  }, [activeTab, cardInformation]);
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
                contactId={card.id}
                imgSrc={
                  card?.avatar
                    ? card.avatar === 'undefined' || card.avatar === 'null'
                      ? ''
                      : card.avatar
                    : ''
                }
                name={card.name}
                openCount={
                  card.ticketsCount.OPEN ? `${card.ticketsCount.OPEN}` : '0'
                }
                closeCount={
                  card.ticketsCount.CLOSED ? `${card.ticketsCount.CLOSED}` : '0'
                }
                isCompany={isCompany}
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
