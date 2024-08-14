/* eslint-disable max-len */
'use client';
import {
  Description,
  Head,
  LeftDiv,
  Main,
  MainDiv,
  NotificationCard,
  NotificationItem,
  RightDiv,
  StyledCheckbox,
  Title,
} from '../style';

function Notification() {
  return (
    <Main>
      <MainDiv>
        <RightDiv>
          <Head>
            <LeftDiv>
              <Title>Notification</Title>
              <Description>Select where you will be notified</Description>
            </LeftDiv>
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

export default Notification;
