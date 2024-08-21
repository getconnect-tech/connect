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
  getWorkspaceById,
  getWorkspaceList,
} from '@/services/clientSide/workspaceServices';
import { workspaceStore } from '@/stores/workspaceStore';
import { getAPIErrorMessage } from '@/helpers/common';
import { Workspace } from '@/utils/dataTypes';
import UserPreferenceSingleton from '@/helpers/userPreferenceSingleton';

function SelectWorkSpace() {
  const router = useRouter();
  const { workspaceList } = workspaceStore;

  const loadData = useCallback(async () => {
    try {
      workspaceStore.setLoading(true);
      await getWorkspaceList();
    } catch (err: any) {
      workspaceStore.setLoading(false);
      // eslint-disable-next-line no-undef
      alert(getAPIErrorMessage(err) || 'Something went wrong!');
    } finally {
      workspaceStore.setLoading(false);
    }
  }, []);

  const handleClick = useCallback(async (workSpaceId: string) => {
    UserPreferenceSingleton.getInstance().setCurrentWorkspace(workSpaceId);

    await getWorkspaceById(workSpaceId);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
          <h6>Select Organisation</h6>
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
          />
        </OrganizationDiv>
      </Content>
    </MainDiv>
  );
}

export default SelectWorkSpace;
