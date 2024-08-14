/* eslint-disable max-len */
'use client';
import React, { useCallback, useEffect } from 'react';
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
import { getWorkspaceList } from '@/services/clientSide/workspaceServices';
import { useStores } from '@/stores';

const Members = () => {
  const { workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore;

  const getWorkspaceMember = useCallback(async () => {
    workspaceStore.setLoading(true);
    // get user data from workspace object
    await getWorkspaceList();
    workspaceStore.setLoading(false);
  }, []);

  useEffect(() => {
    getWorkspaceMember();
  }, []);

  return (
    <Main>
      <MainDiv>
        <RightDiv>
          <Head>
            <LeftDiv>
              <Title>Members</Title>
              <Description>Invite your team member to collaborate.</Description>
            </LeftDiv>
            <Button title='Invite Member' />
          </Head>
          <MainCardDiv>
            {currentWorkspace?.users?.map((member) => (
              <MemberCard
                key={member.id}
                name={member.display_name || ''}
                email={member.email}
                src={member.profile_url || ''}
                designation={''}
              />
            ))}
          </MainCardDiv>
        </RightDiv>
      </MainDiv>
    </Main>
  );
};

export default observer(Members);
