/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { ListMainDiv } from './style';
import ContactCard from '@/components/contactCard/contactCard';
import { getContactData } from '@/services/clientSide/contactServices';
import { isEmpty } from '@/helpers/common';
import ContactsLoading from '@/components/contactsLoading/contactsLoading';

interface Props {
  isShowNavbar: boolean;
}

const cardData = [
  {
    imgSrc:
      'https://static.vecteezy.com/system/resources/previews/027/127/473/original/microsoft-logo-microsoft-icon-transparent-free-png.png',
    name: 'Microsoft',
    email: 'grothoff@icloud.com',
    openCount: '2',
    closeCount: '6',
    peopleCount: '25',
  },
  {
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6HMrE7xvKu5-UahOPBs3GcE4AZJk8LsX7tg&s',
    name: 'Google',
    email: 'adamk@me.com',
    openCount: '1',
    closeCount: '12',
    peopleCount: '30',
  },
  {
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6HMrE7xvKu5-UahOPBs3GcE4AZJk8LsX7tg&s',
    name: 'Google',
    email: 'seano@icloud.com',
    openCount: '3',
    closeCount: '20',
    peopleCount: '40',
  },
];

export default function PersonList({ isShowNavbar }: Props) {
  const [loading, setLoading] = useState(true); // Loading state added
  const loadData = useCallback(async () => {
    if (!isEmpty(cardData)) {
      setLoading(true);
      try {
        await getContactData();
      } catch (err: any) {
        console.error('Error fetching contact data:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [cardData]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <>
      {loading && (!cardData || cardData.length === 0) ? (
        <ContactsLoading />
      ) : (
        <>
          <ListMainDiv isShowNavbar={isShowNavbar}>
            {cardData.map((card, index) => (
              <ContactCard
                key={index}
                imgSrc={card.imgSrc}
                name={card.name}
                email={card.email}
                openCount={card.openCount}
                closeCount={card.closeCount}
                isCompany={false}
                peopleCount={card.peopleCount}
                isShowNavbar={isShowNavbar}
              />
            ))}
          </ListMainDiv>
        </>
      )}
    </>
  );
}
