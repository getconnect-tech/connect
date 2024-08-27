'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Head,
  LeftDiv,
  Main,
  MainCardDiv,
  MainDiv,
  RightDiv,
  Title,
} from '../style';
import Button from '@/components/button/button';
import ApiKeyCard from '@/components/apiKeyCard/apiKeyCard';
import Modal from '@/components/modal/modal';
import CreateKeyModal from '@/components/modalComponent/createKeyModal';
import { isEmpty } from '@/helpers/common';
import ApiKeyLoading from '@/components/apiKeyLoading/apiKeyLoading';
import EmptyState from '@/components/emptyState/emptyState';
import { useStores } from '@/stores';
import { getAPIKeys } from '@/services/clientSide/settingServices';
import { GetAllApi } from '@/utils/dataTypes';

function ApiKey() {
  const [keyModal, setKeyModal] = useState(false);
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );
  const { settingStore } = useStores();
  const { apiKeys, loading } = settingStore || {};

  const loadData = useCallback(async () => {
    if (isEmpty(apiKeys)) {
      settingStore.setLoading(true);
      try {
        await getAPIKeys();
      } finally {
        settingStore.setLoading(false);
      }
    }
  }, []);

  const onOpenKeyModal = useCallback(() => {
    setKeyModal(true);
  }, []);

  const onCloseKeyModal = useCallback(() => {
    setKeyModal(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <Main>
        <MainDiv>
          <RightDiv>
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
            {loading && <ApiKeyLoading />}
            {!loading && isEmpty(apiKeys) && (
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
            {!loading && !isEmpty(apiKeys) && (
              <MainCardDiv>
                {apiKeys?.map(
                  (apiKey: GetAllApi, index: React.Key | null | undefined) => (
                    <ApiKeyCard
                      key={index}
                      keyName={apiKey.api_key}
                      keyNumber={apiKey.number}
                      currentOpenDropdown={currentOpenDropdown}
                      setCurrentOpenDropdown={setCurrentOpenDropdown}
                      dropdownIdentifier={`card-${apiKey.id}`}
                    />
                  ),
                )}
              </MainCardDiv>
            )}
          </RightDiv>
        </MainDiv>
      </Main>
      <Modal open={keyModal} onClose={onCloseKeyModal}>
        <CreateKeyModal onClose={onCloseKeyModal} />
      </Modal>
    </>
  );
}

export default observer(ApiKey);
