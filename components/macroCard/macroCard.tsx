import React, { useCallback, useState } from 'react';
import Icon from '../icon/icon';
import DropDown from '../dropDown/dropDown';
import Modal from '../modal/modal';
import DeleteModal from '../deleteModal/deleteModal';
import { CardMainDiv, LeftDiv, RightDiv, TitleDiv } from './style';

interface Props {
  name: string;
  description: string;
  currentOpenDropdown: string | null;
  // eslint-disable-next-line no-unused-vars
  setCurrentOpenDropdown: (dropdown: string | null) => void;
  dropdownIdentifier: string;
}

function MacroCard({
  name,
  description,
  currentOpenDropdown,
  setCurrentOpenDropdown,
  dropdownIdentifier,
}: Props) {
  const [deleteModal, setDeleteModal] = useState(false);

  const dropDownItem = [
    { name: 'Edit', icon: 'edit-icon' },
    {
      name: 'Delete',
      icon: 'delete-icon',
      isDelete: true,
    },
  ];

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
    console.log('Closing delete modal');
    setDeleteModal(false);
  }, []);

  return (
    <CardMainDiv>
      <LeftDiv>
        <TitleDiv>
          <h6>{name}</h6>
          <p>{description}</p>
        </TitleDiv>
      </LeftDiv>
      <RightDiv>
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
              onChange={(item) => {
                if (item.isDelete) {
                  onOpenDeleteModal();
                }
              }}
            />
          )}
        </div>
      </RightDiv>

      <Modal open={deleteModal} onClose={onCloseDeleteModal}>
        <DeleteModal
          onclose={onCloseDeleteModal}
          headTitle={'Delete Macro'}
          title={'Are you sure you want to delete this macro?'}
          description={'This action can’t be undone.'}
        />
      </Modal>
    </CardMainDiv>
  );
}

export default MacroCard;
