import React from 'react';
import Button from '../button/button';
import {
  ButtonSection,
  ContentDiv,
  Description,
  MainCardDiv,
  MainDiv,
  ProfileDiv,
  RightSection,
  Title,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
interface Props {
  countAssign?: number;
}
function OverdueCard({ countAssign }: Props) {
  return (
    <MainDiv>
      <MainCardDiv>
        <ProfileDiv>
          <SVGIcon
            name='users-icon'
            width='14'
            height='14'
            viewBox='0 0 14 14'
          />
        </ProfileDiv>
        <RightSection>
          <ContentDiv>
            <Title>{countAssign} unassigned tickets awaiting attention!</Title>
            <Description>
              Assign these tickets to the relevant team members to ensure a
              quick resolution.
            </Description>
          </ContentDiv>
          <ButtonSection>
            <Button title='View Tickets' secondary variant='small' />
            <a>Dismiss</a>
          </ButtonSection>
        </RightSection>
      </MainCardDiv>
    </MainDiv>
  );
}

export default OverdueCard;
