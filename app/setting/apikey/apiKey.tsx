'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/button';
import ApiKeyCard from '@/components/apiKeyCard/apiKeyCard';
import Modal from '@/components/modal/modal';
import CreateKeyModal from '@/components/modalComponent/createKeyModal';
import { isEmpty } from '@/helpers/common';
import ApiKeyLoading from '@/components/apiKeyLoading/apiKeyLoading';
import EmptyState from '@/components/emptyState/emptyState';
import { useStores } from '@/stores';
import { getAPIKeys } from '@/services/clientSide/settingServices';
import Icon from '@/components/icon/icon';
import ResponsiveSettingNavBar from '@/components/settingNavBar/responsiveSettingNavBar';
import {
  Head,
  LeftDiv,
  Main,
  MainCardDiv,
  MainDiv,
  NavbarTitle,
  ResponsiveHeader,
  RightDiv,
  Title,
} from '../style';

function ApiKey() {
  const [keyModal, setKeyModal] = useState(false);
  const router = useRouter();
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );
  const { settingStore, workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const { apiKeys, loading } = settingStore || {};
  const [isNavbar, setIsNavbar] = useState(false);

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      await getAPIKeys();
    }
  }, [currentWorkspace?.id]);

  const onOpenKeyModal = useCallback(() => {
    setKeyModal(true);
  }, []);

  const onCloseKeyModal = useCallback(() => {
    setKeyModal(false);
  }, []);

  const onClickIcon = useCallback(() => {
    setIsNavbar(true);
  }, []);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
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
                <Title>API keys</Title>
              </LeftDiv>
              {!isEmpty(apiKeys) && (
                <Button
                  title='Create Key'
                  onClick={onOpenKeyModal}
                  variant='medium'
                />
              )}
            </Head>
            {loading && (!apiKeys || apiKeys?.length === 0) && (
              <ApiKeyLoading />
            )}
            {!loading && (!apiKeys || apiKeys?.length === 0) && (
              <EmptyState
                iconName='empty-apikey-icon'
                iconSize='20'
                iconViewBox='0 0 20 20'
                title='No API keys created yet'
                buttonTitle='Create Key'
                className='empty-state'
                onClick={onOpenKeyModal}
              />
            )}
            {apiKeys?.length > 0 && (
              <MainCardDiv>
                {apiKeys?.map((apiKey, index: React.Key | null | undefined) => (
                  <ApiKeyCard
                    key={index}
                    keyName={apiKey.name || ''}
                    keyNumber={`**** **** **** ${apiKey?.api_key?.slice(-4)}`}
                    currentOpenDropdown={currentOpenDropdown}
                    setCurrentOpenDropdown={setCurrentOpenDropdown}
                    dropdownIdentifier={`card-${apiKey.api_key}`}
                    apiKey={apiKey.api_key || ''}
                    isShowNavbar={isNavbar}
                  />
                ))}
              </MainCardDiv>
            )}
          </RightDiv>
        </MainDiv>
      </Main>
      <Modal open={keyModal} onClose={onCloseKeyModal}>
        <CreateKeyModal onClose={onCloseKeyModal} loadData={loadData} />
      </Modal>
    </>
  );
}

export default observer(ApiKey);
