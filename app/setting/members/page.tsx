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
import { getWorkspaceList } from '@/services/clientSide/workspaceServices';
import { useStores } from '@/stores';

interface Member {
  id: string;
  email: string;
  display_name: string;
  profile_url: string | null;
  created_at: string;
  is_verified: boolean;
  updated_at: string;
  designation: string | null;
}

const Members = () => {
  const { workspaceStore } = useStores();
  const [members, setMembers] = useState(Array<Member>);

  const getWorkspaceMember = useCallback(async () => {
    workspaceStore.setLoading(true);
    // get user data from workspace object
    const [{ users }] = await getWorkspaceList();
    setMembers(users);
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
            {members?.map((member: Member) => (
              <MemberCard
                key={member.id}
                name={member.display_name}
                email={member.email}
                src={member.profile_url || ''}
                designation={member.designation || ''}
              />
            ))}
          </MainCardDiv>
        </RightDiv>
      </MainDiv>
    </Main>
  );
};

export default observer(Members);
