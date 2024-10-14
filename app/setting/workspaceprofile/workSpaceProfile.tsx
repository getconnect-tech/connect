/* eslint-disable max-len */
'use client';
import React, {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import {
  Description,
  Frame,
  Head,
  Label,
  LeftDiv,
  Link,
  Main,
  MainDiv,
  NavbarTitle,
  ProfileDetail,
  ProfileImage,
  ProfileInputs,
  ResponsiveHeader,
  RightDiv,
  TextField,
  Title,
} from '../style';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { useStores } from '@/stores';
import { updateWorkspaceDetails } from '@/services/clientSide/workspaceServices';
import Avatar from '@/components/avtar/Avtar';
import { getFirebaseUrlFromFile, isEmpty } from '@/helpers/common';
import { messageStore } from '@/stores/messageStore';
import Icon from '@/components/icon/icon';
import ResponsiveSettingNavBar from '@/components/settingNavBar/responsiveSettingNavBar';

const WorkspaceProfile = () => {
  const router = useRouter();
  const { workspaceStore } = useStores();
  const { currentWorkspace, loading } = workspaceStore;
  const [isNavbar, setIsNavbar] = useState(false);
  const [organizationName, setOrganizationName] = useState<string>(
    currentWorkspace?.name || '',
  );
  const [image, setImage] = useState<{
    profile: string | ArrayBuffer | null;
    file: File;
  } | null>(null);

  const loadData = useCallback(() => {
    setOrganizationName(currentWorkspace?.name || '');
  }, [currentWorkspace?.name]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const convertBase64 = useCallback((file: File) => {
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
  }, []);

  const handleFileRead = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = event.target.files?.[0];
        if (!file) {
          messageStore.setErrorMessage('No file selected.');
          return;
        }
        const fileData = file.name.split('.');
        if (file.size > 500000) {
          messageStore.setErrorMessage(
            'Please upload less than 500kb photo size.',
          );
          return false;
        }
        if (
          fileData[1] === 'jpg' ||
          fileData[1] === 'jpeg' ||
          fileData[1] === 'png'
        ) {
          await convertBase64(file);
        } else {
          messageStore.setErrorMessage('Please upload a valid type photo.');
          return false;
        }
      } catch (e) {
        console.log('error', e);
      }
    },
    [],
  );

  const handleUpdate = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      try {
        workspaceStore.setLoading(true);
        let profile;
        if (image) {
          profile = await getFirebaseUrlFromFile(
            image?.file,
            'workspace_profile',
          );
        }
        const updatedImage =
          !isEmpty(image?.profile) && profile
            ? profile
            : currentWorkspace?.image_url
              ? currentWorkspace?.image_url
              : null;
        const payload: {
          name: string;
          imageUrl: string | null;
        } = {
          name: organizationName,
          imageUrl: updatedImage,
        };
        await updateWorkspaceDetails(payload);

        if (currentWorkspace)
          workspaceStore.setCurrentWorkspace({
            ...(currentWorkspace || {}),
            ...payload,
          });
      } catch (error) {
        workspaceStore.setLoading(false);
        console.log('error', error);
      } finally {
        workspaceStore.setLoading(false);
      }
    },
    [organizationName, image, currentWorkspace, workspaceStore],
  );

  const onClickIcon = useCallback(() => {
    setIsNavbar(true);
  }, []);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  return (
    <Main>
      {isNavbar && <ResponsiveSettingNavBar onClose={onCloseNavbar} />}
      <MainDiv>
        <RightDiv>
          <ResponsiveHeader>
            <div className='left-section'>
              <Icon
                iconName='sidebar-icon'
                iconSize='16'
                iconViewBox='0 0 16 16'
                className='sidebar-icon'
                onClick={onClickIcon}
              />
              <NavbarTitle>Settings</NavbarTitle>
            </div>
            <Icon
              iconName={'cross-icon'}
              iconSize={'12'}
              iconViewBox={'0 0 16 16'}
              size={true}
              className='cross-icon'
              onClick={() => {
                router.push('/');
              }}
            />
          </ResponsiveHeader>
          <Head>
            <LeftDiv>
              <Title>Workspace Profile</Title>
              <Description>Manage your Workspace Profile</Description>
            </LeftDiv>
          </Head>
          <ProfileDetail onSubmit={handleUpdate} isNavbar={isNavbar}>
            <ProfileImage>
              {/* <SVGIcon
                name='workspaceProfile-icon'
                width='58'
                height='58'
                viewBox='0 0 58 58'
              /> */}
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
                    ? image?.profile
                    : currentWorkspace?.image_url || ''
                }
                name={currentWorkspace?.name || ''}
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
            <Button
              type='submit'
              title='Update'
              isLoading={loading}
              variant='medium'
            />
          </ProfileDetail>
        </RightDiv>
      </MainDiv>
    </Main>
  );
};

export default observer(WorkspaceProfile);
