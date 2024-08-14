/* eslint-disable max-len */
'use client';
import React from 'react';
import {
  Description,
  Head,
  Label,
  LeftDiv,
  Main,
  MainDiv,
  PasswordInputs,
  ProfileDetail,
  RightDiv,
  TextField,
  Title,
} from '../style';
import Button from '@/components/button/button';
import Input from '@/components/input/input';

function ChangePassword() {
  return (
    <Main>
      <MainDiv>
        <RightDiv>
          <Head>
            <LeftDiv>
              <Title>Change your password</Title>
              <Description>Set a new password for your account</Description>
            </LeftDiv>
          </Head>
          <ProfileDetail>
            <PasswordInputs>
              <TextField>
                <Label>Current Password</Label>
                <Input placeholder={''} style={{ padding: '8px 16px' }} />
              </TextField>
              <TextField>
                <Label>New Password</Label>
                <Input placeholder={''} style={{ padding: '8px 16px' }} />
              </TextField>
              <TextField>
                <Label>Confirm Password</Label>
                <Input placeholder={''} style={{ padding: '8px 16px' }} />
              </TextField>
            </PasswordInputs>
            <Button title='Save' />
          </ProfileDetail>
        </RightDiv>
      </MainDiv>
    </Main>
  );
}

export default ChangePassword;
