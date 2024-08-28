'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Description,
  Head,
  LeftDiv,
  Main,
  MainCardDiv,
  MainDiv,
  RightDiv,
  Title,
} from '../style';
import LabelCard from '@/components/labelCard/labelCard';
import Button from '@/components/button/button';
import Modal from '@/components/modal/modal';
import { isEmpty } from '@/helpers/common';
import EmptyState from '@/components/emptyState/emptyState';
import LabelModal from '@/components/modalComponent/labelModal';
import { getLabels } from '@/services/clientSide/settingServices';
import { useStores } from '@/stores';

const Labels = () => {
  const [labelModal, setLabelModal] = useState(false);
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );
  const { settingStore, workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore;
  const { labels } = settingStore;

  const onOpenLabelModal = useCallback(() => {
    setLabelModal(true);
  }, []);

  const onCloseLabelModal = useCallback(() => {
    setLabelModal(false);
  }, []);

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      await getLabels();
    }
  }, [currentWorkspace?.id]);

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
                <Title>Labels</Title>
                <Description>Manage workspace labels</Description>
              </LeftDiv>
              {!isEmpty(labels) && (
                <Button
                  title='New Label'
                  onClick={onOpenLabelModal}
                  iconName='label-plus-icon'
                  iconSize='10'
                  iconViewBox='0 0 10 10'
                  variant='medium'
                />
              )}
            </Head>
            {isEmpty(labels) ? (
              <EmptyState
                iconName={'label-icon'}
                iconSize={'20'}
                iconViewBox={'0 0 20 20'}
                title={'No Labels created yet'}
                description={
                  'Create Labels to help organize tickets in your team.'
                }
                buttonTitle='New Label'
                onClick={onOpenLabelModal}
                className='empty-state'
                buttonIconName='label-plus-icon'
                buttonIconSize='10'
                buttonIconViewBox='0 0 10 10'
              />
            ) : (
              <MainCardDiv>
                {labels &&
                  labels.map((label) => (
                    <LabelCard
                      key={label.id}
                      label={label.name}
                      iconName={label.icon}
                      currentOpenDropdown={currentOpenDropdown}
                      setOpenDropdown={setCurrentOpenDropdown}
                      dropdownIdentifier={`card-${label.id}`}
                    />
                  ))}
              </MainCardDiv>
            )}
          </RightDiv>
        </MainDiv>
      </Main>
      <Modal open={labelModal} onClose={onCloseLabelModal}>
        <LabelModal onClose={onCloseLabelModal} />
      </Modal>
    </>
  );
};

export default observer(Labels);
