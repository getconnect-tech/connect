import React from 'react';
import { BottomBlock, Item, MainDiv, NavItems, Title, TopBlock } from './style';

export default function SettingNavBar() {
  return (
    <>
      <>
        <MainDiv>
          <TopBlock>
            <Title> You</Title>
            <NavItems>
              <Item>My Profile</Item>
              <Item>Change Password</Item>
              <Item>Notifications</Item>
            </NavItems>
          </TopBlock>
          <BottomBlock>
            <Title>WorkSpace</Title>
            <Item>WorkSpace Profile</Item>
            <Item>Channels</Item>
            <Item>Labels</Item>
            <Item>Macros</Item>
            <Item>Members</Item>
            <Item>API Keys</Item>
            <Item>Migration</Item>
            <Item>Integrations</Item>
            <Item>Subscription</Item>
          </BottomBlock>
        </MainDiv>
      </>
    </>
  );
}
