/* eslint-disable max-len */
'use client';
import React from 'react';
import {
  Description,
  Head,
  Label,
  MainDiv,
  PasswordInputs,
  ProfileDetail,
  RightDiv,
  TextField,
  Title,
} from '../style';
import SettingNavBar from '@/components/settingNavBar/settingNavBar';
import Button from '@/components/button/button';
import Input from '@/components/input/input';

export default function Password() {
  return (
    <>
      <MainDiv>
        <SettingNavBar />
        <RightDiv>
          <Head>
            <Title>Change your password</Title>
            <Description>Set a new password for your account</Description>
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
    </>
  );
}
