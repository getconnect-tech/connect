'use client';
import React, { useCallback, useEffect, useState } from 'react';
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
import CreateKeyModal from '@/components/createKeyModal/createKeyModal';
import { isEmpty } from '@/helpers/common';
import ApiKeyLoading from '@/components/apiKeyLoading/apiKeyLoading';
import EmptyState from '@/components/emptyState/emptyState';

function ApiKey() {
  const [keyModal, setKeyModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );

  // Mock API keys
  const apiKeys = [
    { name: 'Key name A01', number: '**** ***** **** NK38', id: 1 },
    { name: 'Key name A02', number: '**** ***** **** DR45', id: 2 },
    { name: 'Key name A03', number: '**** ***** **** XY56', id: 3 },
  ];

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate data fetching
      if (isEmpty(apiKeys)) {
        // Do something if API keys are empty (optional)
      }
    } finally {
      setLoading(false);
    }
  }, [apiKeys]);

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
                {apiKeys.map((apiKey, index) => (
                  <ApiKeyCard
                    key={index}
                    keyName={apiKey.name}
                    keyNumber={apiKey.number}
                    currentOpenDropdown={currentOpenDropdown}
                    setCurrentOpenDropdown={setCurrentOpenDropdown}
                    dropdownIdentifier={`card-${apiKey.id}`}
                  />
                ))}
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

export default ApiKey;
