/* eslint-disable max-len */
'use client';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardsDiv, Content, Head, MainDiv, OrganizationDiv } from './style';
import Icon from '@/components/icon/icon';
import SVGIcon from '@/assets/icons/SVGIcon';
import WorkspaceCard from '@/components/workspaceCard/workspaceCard';
import Button from '@/components/button/button';
import { getWorkspaceList } from '@/services/clientSide/workspaceServices';
import { workspaceStore } from '@/stores/workspaceStore';
import { getAPIErrorMessage } from '@/helpers/common';

function SelectWorkSpace() {
  // const workspaceCard = [
  //   {
  //     name: 'Workspace',
  //     src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/workspaces%2FUvUkEHJUSP5z1Zd1t2xno%2FOrganizationProfiles%2F002_1716377141553.jpg?alt=media&token=b73333cb-8fcf-4ce0-8638-39a540ec1d3e',
  //   },
  //   {
  //     name: 'Pixer Digital',
  //     src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/OrganizationProfiles%2Fpixer%20logo.png?alt=media&token=0f6ab873-8d4c-4b90-b917-193d416d7f05',
  //   },
  //   {
  //     name: 'Workspace',
  //     src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/OrganizationProfiles%2Fpixer%20logo.png?alt=media&token=0f6ab873-8d4c-4b90-b917-193d416d7f05',
  //   },
  //   {
  //     name: 'Workspace',
  //     src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/OrganizationProfiles%2Fpixer%20logo.png?alt=media&token=0f6ab873-8d4c-4b90-b917-193d416d7f05',
  //   },
  //   {
  //     name: 'Workspace',
  //     src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/OrganizationProfiles%2Fpixer%20logo.png?alt=media&token=0f6ab873-8d4c-4b90-b917-193d416d7f05',
  //   },
  // ];
  const router = useRouter();
  const { workspaceList } = workspaceStore;
  console.log('workspaceList', workspaceList);

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
              (
                item: { name: string; image_url: string | undefined },
                index: React.Key | null | undefined,
              ) => {
                return (
                  <WorkspaceCard
                    key={index}
                    organizationName={item.name}
                    src={item.image_url}
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
