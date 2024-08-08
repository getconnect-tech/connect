/* eslint-disable max-len */
import React from 'react';
import { ListMainDiv } from './style';
import ContactCard from '@/components/contactCard/contactCard';

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

export default function PersonList() {
  return (
    <ListMainDiv>
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
        />
      ))}
    </ListMainDiv>
  );
}
