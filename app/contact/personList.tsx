/* eslint-disable max-len */
import React from 'react';
import { ListMainDiv } from './style';
import ContactCard from '@/components/contactCard/contactCard';

const cardData = [
  {
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4',
    name: 'Jerome Bell',
    email: 'grothoff@icloud.com',
    openCount: '2',
    closeCount: '6',
    companyImg:
      'https://static.vecteezy.com/system/resources/previews/027/127/473/original/microsoft-logo-microsoft-icon-transparent-free-png.png',
    companyName: 'Microsoft',
  },
  {
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUser%20Image_1716282098691.jpg?alt=media&token=34984821-78db-4248-94c8-35f186397d7e',
    name: 'Cody Fisher',
    email: 'adamk@me.com',
    openCount: '1',
    closeCount: '12',
    companyImg:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6HMrE7xvKu5-UahOPBs3GcE4AZJk8LsX7tg&s',
    companyName: 'Google',
  },
  {
    imgSrc:
      'https://bearbuk.blob.core.windows.net/content/Profile_5bd2e78640458116088c9b44_2019053114342861_120.png',
    name: 'Esther Howard',
    email: 'seano@icloud.com',
    openCount: '3',
    closeCount: '20',
    companyImg:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6HMrE7xvKu5-UahOPBs3GcE4AZJk8LsX7tg&s',
    companyName: 'Google',
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
          companyImg={card.companyImg}
          companyName={card.companyName}
        />
      ))}
    </ListMainDiv>
  );
}
