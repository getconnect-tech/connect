import React, { useCallback, useState } from 'react';
import { Label } from '@prisma/client';
import Icon from '../icon/icon';
import DropDown from '../dropDown/dropDown';
import Modal from '../modal/modal';
import LabelModal from '../modalComponent/labelModal';
import { InnerDiv, ItemDiv, Name } from './style';
import { colors } from '@/styles/colors';
import LabelSvgIcon from '@/assets/icons/labelIcons';
import { deleteLabel } from '@/services/clientSide/settingServices';
import { settingStore } from '@/stores/settingStore';
import { messageStore } from '@/stores/messageStore';
interface Props {
  currentOpenDropdown?: string | null;
  dropdownIdentifier?: string;
  // eslint-disable-next-line no-unused-vars
  setOpenDropdown: (dropdown: string | null) => void;
  // eslint-disable-next-line no-unused-vars
  labelDetails?: Label;
}

function LabelCard({
  dropdownIdentifier,
  currentOpenDropdown,
  setOpenDropdown,
  labelDetails,
}: Props) {
  const [labelModal, setLabelModal] = useState(false);
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
      <ItemDiv>
        <InnerDiv>
          <LabelSvgIcon
            name={labelDetails?.icon}
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill={colors.icon}
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
                  handleDelete();
                } else {
                  onOpenLabelModal();
                }
              }}
            />
          )}
        </div>
      </ItemDiv>
      <Modal open={labelModal} onClose={onCloseLabelModal}>
        <LabelModal labelData={labelDetails} onClose={onCloseLabelModal} />
      </Modal>
    </>
  );
}

export default LabelCard;
