/* eslint-disable max-len */
import React from 'react';
import Avatar from '../avtar/Avtar';
import {
  DetailsDiv,
  DetailsMainDiv,
  LeftDiv,
  MainDiv,
  ProfileDiv,
  Title,
} from './styles';
import WorkDetails from './workDetails';
import RecentEvent from './recentEvent';
import { useStores } from '@/stores';

export default function ProfileSection() {
  const { ticketStore } = useStores();
  const { ticketDetails } = ticketStore;
  const { contact } = ticketDetails || {};

  return (
    <MainDiv>
      <div></div>
      <ProfileDiv>
        <Avatar
          imgSrc=''
          name={contact?.name || 'Unknown'}
          size={20}
          isShowBorder={true}
        />
        <Title>{contact?.name || ''}</Title>
      </ProfileDiv>
      <DetailsMainDiv>
        <DetailsDiv>
          <LeftDiv>
            <p>Role</p>
          </LeftDiv>
          <p>Project Manager</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <p>Phone</p>
          </LeftDiv>
          <p>(628) 225-4852</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <p>Email</p>
          </LeftDiv>
          <p>{contact?.email}</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <p>First contacted request</p>
          </LeftDiv>
          <p>May 14, 2024</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <p>Created by</p>
          </LeftDiv>
          <p>Jane smith</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <p>Access</p>
          </LeftDiv>
          <p>Everyone</p>
        </DetailsDiv>
      </DetailsMainDiv>
      <WorkDetails />
      <RecentEvent />
    </MainDiv>
  );
}
