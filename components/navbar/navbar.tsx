'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import Icon from '../icon/icon';
import DropDown from '../dropDown/dropDown';
import {
  ItemMainDiv,
  Label,
  LogoDiv,
  MainDiv,
  OrganizationNameDiv,
  TopDiv,
} from './style';
import NavbarItem from './navbarItem';
import ProfileDropdown from './profileDropdown';
import SVGIcon from '@/assets/icons/SVGIcon';
import { useStores } from '@/stores';
import { supportItem } from '@/helpers/raw';

const navbarMenu = {
  'Getting started': 0,
  Inbox: 1,
  Unassigned: 2,
  All: 3,
  Contacts: 4,
  Insights: 5,
  Bug: 6,
  Question: 7,
  Feedback: 8,
  Support: 9,
};

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { workspaceStore } = useStores();
  const [isOpen, setIsOpen] = useState(false);
  const [isSupportDropdown, setSupportDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(
    navbarMenu.Inbox,
  );

  const openSupportDropdown = useCallback(() => {
    setSupportDropdown(true);
  }, []);

  const closeSupportDropdown = useCallback(() => {
    setSupportDropdown(false);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleProfilePopup = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (pathname === '/') setActiveIndex(navbarMenu.Inbox);
    else if (pathname === '/contact') setActiveIndex(navbarMenu.Contacts);
  }, []);

  const handleClick = useCallback((index: number, path?: string) => {
    setActiveIndex(index); // Update active index
    if (path) {
      // Set the redirect path
      router.push(path);
    }
  }, []);

  return (
    <MainDiv>
      <TopDiv>
        <div>
          <LogoDiv className='tag-div'>
            <OrganizationNameDiv onClick={handleProfilePopup}>
              <SVGIcon
                name='logo-icon'
                width='20'
                height='21'
                viewBox='0 0 20 21'
                fill='none'
              />
              <p>{workspaceStore?.currentWorkspace?.name || ''}</p>
            </OrganizationNameDiv>
            <Icon
              onClick={() => {}}
              iconName={'sidebar-icon'}
              iconSize={'16'}
              iconViewBox={'0 0 16 16'}
              className='icon'
            />
          </LogoDiv>
          {isOpen && (
            <ProfileDropdown title='My Profile' onClose={closeDropdown} />
          )}
        </div>
        <NavbarItem
          title='Getting started'
          icon='started-icon'
          isActive={activeIndex === 0}
          onClickItem={() => handleClick(0)}
        />
        <ItemMainDiv>
          <NavbarItem
            title='Inbox'
            count={4}
            icon='inbox-icon'
            isActive={activeIndex === 1}
            onClickItem={() => handleClick(1, '/')}
          />
          <NavbarItem
            title='Unassigned'
            icon='unassign-icon'
            isActive={activeIndex === 2}
            onClickItem={() => handleClick(2)}
          />
          <NavbarItem
            title='All'
            icon='all-icon'
            isActive={activeIndex === 3}
            onClickItem={() => handleClick(3)}
          />
        </ItemMainDiv>
        <ItemMainDiv>
          <NavbarItem
            title='Contacts'
            icon='contact-icon'
            isActive={activeIndex === 4}
            onClickItem={() => handleClick(4, '/contact')}
          />
          <NavbarItem
            title='Insights'
            icon='insight-icon'
            isActive={activeIndex === 5}
            onClickItem={() => handleClick(5)}
          />
        </ItemMainDiv>
        <ItemMainDiv>
          <Label>Label</Label>
          <NavbarItem
            title='Bug'
            icon='bug-icon'
            isActive={activeIndex === 6}
            onClickItem={() => handleClick(6)}
          />
          <NavbarItem
            title='Question'
            icon='question-icon'
            isActive={activeIndex === 7}
            onClickItem={() => handleClick(7)}
          />
          <NavbarItem
            title='Feedback'
            icon='feedback-icon'
            isActive={activeIndex === 8}
            onClickItem={() => handleClick(8)}
          />
        </ItemMainDiv>
      </TopDiv>
      <div className='tag-div'>
        <NavbarItem
          title='Support'
          icon='support-icon'
          isActive={activeIndex === 9}
          onClickItem={() => {
            handleClick(9);
            openSupportDropdown();
          }}
        />
        {isSupportDropdown && (
          <DropDown
            items={supportItem}
            iconSize={'12'}
            iconViewBox={'0 0 12 12'}
            onClose={closeSupportDropdown}
            style={{ bottom: 52, maxWidth: 191, width: '100%' }}
          />
        )}
      </div>
    </MainDiv>
  );
}

export default observer(Navbar);
