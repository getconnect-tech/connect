'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import LabelCard from '@/components/labelCard/labelCard';
import Button from '@/components/button/button';
import Modal from '@/components/modal/modal';
import { isEmpty } from '@/helpers/common';
import EmptyState from '@/components/emptyState/emptyState';
import LabelModal from '@/components/modalComponent/labelModal';
import { getLabels } from '@/services/clientSide/settingServices';
import { useStores } from '@/stores';
import Icon from '@/components/icon/icon';
import ResponsiveSettingNavBar from '@/components/settingNavBar/responsiveSettingNavBar';
import {
  Description,
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

const Labels = () => {
  const router = useRouter();
  const [labelModal, setLabelModal] = useState(false);
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );
  const { settingStore, workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { labels } = settingStore || {};
  const [isNavbar, setIsNavbar] = useState(false);

  const onClickIcon = useCallback(() => {
    setIsNavbar(true);
  }, []);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

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
                      labelDetails={label}
                      currentOpenDropdown={currentOpenDropdown}
                      setOpenDropdown={setCurrentOpenDropdown}
                      dropdownIdentifier={`card-${label.id}`}
                      isShowNavbar={isNavbar}
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
