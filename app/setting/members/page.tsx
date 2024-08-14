/* eslint-disable max-len */
'use client';
import React from 'react';
import {
  Description,
  Head,
  LeftDiv,
  Main,
  MainCardDiv,
  MainDiv,
  RightDiv,
  Title,
} from '../style';
import Button from '@/components/button/button';
import MemberCard from '@/components/memberCard/memberCard';

function Members() {
  const members = [
    {
      name: 'Sanjay M.',
      email: 'sanjay@pixer.io',
      src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4',
      designation: 'Owner',
    },
    {
      name: 'Anna Sthesia',
      email: 'anna@acme.com',
      src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUser%20Image_1716282098691.jpg?alt=media&token=34984821-78db-4248-94c8-35f186397d7e',
    },
    {
      name: 'Poppa Cherry',
      email: 'poppa@massive.com',
      designation: 'Admin',
      src: 'https://bearbuk.blob.core.windows.net/content/Profile_5bd2e78640458116088c9b44_2019053114342861_120.png',
    },
  ];
  return (
    <Main>
      <MainDiv>
        <RightDiv>
          <Head>
            <LeftDiv>
              <Title>Members</Title>
              <Description>Invite your team member to collaborate.</Description>
            </LeftDiv>
            <Button title='Invite Member' />
          </Head>
          <MainCardDiv>
            {members.map((member, index) => (
              <MemberCard
                key={index}
                name={member.name}
                email={member.email}
                src={member.src}
                designation={member.designation}
              />
            ))}
          </MainCardDiv>
        </RightDiv>
      </MainDiv>
    </Main>
  );
}

export default Members;
