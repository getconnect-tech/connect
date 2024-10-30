/* eslint-disable max-len */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/button';
import EmptyState from '@/components/emptyState/emptyState';
import { isEmpty } from '@/helpers/common';
import MacroCard from '@/components/macroCard/macroCard';
import Modal from '@/components/modal/modal';
import MacroModal from '@/components/modalComponent/macroModal';
import { useStores } from '@/stores';
import ResponsiveSettingNavBar from '@/components/settingNavBar/responsiveSettingNavBar';
import Icon from '@/components/icon/icon';
import { getMacros } from '../../../services/clientSide/settingServices';
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

const Macros = () => {
  const router = useRouter();
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );
  const [macroModal, setMacroModal] = useState(false);
  const { settingStore, workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { macros } = settingStore || {};
  const [isNavbar, setIsNavbar] = useState(false);

  const loadData = useCallback(async () => {
    if (!isEmpty(currentWorkspace?.id)) {
      try {
        await getMacros();
      } catch (err: any) {
        console.log('error', err);
      }
    }
  }, [currentWorkspace?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onOpenMacroModal = useCallback(() => {
    setMacroModal(true);
  }, []);

  const onCloseMacroModal = useCallback(() => {
    setMacroModal(false);
  }, []);

  const onClickIcon = useCallback(() => {
    setIsNavbar(true);
  }, []);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

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
                <Title>Macros</Title>
                <Description>Manage workspace macros</Description>
              </LeftDiv>
              {!isEmpty(macros) && (
                <Button
                  iconName='label-plus-icon'
                  title='New Macros'
                  iconSize='10'
                  iconViewBox='0 0 10 10'
                  iconColor='white'
                  variant='medium'
                  onClick={onOpenMacroModal}
                />
              )}
            </Head>
            {isEmpty(macros) && (
              <EmptyState
                iconName='empty-macro-icon'
                iconSize='20'
                iconViewBox='0 0 20 20'
                title='No Macros created yet'
                buttonTitle='New Macro'
                className='empty-state'
                description='Create Macros to help when sending the emails.'
                buttonIconName='label-plus-icon'
                buttonIconSize='10'
                buttonIconViewBox='0 0 10 10'
                onClick={onOpenMacroModal}
              />
            )}
            {!isEmpty(macros) && (
              <MainCardDiv>
                {macros.map((macros, index) => (
                  <MacroCard
                    key={index}
                    index={index}
                    id={macros?.id}
                    name={macros.title}
                    description={macros.content}
                    currentOpenDropdown={currentOpenDropdown}
                    setCurrentOpenDropdown={setCurrentOpenDropdown}
                    dropdownIdentifier={`card-${macros.id}`}
                    isShowNavbar={isNavbar}
                  />
                ))}
              </MainCardDiv>
            )}
          </RightDiv>
        </MainDiv>
      </Main>
      <Modal open={macroModal} onClose={onCloseMacroModal}>
        <MacroModal onClose={onCloseMacroModal} />
      </Modal>
    </>
  );
};

export default observer(Macros);
