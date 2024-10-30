import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { deleteMacros } from '@/services/clientSide/settingServices';
import { useStores } from '@/stores';
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
  id: string;
  isShowNavbar: boolean;
}

function MacroCard({
  id,
  name,
  description,
  currentOpenDropdown,
  setCurrentOpenDropdown,
  dropdownIdentifier,
  isShowNavbar,
}: Props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [macroModal, setMacroModal] = useState(false);
  const { settingStore } = useStores();
  const { loading } = settingStore || {};
  const [submenuPosition, setSubmenuPosition] = useState<
    'upwards' | 'downwards'
  >('upwards');

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    // eslint-disable-next-line no-unused-vars
    setPosition: (position: 'upwards' | 'downwards') => void,
  ) => {
    const triggerElement = e.currentTarget;
    const rect = triggerElement.getBoundingClientRect();
    const stickyInputHeight = 150;
    // eslint-disable-next-line no-undef
    const spaceBelow = window.innerHeight - rect.bottom - stickyInputHeight;
    const spaceAbove = rect.top;

    if (spaceBelow < 200 && spaceAbove > 200) {
      setPosition('upwards');
    } else {
      setPosition('downwards');
    }
  };
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

  const handleDelete = useCallback(async () => {
    try {
      const result = await deleteMacros(id);
      if (result) {
        settingStore.deleteMacros(id);
      }
    } catch (e) {
      console.log('Error : ', e);
    } finally {
      onCloseDeleteModal();
    }
  }, [id]);

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

  const stripHtmlTags = (html: string): string => {
    const withSpaces = html.replace(/&nbsp;/g, ' ');
    return withSpaces.replace(/<[^>]*>/g, '');
  };
  const cleanedDescription = stripHtmlTags(description);

  return (
    <>
      <CardMainDiv isShowNavbar={isShowNavbar}>
        <LeftDiv>
          <TitleDiv>
            <h6>{name}</h6>
            <p>{cleanedDescription}</p>
          </TitleDiv>
        </LeftDiv>
        <RightDiv>
          <div
            style={{ position: 'relative' }}
            className='tag-div'
            onMouseEnter={(e: any) => handleMouseEnter(e, setSubmenuPosition)}
          >
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
                className={
                  submenuPosition === 'upwards'
                    ? 'submenu-upwards'
                    : 'submenu-downwards'
                }
              />
            )}
          </div>
        </RightDiv>
      </CardMainDiv>
      <Modal open={deleteModal} onClose={onCloseDeleteModal}>
        <DeleteModal
          onClose={onCloseDeleteModal}
          headTitle={'Delete Macro'}
          title={'Are you sure you want to delete this macro?'}
          description={'This action can’t be undone.'}
          onDelete={handleDelete}
          loading={loading}
        />
      </Modal>
      <Modal open={macroModal} onClose={onCloseMacroModal}>
        <MacroModal
          macroData={{ id, title: name, description }}
          onClose={onCloseMacroModal}
        />
      </Modal>
    </>
  );
}

export default observer(MacroCard);
