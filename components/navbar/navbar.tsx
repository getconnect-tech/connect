'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ItemMainDiv, Label, LogoDiv, MainDiv, TopDiv } from './style';
import NavbarItem from './navbarItem';
import SVGIcon from '@/assets/icons/SVGIcon';

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

  const [activeIndex, setActiveIndex] = useState<number | null>(
    navbarMenu.Inbox,
  );

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

  console.log('activeIndex', activeIndex);

  return (
    <MainDiv>
      <TopDiv>
        <LogoDiv>
          <SVGIcon
            name='logo-icon'
            width='101'
            height='28'
            viewBox='0 0 101 28'
            fill='none'
            className='logo-icon'
          />
          <SVGIcon
            name='sidebar-icon'
            width='28'
            height='28'
            viewBox='0 0 28 28'
            fill='none'
            className='logo-icon'
          />
        </LogoDiv>
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
      <NavbarItem
        title='Support'
        icon='support-icon'
        isActive={activeIndex === 9}
        onClickItem={() => handleClick(9)}
      />
    </MainDiv>
  );
}

export default Navbar;
