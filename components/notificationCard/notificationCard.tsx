import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
  isShowNavbar: boolean;
}

function NotificationCard({ isShowNavbar }: Props) {
  const router = useRouter();

  const redirectToUnassigned = useCallback(() => {
    router.push('/unassigned');
  }, []);

  return (
    <MainDiv isShowNavbar={isShowNavbar}>
      <MainCardDiv>
        <ProfileDiv>
          <SVGIcon
            name='notification-icon'
            width='14'
            height='14'
            viewBox='0 0 14 14'
          />
        </ProfileDiv>
        <RightSection>
          <ContentDiv>
            <Title>Enable notifications and Stay in the Loop!</Title>
            <Description>
              Enable notifications to receive real-time updates on ticket
              progress, new assignments, and important messages.
            </Description>
          </ContentDiv>
          <ButtonSection>
            <Button
              onClick={redirectToUnassigned}
              title='Enable Notifications'
              secondary
              variant='small'
            />
            <a>No, Thanks</a>
          </ButtonSection>
        </RightSection>
      </MainCardDiv>
    </MainDiv>
  );
}

export default NotificationCard;
