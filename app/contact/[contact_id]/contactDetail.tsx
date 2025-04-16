/* eslint-disable max-len */
'use client';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResponsiveNavbar from '@/components/navbar/ResponsiveNavbar';
import Avatar from '@/components/avtar/Avtar';
import Icon from '@/components/icon/icon';
import { Main, MainDiv } from '../style';
import {
  InformationItem,
  InformationSection,
  ItemDiv,
  Label,
  LeftProfileSection,
  Name,
  NameSection,
  PersonalDetailSection,
  Title,
  Value,
  WorkspaceItemSection,
  WorkSpaceSection,
} from './style';

function ContactDetail() {
  const router = useRouter();
  const [isNavbar, setIsNavbar] = useState(false);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  const workspaces = [
    {
      imgSrc:
        'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUser%20Image_1716282098691.jpg?alt=media&token=34984821-78db-4248-94c8-35f186397d7e',
      name: 'Pixer digital',
    },
    {
      imgSrc:
        'https://firebasestorage.googleapis.com/v0/b/getconnect-tech.appspot.com/o/workspaces%2Fdba2c304-49b9-4f95-ac63-a74729b85a6e%2Fworkspace_profile%2Fimage_1726562412931.jpeg?alt=media&token=4e82e81b-56b5-4fcf-b3bc-bb6d907554e0',
      name: 'Teamcamp',
    },
  ];

  return (
    <Main>
      {isNavbar && <ResponsiveNavbar onClose={onCloseNavbar} />}
      <MainDiv>
        <LeftProfileSection>
          <NameSection>
            <Icon
              onClick={() => {
                router.push('/contact');
              }}
              iconName='back-icon'
              iconSize='12'
              iconViewBox='0 0 16 16'
              size={true}
            />
            <Avatar
              imgSrc='https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUser%20Image_1716282098691.jpg?alt=media&token=34984821-78db-4248-94c8-35f186397d7e'
              name={''}
              size={28}
              isShowBorder
            />
            <Name>XYZ</Name>
          </NameSection>
          <PersonalDetailSection>
            <Title>Personal details</Title>
            <InformationSection>
              <InformationItem>
                <Label>Email</Label>
                <Value>bhavdip.pixer@gmail.com</Value>
              </InformationItem>
              <InformationItem>
                <Label>Phone</Label>
                <Value>(628) 225-4852</Value>
              </InformationItem>
            </InformationSection>
          </PersonalDetailSection>
          <WorkSpaceSection>
            <Title className='workspace-title'>Workspaces</Title>
            <WorkspaceItemSection>
              {workspaces.map((item) => {
                return (
                  <ItemDiv key={item.name}>
                    <Avatar imgSrc={item.imgSrc} name={''} size={20} />
                    <Value>{item.name}</Value>
                  </ItemDiv>
                );
              })}
            </WorkspaceItemSection>
          </WorkSpaceSection>
        </LeftProfileSection>
      </MainDiv>
    </Main>
  );
}

export default ContactDetail;
