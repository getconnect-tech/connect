import React, { useCallback } from 'react';
import { UserRole } from '@prisma/client';
import Avatar from '../avtar/Avtar';
import Icon from '../icon/icon';
import DropDown, { DropDownItem } from '../dropDown/dropDown';
import { CardDiv, LeftDiv, NameDiv, RightDiv } from './style';
import { capitalizeString } from '@/helpers/common';
import { HandleClickProps } from '@/utils/appTypes';
import { useStores } from '@/stores';
import {
  removeInviteUsersFromWorkspace,
  removeMemberFromWorkspace,
  updateRole,
} from '@/services/clientSide/workspaceServices';

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
}

function MemberCard({
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
}: Props) {
  const { workspaceStore } = useStores();
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
        name: 'Delete',
        icon: 'delete-icon',
        isDelete: true,
        status: 'Pending',
      },
    ];
  }

  const handleClickIcon = useCallback(() => {
    const identifier = `${dropdownIdentifier}-member`;
    setOpenDropdown(currentOpenDropdown === identifier ? null : identifier);
  }, [dropdownIdentifier, currentOpenDropdown, setOpenDropdown]);

  const handleClick = useCallback(
    async (props: HandleClickProps) => {
      const { value } = props;

      if (isInvited) {
        // Handle invited users' actions
        if (value === 'Delete') {
          try {
            console.log('userId?????', userId);
            if (userId) {
              const result = await removeInviteUsersFromWorkspace(userId);
              if (result) {
                workspaceStore.removeInvitedUserFromWorkspace(userId);
              }
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
      }
    },
    [isInvited, userId, workspaceStore, loadData],
  );

  return (
    <CardDiv>
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
          <div style={{ position: 'relative' }} className='tag-div'>
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
              />
            )}
          </div>
        )}
      </RightDiv>
    </CardDiv>
  );
}

export default MemberCard;
