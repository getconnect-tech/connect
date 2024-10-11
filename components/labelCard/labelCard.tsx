import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Label } from '@prisma/client';
import Icon from '../icon/icon';
import DropDown from '../dropDown/dropDown';
import Modal from '../modal/modal';
import LabelModal from '../modalComponent/labelModal';
import DeleteModal from '../deleteModal/deleteModal';
import { InnerDiv, ItemDiv, Name } from './style';
import LabelSvgIcon from '@/assets/icons/labelIcons';
import { deleteLabel } from '@/services/clientSide/settingServices';
import { messageStore } from '@/stores/messageStore';
import { useStores } from '@/stores';
interface Props {
  currentOpenDropdown?: string | null;
  dropdownIdentifier?: string;
  // eslint-disable-next-line no-unused-vars
  setOpenDropdown: (dropdown: string | null) => void;
  // eslint-disable-next-line no-unused-vars
  labelDetails?: Label;
  isShowNavbar: boolean;
}

function LabelCard({
  dropdownIdentifier,
  currentOpenDropdown,
  setOpenDropdown,
  labelDetails,
  isShowNavbar,
}: Props) {
  const { settingStore } = useStores();
  const { loading } = settingStore || {};

  const [labelModal, setLabelModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const dropDownItem = [
    { name: 'Edit', icon: 'edit-icon' },
    { name: 'Delete', icon: 'delete-icon', isDelete: true },
  ];

  const onCloseLabelModal = useCallback(() => {
    setLabelModal(false);
  }, []);

  const onOpenLabelModal = useCallback(() => {
    setLabelModal(true);
  }, []);

  const handleClickIcon = useCallback(() => {
    const identifier = `${dropdownIdentifier}-label`;
    setOpenDropdown(currentOpenDropdown === identifier ? null : identifier);
  }, [dropdownIdentifier, currentOpenDropdown, setOpenDropdown]);

  const onOpenDeleteModal = useCallback(() => {
    setDeleteModal(true);
  }, []);

  const onCloseDeleteModal = useCallback(() => {
    setDeleteModal(false);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!labelDetails?.id) {
      messageStore.setErrorMessage('Label ID is undefined');
      return;
    }
    try {
      const result = await deleteLabel(labelDetails?.id);
      if (result) {
        settingStore.removeLabel(labelDetails?.id);
      }
    } catch (e) {
      console.log('Error : ', e);
    }
  }, [labelDetails?.id]);

  return (
    <>
      <ItemDiv isShowNavbar={isShowNavbar}>
        <InnerDiv>
          <LabelSvgIcon
            name={labelDetails?.icon}
            width='16'
            height='16'
            viewBox='0 0 16 16'
          />
          <Name>{labelDetails?.name}</Name>
        </InnerDiv>
        <div style={{ position: 'relative' }} className='tag-div'>
          <Icon
            onClick={handleClickIcon}
            iconName='three-dot-icon'
            iconSize='16'
            iconViewBox='0 0 16 16'
            size={true}
          />
          {currentOpenDropdown === `${dropdownIdentifier}-label` && (
            <DropDown
              items={dropDownItem}
              iconSize={'12'}
              iconViewBox={'0 0 12 12'}
              onClose={() => {
                setOpenDropdown(null);
              }}
              style={{ right: 0, width: 116, zIndex: 1 }}
              onChange={(item) => {
                if (item.isDelete) {
                  onOpenDeleteModal();
                } else {
                  onOpenLabelModal();
                }
              }}
            />
          )}
        </div>
      </ItemDiv>
      <Modal open={deleteModal} onClose={onCloseDeleteModal}>
        <DeleteModal
          onClose={onCloseDeleteModal}
          headTitle={'Delete Label'}
          title={'Are you sure you want to delete this label?'}
          description={'This action can’t be undone.'}
          onDelete={handleDelete}
          loading={loading}
        />
      </Modal>
      <Modal open={labelModal} onClose={onCloseLabelModal}>
        <LabelModal labelData={labelDetails} onClose={onCloseLabelModal} />
      </Modal>
    </>
  );
}

export default observer(LabelCard);
