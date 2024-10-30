'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/button';
import MemberCard from '@/components/memberCard/memberCard';
import { getWorkspaceById } from '@/services/clientSide/workspaceServices';
import { useStores } from '@/stores';
import InviteMemberModal from '@/components/modalComponent/inviteMemberModal';
import Modal from '@/components/modal/modal';
import UserPreferenceSingleton from '@/helpers/userPreferenceSingleton';
import Icon from '@/components/icon/icon';
import ResponsiveSettingNavBar from '@/components/settingNavBar/responsiveSettingNavBar';
import MemberLoading from '@/components/memberLoading/memberLoading';
import {
  Description,
  Head,
  LeftDiv,
  Main,
  MainCardDiv,
  MainDiv,
  NavbarTitle,
  ResponsiveHeader,
  RightDiv,
  Title,
} from '../style';

const Members = () => {
  const router = useRouter();
  const [inviteModal, setInviteModal] = useState(false);
  const [isNavbar, setIsNavbar] = useState(false);
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const { workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const workspaceId =
        await UserPreferenceSingleton.getInstance().getCurrentWorkspace();
      if (workspaceId) {
        await getWorkspaceById(workspaceId);
      }
    } catch (e) {
      console.log('Error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onOpenInviteModal = useCallback(() => {
    setInviteModal(true);
  }, []);

  const onCloseInviteModal = useCallback(() => {
    setInviteModal(false);
  }, []);

  const onClickIcon = useCallback(() => {
    setIsNavbar(true);
  }, []);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  return (
    <>
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
                <Title>Members</Title>
                <Description>
                  Invite your team member to collaborate.
                </Description>
              </LeftDiv>
              <Button
                title='Invite Member'
                onClick={onOpenInviteModal}
                variant='medium'
              />
            </Head>
            {/* Render loading state */}
            {loading ||
            ((!currentWorkspace?.users ||
              currentWorkspace?.users.length === 0) &&
              (!currentWorkspace?.invited_users ||
                currentWorkspace?.invited_users.length) === 0) ? (
              <MemberLoading />
            ) : (
              <MainCardDiv>
                {currentWorkspace?.users?.map((member) => (
                  <MemberCard
                    key={member.id}
                    userId={member.id}
                    name={member.display_name || ''}
                    email={member.email}
                    src={member.profile_url || ''}
                    designation={member.role}
                    currentOpenDropdown={currentOpenDropdown}
                    setOpenDropdown={setCurrentOpenDropdown}
                    dropdownIdentifier={`card-${member.id}`}
                    loadData={loadData}
                    isInvited={false}
                    isShowNavbar={isNavbar}
                  />
                ))}
                {currentWorkspace?.invited_users?.map((member) => (
                  <MemberCard
                    key={member.id}
                    userId={member.id}
                    name={member.name || ''}
                    email={member.email}
                    src={''}
                    designation={'PENDING'}
                    currentOpenDropdown={currentOpenDropdown}
                    setOpenDropdown={setCurrentOpenDropdown}
                    dropdownIdentifier={`card-${member.id}`}
                    loadData={loadData}
                    isInvited={true}
                    isShowNavbar={isNavbar}
                  />
                ))}
              </MainCardDiv>
            )}
          </RightDiv>
        </MainDiv>
      </Main>
      <Modal open={inviteModal} onClose={onCloseInviteModal}>
        <InviteMemberModal onClose={onCloseInviteModal} loadData={loadData} />
      </Modal>
    </>
  );
};

export default observer(Members);
