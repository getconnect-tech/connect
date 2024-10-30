import React, { useCallback, useState } from 'react';
import { UserRole } from '@prisma/client';
import { observer } from 'mobx-react-lite';
import { capitalizeString } from '@/helpers/common';
import { HandleClickProps } from '@/utils/appTypes';
import { useStores } from '@/stores';
import {
  reInviteUsersFromWorkspace,
  removeInviteUsersFromWorkspace,
  removeMemberFromWorkspace,
  updateRole,
} from '@/services/clientSide/workspaceServices';
import Avatar from '../avtar/Avtar';
import Icon from '../icon/icon';
import DropDown, { DropDownItem } from '../dropDown/dropDown';
import Modal from '../modal/modal';
import DeleteModal from '../deleteModal/deleteModal';
import { CardDiv, LeftDiv, NameDiv, RightDiv } from './style';

interface Props {
  userId: string;
  // eslint-disable-next-line no-unused-vars
  designation?: string;
  name: string;
  email: string;
  src: string;
  currentOpenDropdown?: string | null;
  dropdownIdentifier?: string;
  // eslint-disable-next-line no-unused-vars
  setOpenDropdown: (dropdown: string | null) => void;
  loadData: () => void;
  isInvited: boolean;
  isShowNavbar: boolean;
}
const MemberCard = ({
  designation,
  name,
  email,
  src,
  dropdownIdentifier,
  currentOpenDropdown,
  setOpenDropdown,
  userId,
  loadData,
  isInvited,
  isShowNavbar,
}: Props) => {
  const { workspaceStore } = useStores();
  const [deleteModal, setDeleteModal] = useState(false);
  const { loading } = workspaceStore || {};
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

  let dropDownItem: DropDownItem[];
  if (designation === UserRole.OWNER) {
    dropDownItem = [];
  } else if (designation === UserRole.MEMBER) {
    dropDownItem = [
      {
        name: 'Make Admin',
        icon: 'admin-icon',
      },
      { name: 'Delete', icon: 'delete-icon', isDelete: true },
    ];
  } else if (designation === UserRole.ADMIN) {
    dropDownItem = [
      {
        name: 'Remove Admin',
        icon: 'admin-icon',
      },
      { name: 'Delete', icon: 'delete-icon', isDelete: true },
    ];
  } else {
    dropDownItem = [
      {
        name: 'Re Invite',
        icon: 'admin-icon',
      },
      { name: 'Delete', icon: 'delete-icon', isDelete: true },
    ];
  }

  const handleClickIcon = useCallback(() => {
    const identifier = `${dropdownIdentifier}-member`;
    setOpenDropdown(currentOpenDropdown === identifier ? null : identifier);
  }, [dropdownIdentifier, currentOpenDropdown, setOpenDropdown]);

  const onCloseDeleteModal = useCallback(() => {
    setDeleteModal(false);
  }, []);

  const handleDelete = useCallback(async () => {
    if (isInvited) {
      try {
        if (userId) {
          const result = await removeInviteUsersFromWorkspace(userId);
          if (result) {
            workspaceStore.removeInvitedUserFromWorkspace(userId);
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    } else {
      try {
        if (userId) {
          const result = await removeMemberFromWorkspace(userId);
          if (result) {
            workspaceStore.removeUserFromWorkspace(userId);
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    }
    setDeleteModal(false);
  }, [userId]);

  const handleClick = useCallback(
    async (props: HandleClickProps) => {
      const { value } = props;

      if (isInvited) {
        // Handle invited users' actions
        if (value === 'Delete') {
          setDeleteModal(true); // Open delete modal
        } else if (value === 'Re Invite') {
          try {
            if (userId) {
              await reInviteUsersFromWorkspace(userId);
            }
          } catch (error) {
            console.log('error', error);
          }
        }
      } else {
        // Handle regular members' actions
        if (value === 'Make Admin' || value === 'Remove Admin') {
          try {
            workspaceStore.setLoading(true);
            if (userId) {
              const result = await updateRole({
                userId,
                role: value === 'Make Admin' ? UserRole.ADMIN : UserRole.MEMBER,
              });
              if (result) {
                loadData();
              }
            }
            workspaceStore.setLoading(false);
          } catch (error) {
            console.log('error', error);
          }
        } else if (value === 'Delete') {
          setDeleteModal(true); // Open delete modal
        }
      }
    },
    [isInvited, userId, workspaceStore, loadData],
  );

  return (
    <CardDiv isShowNavbar={isShowNavbar}>
      <LeftDiv>
        <Avatar imgSrc={src} name={name} size={28} isShowBorder={true} />
        <NameDiv>
          <h6>{name}</h6>
          <p>{email}</p>
        </NameDiv>
      </LeftDiv>
      <RightDiv>
        {designation && designation !== UserRole.MEMBER && (
          <h6>{capitalizeString(designation)}</h6>
        )}
        {designation !== UserRole.OWNER && (
          <div
            style={{ position: 'relative' }}
            className='tag-div'
            onMouseEnter={(e: any) => handleMouseEnter(e, setSubmenuPosition)}
          >
            <Icon
              onClick={handleClickIcon}
              iconName='three-dot-icon'
              iconSize='16'
              iconViewBox='0 0 16 16'
              size={true}
            />
            {currentOpenDropdown === `${dropdownIdentifier}-member` && (
              <DropDown
                items={dropDownItem || []}
                iconSize={'12'}
                iconViewBox={'0 0 12 12'}
                handleClick={handleClick}
                onClose={() => {
                  setOpenDropdown(null);
                }}
                style={{ right: 0, zIndex: 1, minWidth: 143 }}
                className={
                  submenuPosition === 'upwards'
                    ? 'submenu-upwards'
                    : 'submenu-downwards'
                }
              />
            )}
          </div>
        )}
      </RightDiv>
      <Modal open={deleteModal} onClose={onCloseDeleteModal}>
        <DeleteModal
          onClose={onCloseDeleteModal}
          headTitle={'Delete Member'}
          title={'Are you sure you want to delete this member?'}
          description={'This action can’t be undone.'}
          onDelete={handleDelete}
          loading={loading}
        />
      </Modal>
    </CardDiv>
  );
};

export default observer(MemberCard);
