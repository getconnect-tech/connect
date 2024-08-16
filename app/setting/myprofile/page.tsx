/* eslint-disable no-undef */
'use client';
import React, {
  ChangeEvent,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
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
import { getFirebaseUrlFromFile, isEmpty } from '@/helpers/common';

const MyProfile = () => {
  const { userStore } = useStores();
  const { user, loading } = userStore;
  const [displayName, setDisplayName] = useState<string>('');
  const [image, setImage] = useState<{
    profile: string | ArrayBuffer | null;
    file: File;
  } | null>(null);

  const loadData = useCallback(() => {
    setDisplayName(user?.display_name || '');
  }, [user?.display_name]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  const onSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        userStore.setLoading(true);
        let profile;
        if (image) {
          profile = await getFirebaseUrlFromFile(image?.file, 'UserProfiles');
        }
        const updatedImege =
          !isEmpty(image?.profile) && profile
            ? profile
            : user?.profile_url
              ? user?.profile_url
              : null;
        const payload: {
          displayName: string;
          profilePic: string | null;
        } = {
          displayName,
          profilePic: updatedImege,
        };
        updateUserDetails(payload);
        if (user?.id)
          userStore.setUserDetails({
            ...(user || {}),
            display_name: displayName,
            profile_url: updatedImege,
          });
      } catch (error) {
        userStore.setLoading(false);
        console.log('error', error);
      } finally {
        userStore.setLoading(false);
      }
    },
    [displayName, image, user, userStore],
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const item = {
          profile: fileReader.result,
          file: file,
        };
        setImage(item);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileRead = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        alert('No file selected.');
        return;
      }
      const fileData = file.name.split('.');
      if (file.size > 500000) {
        alert('Please upload less than 500kb photo size.');
        return false;
      }
      if (
        fileData[1] === 'jpg' ||
        fileData[1] === 'jpeg' ||
        fileData[1] === 'png'
      ) {
        await convertBase64(file);
      } else {
        alert('Please upload a valid type photo.');
        return false;
      }
    } catch (e) {
      console.log('error', e);
    }
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
          <ProfileDetail onSubmit={onSubmit}>
            <ProfileImage>
              <input
                type='file'
                onChange={handleFileRead}
                ref={inputRef}
                style={{ display: 'none' }}
              />
              <Avatar
                size={58}
                imgSrc={
                  typeof image?.profile === 'string'
                    ? image.profile
                    : user?.profile_url || ''
                }
                name={user?.display_name || ''}
              />
              <Frame>
                <Link onClick={handleUploadClick}>Upload new image</Link>
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
            <Button isLoading={loading} title='Update' />
          </ProfileDetail>
        </RightDiv>
      </MainDiv>
    </Main>
  );
};

export default observer(MyProfile);
