/* eslint-disable max-len */
'use client';
import React from 'react';
import {
  Description,
  Frame,
  Head,
  Label,
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
import Avatar from '@/components/avtar/Avtar';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import SVGIcon from '@/assets/icons/SVGIcon';
interface Props {
  isProfile?: boolean;
}
export default function WorkspaceProfile({ isProfile }: Props) {
  return (
    <Main>
      <MainDiv>
        <RightDiv>
          <Head>
            <Title>Workspace Profile</Title>
            <Description>Manage your Workspace Profile</Description>
          </Head>
          <ProfileDetail>
            <ProfileImage>
              {isProfile ? (
                <Avatar
                  size={58}
                  imgSrc={
                    'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
                  }
                  name={''}
                />
              ) : (
                <SVGIcon
                  name='workspaceProfile-icon'
                  width='58'
                  height='58'
                  viewBox='0 0 58 58'
                />
              )}
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
                />
              </TextField>
            </ProfileInputs>
            <Button title='Update' />
          </ProfileDetail>
        </RightDiv>
      </MainDiv>
    </Main>
  );
}
