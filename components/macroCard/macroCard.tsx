import React, { useCallback, useState } from 'react';
import Icon from '../icon/icon';
import DropDown from '../dropDown/dropDown';
import Modal from '../modal/modal';
import DeleteModal from '../deleteModal/deleteModal';
import MacroModal from '../modalComponent/macroModal';
import { CardMainDiv, LeftDiv, RightDiv, TitleDiv } from './style';
interface Props {
  index: number;
  name: string;
  description: string;
  currentOpenDropdown: string | null;
  // eslint-disable-next-line no-unused-vars
  setCurrentOpenDropdown: (dropdown: string | null) => void;
  dropdownIdentifier: string;
}

function MacroCard({
  index,
  name,
  description,
  currentOpenDropdown,
  setCurrentOpenDropdown,
  dropdownIdentifier,
}: Props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [macroModal, setMacroModal] = useState(false);

  const onOpenMacroModal = useCallback(() => {
    setMacroModal(true);
  }, []);

  const onCloseMacroModal = useCallback(() => {
    setMacroModal(false);
  }, []);

  const onChange = useCallback((item: any) => {
    if (item.isDelete) {
      onOpenDeleteModal();
    } else if (!item.isDelete) {
      onOpenMacroModal();
    }
  }, []);

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

  const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
  };
  const cleanedDescription = stripHtmlTags(description);

  return (
    <>
      <CardMainDiv>
        <LeftDiv>
          <TitleDiv>
            <h6>{name}</h6>
            <p>{cleanedDescription}</p>
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
                style={{ right: 0, width: 116 }}
                onChange={(item) => {
                  onChange(item);
                }}
              />
            )}
          </div>
        </RightDiv>
      </CardMainDiv>
      <Modal open={deleteModal} onClose={onCloseDeleteModal}>
        <DeleteModal
          onclose={onCloseDeleteModal}
          headTitle={'Delete Macro'}
          title={'Are you sure you want to delete this macro?'}
          description={'This action can’t be undone.'}
        />
      </Modal>
      <Modal open={macroModal} onClose={onCloseMacroModal}>
        <MacroModal
          macroData={{ index, title: name, description }}
          onClose={onCloseMacroModal}
        />
      </Modal>
    </>
  );
}

export default MacroCard;
