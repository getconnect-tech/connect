/* eslint-disable max-len */
'use client';
import React, { ChangeEvent, useState } from 'react';
import {
  Description,
  Frame,
  Head,
  Label,
  LeftDiv,
  Link,
  Main,
  MainDiv,
  ProfileDetail,
  ProfileImage,
  ProfileInputs,
  RightDiv,
  TextField,
  Title,
} from '../style';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import SVGIcon from '@/assets/icons/SVGIcon';
import { useStores } from '@/stores';
import { updateWorkspaceDetails } from '@/services/clientSide/workspaceServices';

function WorkspaceProfile() {
  const { workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const [organizationName, setOrganizationName] = useState(
    currentWorkspace?.name,
  );

  const handleUpdate = () => {
    if (currentWorkspace)
      workspaceStore.setCurrentWorkspace({ ...currentWorkspace });
    if (organizationName) updateWorkspaceDetails(organizationName);
  };

  return (
    <Main>
      <MainDiv>
        <RightDiv>
          <Head>
            <LeftDiv>
              <Title>Workspace Profile</Title>
              <Description>Manage your Workspace Profile</Description>
            </LeftDiv>
          </Head>
          <ProfileDetail>
            <ProfileImage>
              <SVGIcon
                name='workspaceProfile-icon'
                width='58'
                height='58'
                viewBox='0 0 58 58'
              />
              <Frame>
                <Link>Upload new image</Link>
                <p>
                  Maximum image size allowed in 500KB in png, jpg, jpeg format.
                </p>
              </Frame>
            </ProfileImage>
            <ProfileInputs>
              <TextField>
                <Label>Organization Name</Label>
                <Input
                  placeholder={'Enter organization name'}
                  style={{ padding: '8px 16px' }}
                  value={organizationName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setOrganizationName(e.target.value)
                  }
                />
              </TextField>
            </ProfileInputs>
            <Button onClick={handleUpdate} title='Update' />
          </ProfileDetail>
        </RightDiv>
      </MainDiv>
    </Main>
  );
}

export default WorkspaceProfile;
