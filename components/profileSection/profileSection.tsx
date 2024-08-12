/* eslint-disable max-len */
import React from 'react';
import Avatar from '../avtar/Avtar';
import {
  CompanyName,
  DetailsDiv,
  DetailsMainDiv,
  LeftDiv,
  MainDiv,
  ProfileDiv,
  Title,
} from './styles';
import WorkDetails from './workDetails';
import RecentEvent from './recentEvent';
import SVGIcon from '@/assets/icons/SVGIcon';
import { colors } from '@/styles/colors';
import { useStores } from '@/stores';

export default function ProfileSection() {
  const { ticketStore } = useStores();
  const { ticketDetails } = ticketStore;
  const { contact } = ticketDetails || {};

  return (
    <MainDiv>
      <ProfileDiv>
        <Avatar imgSrc='' name={contact?.name || 'Unknown'} size={58} />
        <div>
          <Title>{contact?.name || ''}</Title>
          <CompanyName>Pixer Digital</CompanyName>
        </div>
      </ProfileDiv>
      <DetailsMainDiv>
        <DetailsDiv>
          <LeftDiv>
            <SVGIcon
              name='inbox-icon'
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill={colors.icon}
            />
            <p>Role</p>
          </LeftDiv>
          <p>Project Manager</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <SVGIcon
              name='inbox-icon'
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill={colors.icon}
            />
            <p>Phone</p>
          </LeftDiv>
          <p>(628) 225-4852</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <SVGIcon
              name='inbox-icon'
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill={colors.icon}
            />
            <p>Email</p>
          </LeftDiv>
          <p>{contact?.email}</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <SVGIcon
              name='inbox-icon'
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill={colors.icon}
            />
            <p>First contacted</p>
          </LeftDiv>
          <p>May 14, 2024</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <SVGIcon
              name='inbox-icon'
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill={colors.icon}
            />
            <p>Created by</p>
          </LeftDiv>
          <p>Jane smith</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <SVGIcon
              name='inbox-icon'
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill={colors.icon}
            />
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
