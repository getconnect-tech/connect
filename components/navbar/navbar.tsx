'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import DropDown from '../dropDown/dropDown';
import Modal from '../modal/modal';
import ContactUsModal from '../contactUsModal/contactUsModal';
import Avatar from '../avtar/Avtar';
import Icon from '../icon/icon';
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
  const { workspaceStore, settingStore, ticketStore, userStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { labels } = settingStore || {};
  const { ticketList } = ticketStore || {};
  const { user } = userStore || {};
  const [isOpen, setIsOpen] = useState(false);
  const [isSupportDropdown, setSupportDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(
    navbarMenu.Inbox,
  );
  // State to store the previous open ticket count
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

  useEffect(() => {}, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleClick = useCallback((index: number, path?: string) => {
    setActiveIndex(index); // Update active index
    if (path) {
      // Set the redirect path
      router.push(path);
    }
  }, []);

  const handleSupportClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const labelItem = (labels || [])?.map((label) => ({
    name: label.name,
    icon: label.icon,
  }));

  const openTicketCount = useMemo(() => {
    return ticketList?.filter(
      (ticket) => ticket.status === 'OPEN' && ticket.assigned_to === user?.id,
    ).length;
  }, [ticketList]);

  return (
    <>
      <MainDiv>
        <TopDiv>
          <div>
            <LogoDiv className='tag-div'>
              <OrganizationNameDiv onClick={handleProfilePopup}>
                <Avatar
                  size={25}
                  imgSrc={
                    typeof currentWorkspace?.image_url === 'string'
                      ? currentWorkspace?.image_url
                      : currentWorkspace?.image_url || ''
                  }
                  name={currentWorkspace?.name || ''}
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
              <ProfileDropdown
                title={workspaceStore?.currentWorkspace?.name || ''}
                onClose={closeDropdown}
              />
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
              count={openTicketCount}
              icon='inbox-icon'
              isActive={pathname === '/inbox'}
              onClickItem={() => handleClick(1, '/inbox')}
            />
            <NavbarItem
              title='Unassigned'
              icon='unassign-icon'
              isActive={pathname === '/unassigned'}
              onClickItem={() => handleClick(2, '/unassigned')}
            />
            <NavbarItem
              title='All'
              icon='all-icon'
              isActive={pathname === '/' || pathname === '/tickets'}
              onClickItem={() => handleClick(3, '/tickets')}
            />
          </ItemMainDiv>
          <ItemMainDiv>
            <NavbarItem
              title='Contacts'
              icon='contact-icon'
              isActive={pathname === '/contact'}
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
            {labelItem.map((item, index) => (
              <div key={index} className='label-item'>
                {item.icon && (
                  <NavbarItem
                    title={item.name}
                    icon={item.icon}
                    isActive={activeIndex === 8}
                    onClickItem={() => handleClick(8)}
                    label={true}
                  />
                )}
              </div>
            ))}
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
              onChange={handleSupportClick}
            />
          )}
        </div>
      </MainDiv>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <ContactUsModal onClose={handleModalClose} />
      </Modal>
    </>
  );
}

export default observer(Navbar);
