/* eslint-disable max-len */
'use client';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Description,
  Head,
  LeftDiv,
  Main,
  MainDiv,
  NavbarTitle,
  NotificationCard,
  NotificationItem,
  ResponsiveHeader,
  RightDiv,
  StyledCheckbox,
  Title,
} from '../style';
import ResponsiveSettingNavBar from '@/components/settingNavBar/responsiveSettingNavBar';
import Icon from '@/components/icon/icon';

function Notification() {
  const router = useRouter();
  const [isNavbar, setIsNavbar] = useState(false);

  const onClickIcon = useCallback(() => {
    setIsNavbar(true);
  }, []);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  return (
    <Main>
      {isNavbar && <ResponsiveSettingNavBar onClose={onCloseNavbar} />}
      <MainDiv>
        <RightDiv>
          <ResponsiveHeader>
            <div className='left-section'>
              <Icon
                iconName='sidebar-icon'
                iconSize='16'
                iconViewBox='0 0 16 16'
                className='sidebar-icon'
                onClick={onClickIcon}
              />
              <NavbarTitle>Settings</NavbarTitle>
            </div>
            <Icon
              iconName={'cross-icon'}
              iconSize={'12'}
              iconViewBox={'0 0 16 16'}
              size={true}
              className='cross-icon'
              onClick={() => {
                router.push('/');
              }}
            />
          </ResponsiveHeader>
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
