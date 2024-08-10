import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BottomBlock, Item, MainDiv, NavItems, Title, TopBlock } from './style';

export default function SettingNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const defaultPath = '/setting/myprofile';
  const [activeItem, setActiveItem] = useState(pathname || defaultPath);

  useEffect(() => {
    setActiveItem(pathname || defaultPath);
  }, [pathname]);

  const handleItemClick = useCallback(
    (path: string) => {
      setActiveItem(path);
      router.push(path);
    },
    [router],
  );

  return (
    <MainDiv>
      <div>
        <TopBlock>
          <Title> You</Title>
          <NavItems>
            <Item
              onClick={() => handleItemClick(defaultPath)}
              active={activeItem === defaultPath}
            >
              My Profile
            </Item>
            <Item
              onClick={() => handleItemClick('/setting/changepassword')}
              active={activeItem === '/setting/changepassword'}
            >
              Change Password
            </Item>
            <Item
              onClick={() => handleItemClick('/setting/notification')}
              active={activeItem === '/setting/notification'}
            >
              Notifications
            </Item>
          </NavItems>
        </TopBlock>
        <BottomBlock>
          <Title>WorkSpace</Title>
          <Item
            onClick={() => handleItemClick('/setting/workspaceprofile')}
            active={activeItem === '/setting/workspaceprofile'}
          >
            WorkSpace Profile
          </Item>
          <Item>Channels</Item>
          <Item>Labels</Item>
          <Item>Macros</Item>
          <Item>Members</Item>
          <Item>API Keys</Item>
          <Item>Migration</Item>
          <Item>Integrations</Item>
          <Item>Subscription</Item>
        </BottomBlock>
      </div>
    </MainDiv>
  );
}
