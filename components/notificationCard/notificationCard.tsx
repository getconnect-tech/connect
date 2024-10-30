import React, { useEffect } from 'react';
import OneSignal from 'react-onesignal';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import SVGIcon from '@/assets/icons/SVGIcon';
import { messageStore } from '@/stores/messageStore';
import { initOneSignal } from '@/helpers/appInitHelper';
import { useStores } from '@/stores';
import UserPreferenceSingleton from '@/helpers/userPreferenceSingleton';
import { isNotificationSupported } from '@/helpers/common';
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
  isShowNavbar: boolean;
  onClose: () => void;
}

function NotificationCard({ isShowNavbar, onClose }: Props) {
  const { userStore } = useStores();

  const handleEnableClick = async () => {
    try {
      if (!isNotificationSupported()) {
        return;
      }
      const currentNotificationState = Notification.permission;

      if (currentNotificationState === 'denied') {
        messageStore.setErrorMessage(
          'Please enable notification permission under site settings!',
        );
        return;
      }

      await initOneSignal(userStore.user!.id);
    } catch (err: any) {
      console.error(err);
      messageStore.setErrorMessage(err.message);
    }
  };

  const handleDismiss = () => {
    const futureNotificationTime = moment().add(7, 'days').toISOString();
    UserPreferenceSingleton.getInstance().setEnableNotification(
      futureNotificationTime,
    );
    onClose();
  };

  const handleNotificationPermissionChange = async (hasAllowed: boolean) => {
    if (hasAllowed) {
      onClose();
    }
  };

  useEffect(() => {
    OneSignal.Notifications.addEventListener(
      'permissionChange',
      handleNotificationPermissionChange,
    );

    return () =>
      OneSignal.Notifications.removeEventListener(
        'permissionChange',
        handleNotificationPermissionChange,
      );
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
              onClick={handleEnableClick}
              title='Enable Notifications'
              tertiary={true}
            />
            <a onClick={handleDismiss}>No, Thanks</a>
          </ButtonSection>
        </RightSection>
      </MainCardDiv>
    </MainDiv>
  );
}

export default observer(NotificationCard);
