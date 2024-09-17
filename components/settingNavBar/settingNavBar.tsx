import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { UserRole } from '@prisma/client';
import { observer } from 'mobx-react-lite';
import { BottomBlock, Item, MainDiv, NavItems, Title, TopBlock } from './style';
import { useStores } from '@/stores';

const SettingNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const defaultPath = '/setting/myprofile';
  const [activeItem, setActiveItem] = useState(pathname || defaultPath);
  const { workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore;

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
              onClick={() => handleItemClick('/setting/notification')}
              active={activeItem === '/setting/notification'}
            >
              Notifications
            </Item>
          </NavItems>
        </TopBlock>
        {(currentWorkspace?.role === UserRole.OWNER ||
          currentWorkspace?.role === UserRole.ADMIN) && (
          <BottomBlock>
            <Title>Workspace</Title>
            <Item
              onClick={() => handleItemClick('/setting/workspaceprofile')}
              active={activeItem === '/setting/workspaceprofile'}
            >
              Workspace Profile
            </Item>
            <Item
              onClick={() => handleItemClick('/setting/channel')}
              active={activeItem === '/setting/channel'}
            >
              Channels
            </Item>
            <Item
              onClick={() => handleItemClick('/setting/labels')}
              active={activeItem === '/setting/labels'}
            >
              Labels
            </Item>
            <Item
              onClick={() => handleItemClick('/setting/macros')}
              active={activeItem === '/setting/macros'}
            >
              Macros
            </Item>
            <Item
              onClick={() => handleItemClick('/setting/members')}
              active={activeItem === '/setting/members'}
            >
              Members
            </Item>
            <Item
              onClick={() => handleItemClick('/setting/apikey')}
              active={activeItem === '/setting/apikey'}
            >
              API Keys
            </Item>
            <Item>Migration</Item>
            <Item>Integrations</Item>
            <Item>Subscription</Item>
          </BottomBlock>
        )}
      </div>
    </MainDiv>
  );
};

export default observer(SettingNavBar);
