'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Avatar from '@/components/avtar/Avtar';
import DropDown from '@/components/dropDown/dropDown';
import { supportItem } from '@/helpers/raw';
import Modal from '@/components/modal/modal';
import ContactUsModal from '@/components/contactUsModal/contactUsModal';
import { useStores } from '@/stores';
import Icon from '@/components/icon/icon';
import ProfileDropdown from './profileDropdown';
import {
  ItemMainDiv,
  Label,
  LogoDiv,
  OrganizationNameDiv,
  ResponsiveMainDiv,
  TopDiv,
} from './style';
import NavbarItem from './navbarItem';

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

interface Props {
  onClose: () => void;
}

function ResponsiveNavbar({ onClose }: Props) {
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
    labelId: label.id,
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
      <ResponsiveMainDiv>
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
                iconName='cross-icon'
                iconSize='12'
                iconViewBox='0 0 16 16'
                size={true}
                className='cross-icon'
                onClick={onClose}
              />
            </LogoDiv>
            {isOpen && (
              <ProfileDropdown
                title={workspaceStore?.currentWorkspace?.name || ''}
                onClose={closeDropdown}
              />
            )}
          </div>
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
                    isActive={pathname === `/tickets/labels/${item.labelId}`}
                    onClickItem={() =>
                      handleClick(8, `/tickets/labels/${item.labelId}`)
                    }
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
              className='support-dropdown'
              onChange={handleSupportClick}
            />
          )}
        </div>
      </ResponsiveMainDiv>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <ContactUsModal onClose={handleModalClose} />
      </Modal>
    </>
  );
}

export default ResponsiveNavbar;
