'use client';
import React, { useCallback, useState } from 'react';
import { ItemMainDiv, Label, LogoDiv, MainDiv, TopDiv } from './style';
import NavbarItem from './navbarItem';
import ProfileDropdown from './profileDropdown';
import SVGIcon from '@/assets/icons/SVGIcon';

function Navbar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const closeDropdown = () => {
    setIsOpen(false);
  };
  return (
    <MainDiv>
      <TopDiv>
        <LogoDiv onClick={() => setIsOpen((prev) => !prev)} className='tag-div'>
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
        {isOpen && (
          <ProfileDropdown title='My Profile' onClose={closeDropdown} />
        )}
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
            onClickItem={() => handleClick(1)}
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
            onClickItem={() => handleClick(4)}
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
