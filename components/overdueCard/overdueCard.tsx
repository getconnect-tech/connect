import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SVGIcon from '@/assets/icons/SVGIcon';
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
interface Props {
  countAssign: number;
  isShowNavbar: boolean;
  onClickDismiss: () => void;
}

function OverdueCard({ countAssign, onClickDismiss, isShowNavbar }: Props) {
  const router = useRouter();

  const redirectToUnassigned = useCallback(() => {
    router.push('/unassigned');
  }, [router]);

  return (
    <MainDiv isShowNavbar={isShowNavbar}>
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
            <Button
              onClick={redirectToUnassigned}
              title='View Tickets'
              tertiary={true}
            />
            <a onClick={onClickDismiss}>No, Thanks</a>
          </ButtonSection>
        </RightSection>
      </MainCardDiv>
    </MainDiv>
  );
}

export default OverdueCard;
