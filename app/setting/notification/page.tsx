/* eslint-disable max-len */
'use client';
import {
  Description,
  Head,
  MainDiv,
  NotificationCard,
  NotificationItem,
  RightDiv,
  StyledCheckbox,
  Title,
} from '../style';
import SettingNavBar from '@/components/settingNavBar/settingNavBar';

export default function Notification() {
  return (
    <>
      <MainDiv>
        <SettingNavBar />
        <RightDiv>
          <Head>
            <Title>Notification</Title>
            <Description>Select where you will be notified</Description>
          </Head>
          <NotificationCard>
            <NotificationItem>
              <StyledCheckbox />
              <p>Browser Notification</p>
            </NotificationItem>
            <NotificationItem>
              <StyledCheckbox />
              <p>Email Notification</p>
            </NotificationItem>
          </NotificationCard>
        </RightDiv>
      </MainDiv>
    </>
  );
}
