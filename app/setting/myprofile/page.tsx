/* eslint-disable max-len */
'use client';
import React, { useCallback } from 'react';
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
import Avatar from '@/components/avtar/Avtar';
import Button from '@/components/button/button';
import Input from '@/components/input/input';

function MyProfile() {
  const handleKeyPress = useCallback(
    (event: { which: any; keyCode: any; preventDefault: () => void }) => {
      // Allow only digits
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    },
    [],
  );

  return (
    <Main>
      <MainDiv>
        <RightDiv>
          <Head>
            <LeftDiv>
              <Title>My Profile</Title>
              <Description>Manage your account Profile</Description>
            </LeftDiv>
          </Head>
          <ProfileDetail>
            <ProfileImage>
              <Avatar
                size={58}
                imgSrc={
                  'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
                }
                name={''}
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
                <Label>FullName</Label>
                <Input
                  placeholder={'Enter Full name'}
                  style={{ padding: '8px 16px' }}
                />
              </TextField>
              <TextField>
                <Label>Phone Number</Label>
                <Input
                  placeholder={'Enter phone number'}
                  style={{ padding: '8px 16px' }}
                  onKeyPress={handleKeyPress}
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

export default MyProfile;
