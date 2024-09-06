/* eslint-disable max-len */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Description,
  Head,
  LeftDiv,
  Main,
  MainCardDiv,
  MainDiv,
  RightDiv,
  Title,
} from '../style';
import Button from '@/components/button/button';
import MemberCard from '@/components/memberCard/memberCard';
import { getWorkspaceById } from '@/services/clientSide/workspaceServices';
import { useStores } from '@/stores';
import InviteMemberModal from '@/components/modalComponent/inviteMemberModal';
import Modal from '@/components/modal/modal';
import UserPreferenceSingleton from '@/helpers/userPreferenceSingleton';

const Members = () => {
  const [inviteModal, setInviteModal] = useState(false);
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );
  const { workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const loadData = useCallback(async () => {
    try {
      workspaceStore.setLoading(true);
      const workspaceId =
        await UserPreferenceSingleton.getInstance().getCurrentWorkspace();
      if (workspaceId) {
        await getWorkspaceById(workspaceId);
      }
    } catch (e) {
      console.log('Error : ', e);
    } finally {
      workspaceStore.setLoading(false);
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

  return (
    <>
      <Main>
        <MainDiv>
          <RightDiv>
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
                />
              ))}
            </MainCardDiv>
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
