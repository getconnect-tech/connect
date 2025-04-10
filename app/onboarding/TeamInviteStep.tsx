'use client';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import Avatar from '@/components/avtar/Avtar';
import Input from '@/components/input/input';
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import { useStores } from '@/stores';
import { isEmpty } from '@/helpers/common';
import { inviteUsersToWorkspace } from '@/services/clientSide/workspaceServices';
import {
  Description,
  Form,
  TextField,
  Label,
  CenterCardNext,
  NextProfile,
  Card,
  LabelDiv,
  BottomFrame,
  DetailSection,
} from './style';

const TeamInviteStep = () => {
  // State variables
  const [inputField, setInputField] = useState([
    { email: '', displayName: '' },
  ]);

  //   mobx store variables
  const {
    userStore: { user },
    workspaceStore,
  } = useStores();
  const router = useRouter();

  //   Handle the click of the get started button
  const handleGetStarted = useCallback(async () => {
    const usersToInvite = inputField?.filter(
      ({ displayName, email }) => !isEmpty(displayName) && !isEmpty(email),
    );
    const result = await inviteUsersToWorkspace(usersToInvite);
    if (result) {
      router.replace('/');
    }
  }, [inputField, router]);

  //   Handle the change of invited user input field
  const handleInvitedUserInputChange = useCallback(
    (type: 'displayName' | 'email', value: string, index: number) => {
      setInputField((prev) => {
        const newState = [...prev];
        newState[index][type] = value;
        return newState;
      });
    },
    [],
  );

  //   Handle the click of the remove input field button
  const handleRemoveInputField = useCallback(
    (index: number) => {
      const newInputField = inputField?.filter((_, i) => i !== index);
      setInputField(newInputField);
    },
    [inputField],
  );

  const handleAddInput = useCallback(() => {
    setInputField([...inputField, { email: '', displayName: '' }]);
  }, [inputField]);

  return (
    <>
      <CenterCardNext>
        <NextProfile>
          <Avatar
            imgSrc={user?.profile_url || ''}
            name={user?.display_name || ''}
            size={58}
          />
          <Description>
            <h2>Hello, {user?.display_name}</h2>
            <p>Invite members to collaborate in Connect</p>
          </Description>
        </NextProfile>
        <Form>
          <Card>
            <LabelDiv>
              <Label>Email Address</Label>
              <Label>Full Name</Label>
            </LabelDiv>
            <DetailSection>
              {inputField.map((field, index) => (
                <TextField isNext={true} key={index}>
                  <Input
                    placeholder={'Email Address'}
                    type='email'
                    value={field.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInvitedUserInputChange(
                        'email',
                        e.target.value,
                        index,
                      )
                    }
                  />
                  <Input
                    placeholder={'Full Name'}
                    type='text'
                    value={field.displayName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInvitedUserInputChange(
                        'displayName',
                        e.target.value,
                        index,
                      )
                    }
                  />
                  <Icon
                    onClick={() => handleRemoveInputField(index)}
                    iconName={'cross-icon'}
                    iconSize={'12'}
                    iconViewBox={'0 0 16 16'}
                    size={true}
                  />
                </TextField>
              ))}
            </DetailSection>
            <BottomFrame>
              <Button
                title='Add Another'
                iconName='plus-icon'
                iconSize='12'
                iconViewBox='0 0 12 12'
                isLink
                onClick={handleAddInput}
              />
            </BottomFrame>
          </Card>
        </Form>
      </CenterCardNext>
      <Button
        title='Get started'
        onClick={handleGetStarted}
        isLoading={workspaceStore.loading}
      />
    </>
  );
};

export default observer(TeamInviteStep);
