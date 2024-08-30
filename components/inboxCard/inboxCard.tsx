/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { PriorityLevels, TicketStatus } from '@prisma/client';
import { observer } from 'mobx-react-lite';
import Avatar from '../avtar/Avtar';
import DropDownWithTag from '../dropDownWithTag/dropDownWithTag';
import AssigneeDropdown from '../AssigneeDropdown/dropDownWithTag';
import Icon from '../icon/icon';
import {
  CardDiv,
  DesTitle,
  DotIcon,
  LeftDiv,
  LineDiv,
  NameText,
  RightDiv,
  StatusMainDiv,
  TagDiv,
} from './style';
import { priorityItem } from '@/helpers/raw';
import { capitalizeString } from '@/helpers/common';
import { useStores } from '@/stores';
import { HandleClickProps, TicketDetailsInterface } from '@/utils/appTypes';
import {
  updateAssignee,
  changeTicketStatus,
  updateTicketPriority,
  addLabelToTicket,
  deleteLabelFromTicket,
} from '@/services/clientSide/ticketServices';

interface Props {
  ticketDetail: TicketDetailsInterface;
  description: string;
  showDotIcon?: boolean;
  src: string;
  currentOpenDropdown: string | null;
  setCurrentOpenDropdown: (dropdown: string | null) => void;
  dropdownIdentifier: string;
  loadData: () => void;
  ticketIndex: number;
}

const InboxCard = ({
  ticketDetail,
  description,
  showDotIcon = false,
  src,
  currentOpenDropdown,
  setCurrentOpenDropdown,
  dropdownIdentifier,
  ticketIndex,
}: Props) => {
  const { title, created_at, source, contact, priority, assigned_to } =
    ticketDetail;
  const router = useRouter();
  const { ticketStore, workspaceStore, settingStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { labels } = settingStore || {};

  const handleDropdownClick = (dropdown: string) => {
    const identifier = `${dropdownIdentifier}-${dropdown}`;
    setCurrentOpenDropdown(
      currentOpenDropdown === identifier ? null : identifier,
    );
  };

  const [submenuPosition, setSubmenuPosition] = useState<
    'upwards' | 'downwards'
  >('upwards');

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    setPosition: (position: 'upwards' | 'downwards') => void,
  ) => {
    const triggerElement = e.currentTarget;
    const rect = triggerElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 200 && spaceAbove > 200) {
      setPosition('upwards');
    } else {
      setPosition('downwards');
    }
  };

  const labelItem = (labels || [])?.map((label) => ({
    labelId: label.id,
    name: label.name,
    icon: label.icon,
  }));

  const assignItem = [
    { name: 'Unassigned', icon: 'dropdown-unassign-icon' },
    ...(currentWorkspace?.users?.map((user) => ({
      name: user.display_name || '',
      src: user.profile_url || '',
      isName: true,
      user_id: user.id,
    })) || []),
  ];

  const onClickTicket = useCallback(() => {
    ticketStore.setTicketDetails(ticketDetail);
    router.push(`/details/${ticketDetail?.id}`);
  }, []);

  /*
   * @desc Update ticket details priority in inbox card
   */
  const onChangePriority = useCallback(
    async (item: { value: PriorityLevels }) => {
      const payload = { priority: item?.value };
      try {
        const updatedTicketDetails = {
          ...(ticketDetail || {}),
          priority: item?.value,
        };
        ticketStore.updateTicketListItem(ticketIndex, updatedTicketDetails);
        await updateTicketPriority(ticketDetail?.id, payload);
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [],
  );

  /*
   * @desc Update ticket details assign user in inbox card
   */
  const onChangeAssign = useCallback(async (item: { user_id: string }) => {
    const payload = { assignee: item?.user_id };
    try {
      const updatedTicketDetails = {
        ...(ticketDetail || {}),
        assigned_to: item?.user_id,
      };
      ticketStore.updateTicketListItem(ticketIndex, updatedTicketDetails);
      await updateAssignee(ticketDetail?.id, payload);
    } catch (e) {
      console.log('Error : ', e);
    }
  }, []);

  const assignedUser = currentWorkspace?.users?.find(
    (user: { id: string | null }) => user.id === assigned_to,
  );

  /*
   * @desc Close ticket
   */
  const handleCloseTicket = useCallback(async () => {
    const payload = { status: TicketStatus.CLOSED };
    try {
      if (ticketDetail?.id) {
        ticketStore.updateTicketListItem(ticketIndex, {
          ...ticketDetail,
          status: TicketStatus.CLOSED,
        });
        await changeTicketStatus(ticketDetail?.id, payload);
      }
    } catch (e) {
      console.log('Error : ', e);
    }
  }, [ticketDetail]);

  // add/remove label to ticket
  const handleTicketLabel = useCallback(
    async (props: HandleClickProps) => {
      const { isChecked, labelId } = props;
      try {
        if (ticketDetail?.id && labelId) {
          if (isChecked) {
            const result = await deleteLabelFromTicket(
              ticketDetail?.id,
              labelId,
            );
            if (result) {
              const newLabel =
                ticketDetail.labels.filter((item) => item.id !== labelId) || [];
              ticketStore.updateTicketListItem(ticketIndex, {
                ...ticketDetail,
                labels: newLabel,
              });
            }
          } else {
            const result = await addLabelToTicket(ticketDetail?.id, labelId);
            if (result) {
              const newLabel = labels?.find((item) => item.id === labelId);
              const ticketLabels = ticketDetail.labels || [];
              if (newLabel) ticketLabels.push(newLabel);
              ticketStore.updateTicketListItem(ticketIndex, {
                ...ticketDetail,
                labels: ticketLabels,
              });
            }
          }
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticketDetail],
  );
  return (
    <CardDiv onClick={onClickTicket}>
      {showDotIcon && <DotIcon />}
      <LeftDiv>
        <div>
          <Avatar
            size={28}
            imgSrc={src}
            name={contact?.name || ''}
            isShowBorder={true}
          />
          <NameText>
            {contact?.name} from {capitalizeString(source)}
          </NameText>
        </div>
        <NameText>{moment(created_at).fromNow()}</NameText>
      </LeftDiv>
      <RightDiv>
        <DesTitle>{title}</DesTitle>
        <NameText className='description'>{description}</NameText>
        <StatusMainDiv>
          <div className='statusDiv'>
            <DropDownWithTag
              onClick={() => handleDropdownClick('label')}
              title={ticketDetail?.labels[0]?.name || ''}
              iconName={ticketDetail?.labels[0]?.icon || ''}
              dropdownOpen={
                currentOpenDropdown === `${dropdownIdentifier}-label`
              }
              iconSize='12'
              iconViewBox='0 0 16 16'
              onClose={() => setCurrentOpenDropdown(null)}
              items={labelItem}
              onChange={() => {}}
              handleTicketLabel={handleTicketLabel}
              ticketLabelData={ticketDetail.labels}
              isTag={true}
              isSearch={true}
              isCheckbox={true}
              isActive={true}
              className={
                submenuPosition === 'upwards'
                  ? 'submenu-upwards'
                  : 'submenu-downwards'
              }
              onMouseEnter={(e: any) => handleMouseEnter(e, setSubmenuPosition)}
            />
            <DropDownWithTag
              onClick={() => handleDropdownClick('priority')}
              title={'Priority'}
              iconName={`priority-${priority}`}
              dropdownOpen={
                currentOpenDropdown === `${dropdownIdentifier}-priority`
              }
              onClose={() => setCurrentOpenDropdown(null)}
              items={priorityItem}
              onChange={onChangePriority}
              isTag={true}
              isActive={true}
              selectedValue={{ name: priority }}
              className={
                submenuPosition === 'upwards'
                  ? 'submenu-upwards'
                  : 'submenu-downwards'
              }
              onMouseEnter={(e: any) => handleMouseEnter(e, setSubmenuPosition)}
            />
            <AssigneeDropdown
              onClick={() => handleDropdownClick('assign')}
              selectedValue={assignedUser}
              dropdownOpen={
                currentOpenDropdown === `${dropdownIdentifier}-assign`
              }
              onClose={() => setCurrentOpenDropdown(null)}
              items={assignItem}
              onChange={onChangeAssign}
              isActive={true}
              iconSize='20'
              className={
                submenuPosition === 'upwards'
                  ? 'submenu-upwards'
                  : 'submenu-downwards'
              }
              onMouseEnter={(e: any) => handleMouseEnter(e, setSubmenuPosition)}
            />
          </div>
          {ticketDetail.status !== TicketStatus.CLOSED && (
            <TagDiv className='tagDiv'>
              <div onClick={handleCloseTicket}>
                <Icon
                  iconName='close-icon'
                  iconSize='12'
                  iconViewBox='0 0 12 12'
                  onClick={() => {}}
                  size={true}
                />
              </div>
              <LineDiv />
              <Icon
                iconName='context-snooze-icon'
                iconSize='12'
                iconViewBox='0 0 12 12'
                onClick={() => {}}
                size={true}
              />
            </TagDiv>
          )}
        </StatusMainDiv>
      </RightDiv>
    </CardDiv>
  );
};
export default observer(InboxCard);
