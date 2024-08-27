'use client';
import React, { useCallback, useState } from 'react';
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

function Labels() {
  const [labelModal, setLabelModal] = useState(false);
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );

  const onOpenLabelModal = useCallback(() => {
    setLabelModal(true);
  }, []);

  const onCloseLabelModal = useCallback(() => {
    setLabelModal(false);
  }, []);

  const labelData = [
    { id: 1, label: 'Bug', iconName: 'bug-icon' },
    { id: 2, label: 'Questions', iconName: 'question-icon' },
    { id: 3, label: 'Feedback', iconName: 'feedback-icon' },
  ];

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
              {!isEmpty(labelData) && (
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
            {isEmpty(labelData) ? (
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
                {labelData.map((label) => (
                  <LabelCard
                    key={label.id}
                    label={label.label}
                    iconName={label.iconName}
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
}

export default Labels;
