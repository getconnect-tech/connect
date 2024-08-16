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
import LabelModal from '@/components/labelModal/labelModal';

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
              <Button title='Invite Member' onClick={onOpenLabelModal} />
            </Head>

            {/* <EmptyLabelDiv>
      <IconDiv>
        <SVGIcon
          name='label-icon'
          width='20'
          height='20'
          viewBox='0 0 20 20'
        />
      </IconDiv>
      <Content>
        <h2>No Labels created yet</h2>
        <p>Create Labels to help organise tickets in your team.</p>
      </Content>
      <Button title='New Label' />
    </EmptyLabelDiv> */}

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
