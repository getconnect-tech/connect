import React, { useCallback, useState } from 'react';
import copy from 'clipboard-copy';
import { observer } from 'mobx-react-lite';
import Icon from '../icon/icon';
import DropDown from '../dropDown/dropDown';
import Modal from '../modal/modal';
import DeleteModal from '../deleteModal/deleteModal';
import { CardMainDiv, LeftDiv, RightDiv, TitleDiv } from './style';
import { getAPIErrorMessage } from '@/helpers/common';
import { messageStore } from '@/stores/messageStore';
import { deleteAPIKey } from '@/services/clientSide/settingServices';
import { useStores } from '@/stores';

interface Props {
  keyName: string;
  keyNumber: string;
  currentOpenDropdown: string | null;
  // eslint-disable-next-line no-unused-vars
  setCurrentOpenDropdown: (dropdown: string | null) => void;
  dropdownIdentifier: string;
  apiKey: string;
  isShowNavbar: boolean;
}

const ApiKeyCard = ({
  keyName,
  keyNumber,
  currentOpenDropdown,
  setCurrentOpenDropdown,
  dropdownIdentifier,
  apiKey,
  isShowNavbar,
}: Props) => {
  const dropDownItem = [
    { name: 'Delete', icon: 'delete-icon', isDelete: true },
  ];
  const [deleteModal, setDeleteModal] = useState(false);
  const { settingStore } = useStores();
  const { loading } = settingStore || {};

  const handleDropdownClick = (dropdown: string) => {
    const identifier = `${dropdownIdentifier}-${dropdown}`;
    setCurrentOpenDropdown(
      currentOpenDropdown === identifier ? null : identifier,
    );
  };

  const onOpenDeleteModal = useCallback(() => {
    setDeleteModal(true);
  }, []);

  const onCloseDeleteModal = useCallback(() => {
    setDeleteModal(false);
  }, []);

  const handleCopyClick = useCallback(async () => {
    try {
      await copy(apiKey);
      messageStore.setSuccessMessage('Copied successfully');
    } catch (err: any) {
      messageStore.setErrorMessage(
        getAPIErrorMessage(err) || 'Something went wrong!',
      );
      return false;
    }
  }, []);

  const handleDeleteAPIKey = useCallback(async () => {
    try {
      const res = await deleteAPIKey(apiKey);
      if (res) {
        settingStore.removeAPIKey(apiKey);
      }
      onCloseDeleteModal();
    } catch (err: any) {
      messageStore.setErrorMessage(
        getAPIErrorMessage(err) || 'Something went wrong!',
      );
      return false;
    }
  }, [apiKey]);

  return (
    <CardMainDiv isShowNavbar={isShowNavbar}>
      <LeftDiv>
        <TitleDiv>
          <h6>{keyName}</h6>
          <p>{keyNumber}</p>
        </TitleDiv>
      </LeftDiv>
      <RightDiv>
        <Icon
          iconName='apikey-copy-icon'
          iconSize='12'
          iconViewBox='0 0 12 12'
          onClick={handleCopyClick}
          size={true}
          className='copy-icon'
        />
        <div style={{ position: 'relative' }} className='tag-div'>
          <Icon
            onClick={() => handleDropdownClick('key')}
            iconName='three-dot-icon'
            iconSize='16'
            iconViewBox='0 0 16 16'
            size={true}
          />
          {currentOpenDropdown === `${dropdownIdentifier}-key` && (
            <DropDown
              items={dropDownItem}
              iconSize={'12'}
              iconViewBox={'0 0 12 12'}
              onClose={() => {
                setCurrentOpenDropdown(null);
              }}
              style={{ right: 0, minWidth: 116 }}
              onChange={onOpenDeleteModal}
            />
          )}
        </div>
      </RightDiv>
      <Modal open={deleteModal} onClose={onCloseDeleteModal}>
        <DeleteModal
          onClose={onCloseDeleteModal}
          headTitle={'Delete API Key'}
          title={'Are you sure you want to delete this API Key?'}
          description={'This action can’t be undone.'}
          onDelete={handleDeleteAPIKey}
          loading={loading}
        />
      </Modal>
    </CardMainDiv>
  );
};

export default observer(ApiKeyCard);
