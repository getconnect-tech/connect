/* eslint-disable max-len */
'use client';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
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
import { useStores } from '@/stores';
import { updateUserDetails } from '@/services/clientSide/userService';

const MyProfile = () => {
  const { userStore } = useStores();
  const { user } = userStore;
  const [displayName, setDisplayName] = useState(user?.display_name || '');

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

  const handleUpdate = () => {
    if (user) userStore.setUserDetails({ ...user, display_name: displayName });
    updateUserDetails(displayName);
  };

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
                  value={displayName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDisplayName(e.target.value)
                  }
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
            <Button onClick={handleUpdate} title='Update' />
          </ProfileDetail>
        </RightDiv>
      </MainDiv>
    </Main>
  );
};

export default observer(MyProfile);
