/* eslint-disable max-len */
'use client';
import {
  Description,
  Head,
  Main,
  MainDiv,
  NotificationCard,
  NotificationItem,
  RightDiv,
  StyledCheckbox,
  Title,
} from '../style';

export default function Notification() {
  return (
    <Main>
      <MainDiv>
        {/* <SettingNavBar /> */}
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
    </Main>
  );
}
