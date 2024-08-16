/* eslint-disable max-len */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { UserRole } from '@prisma/client';
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
import {
  getWorkspaceList,
  makeAdmin,
  removeMemberFromWorkspace,
} from '@/services/clientSide/workspaceServices';
import { useStores } from '@/stores';
import InviteMemberModal from '@/components/inviteMemberModal/inviteMemberModal';
import Modal from '@/components/modal/modal';

const Members = () => {
  const [inviteModal, setInviteModal] = useState(false);
  const { workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore;

  const onOpenInviteModal = useCallback(() => {
    setInviteModal(true);
  }, []);

  const onCloseInviteModal = useCallback(() => {
    setInviteModal(false);
  }, []);

  const handleClick = async (hoveredItem: string | null, userId: string) => {
    if (hoveredItem === 'Make Admin') {
      try {
        if (userId) await makeAdmin({ userId, role: UserRole.ADMIN });
      } catch (error) {
        console.log('error', error);
      }
    }
    if (hoveredItem === 'Delete') {
      try {
        if (userId) {
          const result = await removeMemberFromWorkspace(userId);
          if (result) {
            workspaceStore.removeUserFromWorkspace(userId);
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const getWorkspaceMember = useCallback(async () => {
    workspaceStore.setLoading(true);
    // get user data from workspace object
    await getWorkspaceList();
    workspaceStore.setLoading(false);
  }, []);

  useEffect(() => {
    getWorkspaceMember();
  }, [inviteModal]);

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
              <Button title='Invite Member' onClick={onOpenInviteModal} />
            </Head>
            <MainCardDiv>
              {currentWorkspace?.users?.map((member) => (
                <MemberCard
                  key={member.id}
                  userId={member.id}
                  handleClick={handleClick}
                  name={member.display_name || ''}
                  email={member.email}
                  src={member.profile_url || ''}
                  designation={member.role !== 'MEMBER' ? member.role : ''}
                />
              ))}
            </MainCardDiv>
          </RightDiv>
        </MainDiv>
      </Main>
      <Modal open={inviteModal} onClose={onCloseInviteModal}>
        <InviteMemberModal onClose={onCloseInviteModal} />
      </Modal>
    </>
  );
};

export default observer(Members);
