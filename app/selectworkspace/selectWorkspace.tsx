/* eslint-disable max-len */
'use client';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardsDiv, Content, Head, MainDiv, OrganizationDiv } from './style';
import Icon from '@/components/icon/icon';
import SVGIcon from '@/assets/icons/SVGIcon';
import WorkspaceCard from '@/components/workspaceCard/workspaceCard';
import Button from '@/components/button/button';
import {
  getWorkspaceList,
  workspaceChange,
} from '@/services/clientSide/workspaceServices';
import { workspaceStore } from '@/stores/workspaceStore';
import { getAPIErrorMessage } from '@/helpers/common';
import { Workspace } from '@/utils/dataTypes';
import UserPreferenceSingleton from '@/helpers/userPreferenceSingleton';
import { messageStore } from '@/stores/messageStore';

function SelectWorkSpace() {
  const router = useRouter();
  const { workspaceList } = workspaceStore;

  const loadData = useCallback(async () => {
    try {
      workspaceStore.setLoading(true);
      await getWorkspaceList();
    } catch (err: any) {
      workspaceStore.setLoading(false);
      messageStore.setErrorMessage(
        getAPIErrorMessage(err) || 'Something went wrong!',
      );
    } finally {
      workspaceStore.setLoading(false);
    }
  }, []);

  const handleClick = useCallback(async (workSpaceId: string) => {
    // set current workspace in localstorage
    UserPreferenceSingleton.getInstance().setCurrentWorkspace(workSpaceId);
    // get workspace data
    const result = await workspaceChange(workSpaceId);
    if (result) router.push('/');
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const redirectToOnboarding = useCallback(() => {
    router.push('/onboarding');
  }, []);

  return (
    <MainDiv>
      <Icon
        onClick={() => {
          router.push('/');
        }}
        iconName={'cross-icon'}
        iconSize={'16'}
        iconViewBox={'0 0 16 16'}
        className='icon'
      />
      <Content>
        <Head>
          <SVGIcon
            name='logo-icon'
            width='60'
            height='60'
            viewBox='0 0 20 20'
          />
          <h6>Select Organization</h6>
        </Head>
        <OrganizationDiv>
          <CardsDiv>
            {workspaceList?.map(
              (item: Workspace, index: React.Key | null | undefined) => {
                return (
                  <WorkspaceCard
                    key={index}
                    organizationName={item.name}
                    src={item.image_url || ''}
                    workSpaceId={item.id}
                    handleClick={handleClick}
                  />
                );
              },
            )}
          </CardsDiv>
          <Button
            title='New workspace'
            iconName='plus-icon'
            iconSize='12'
            iconViewBox='0 0 12 12'
            secondary={true}
            onClick={redirectToOnboarding}
          />
        </OrganizationDiv>
      </Content>
    </MainDiv>
  );
}

export default SelectWorkSpace;
