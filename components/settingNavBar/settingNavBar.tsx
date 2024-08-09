import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BottomBlock, Item, MainDiv, NavItems, Title, TopBlock } from './style';

export default function SettingNavBar() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('');
  const pathname = usePathname();
  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);
  const handleItemClick = (path: string) => {
    setActiveItem(path);
    router.push(path);
  };
  return (
    <>
      <>
        <MainDiv>
          <TopBlock>
            <Title> You</Title>
            <NavItems>
              <Item
                onClick={() => handleItemClick('/setting/myprofile')}
                active={activeItem === '/setting/myprofile'}
              >
                My Profile
              </Item>
              <Item
                onClick={() => handleItemClick('/setting/changepassword')}
                active={activeItem === '/setting/changepassword'}
              >
                Change Password
              </Item>
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
