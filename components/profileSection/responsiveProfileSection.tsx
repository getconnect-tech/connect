/* eslint-disable max-len */
import React from 'react';
import Avatar from '../avtar/Avtar';
import {
  DetailsDiv,
  DetailsProfileDiv,
  LeftDiv,
  ProfileDiv,
  ResponsiveMainDiv,
  Title,
} from './styles';
import WorkDetails from './workDetails';
import RecentEvent from './recentEvent';
import AIBlock from './aiBlock';
import { useStores } from '@/stores';

export default function ResponsiveProfileSection() {
  const { ticketStore } = useStores();
  const { ticketDetails } = ticketStore;
  const { contact } = ticketDetails || {};

  return (
    <ResponsiveMainDiv>
      <AIBlock />
      <ProfileDiv>
        <Avatar
          imgSrc=''
          name={contact?.name || 'Unknown'}
          size={20}
          isShowBorder={true}
        />

        <Title>{contact?.name || ''}</Title>
      </ProfileDiv>
      <DetailsProfileDiv>
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
      </DetailsProfileDiv>
      <WorkDetails />
      <RecentEvent />
    </ResponsiveMainDiv>
  );
}
