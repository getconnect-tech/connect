/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useCallback, useState } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { PriorityLevels, TicketStatus } from '@prisma/client';
import DropDown from '../dropDown/dropDown';
import DatePickerModal from '../datePicker/datePicker';
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuMainDiv,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
import { priorityItem, snoozeItem } from '@/helpers/raw';
import { useStores } from '@/stores';
import { HandleClickProps, TicketDetailsInterface } from '@/utils/appTypes';
import {
  addLabelToTicket,
  changeTicketStatus,
  deleteLabelFromTicket,
  updateAssignee,
  updateTicketPriority,
} from '@/services/clientSide/ticketServices';

interface Props {
  children: any;
  ticketDetail: TicketDetailsInterface;
  ticketIndex: number;
}

export default function CustomContextMenu(props: Props) {
  const { children, ticketDetail, ticketIndex } = props;
  const { ticketStore, workspaceStore, settingStore } = useStores();
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const { currentWorkspace } = workspaceStore || {};
  const { labels } = settingStore || {};
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

  /*
   * @desc Update ticket details priority in context menu
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
   * @desc Update ticket details assign user in context menu
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

  const handleTicketLabel = useCallback(
    async (props: HandleClickProps) => {
      const { isChecked, labelId } = props;
      try {
        if (ticketDetail?.id && labelId) {
          if (isChecked) {
            const newLabel =
              ticketDetail.labels.filter((item) => item.id !== labelId) || [];
            ticketStore.updateTicketListItem(ticketIndex, {
              ...(ticketDetail || {}),
              labels: newLabel,
            });
            await deleteLabelFromTicket(ticketDetail?.id, labelId);
          } else {
            const newLabel = labels?.find((item) => item.id === labelId);
            const ticketLabels = ticketDetail.labels || [];
            if (newLabel) ticketLabels.push(newLabel);
            ticketStore.updateTicketListItem(ticketIndex, {
              ...(ticketDetail || {}),
              labels: ticketLabels,
            });
            await addLabelToTicket(ticketDetail?.id, labelId);
          }
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticketDetail],
  );

  /*
   * @desc update ticket status
   */
  const handleTicketStatus = useCallback(
    async (status: TicketStatus) => {
      const payload = {
        status,
      };
      try {
        if (ticketDetail?.id) {
          const updatedTicketDetails = {
            ...(ticketDetail || {}),
            status,
          };
          ticketStore.updateTicketListItem(ticketIndex, updatedTicketDetails);
          await changeTicketStatus(ticketDetail?.id, payload);
        }
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [ticketDetail],
  );

  const [showDropDown, setShowDropDown] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDropDownChange = () => {
    setShowDropDown(false);
    setShowDatePicker(true);
  };

  const handleDatePickerClose = () => {
    setShowDatePicker(false);
    setShowDropDown(true);
  };

  return (
    <ContextMenuMainDiv>
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenuContent>
            <div className='sub-menu'>
              <ContextMenu.Sub>
                <ContextMenuSubTrigger
                  onMouseEnter={(e) => handleMouseEnter(e, setSubmenuPosition)}
                >
                  <div>
                    <SVGIcon
                      name='context-assign-icon'
                      width='12'
                      height='12'
                      viewBox='0 0 12 12'
                      className='svg-icon'
                    />
                    Assigned to
                  </div>
                  <SVGIcon
                    name='context-arrow-icon'
                    width='10'
                    height='10'
                    viewBox='0 0 10 10'
                  />
                </ContextMenuSubTrigger>
                <ContextMenu.Portal>
                  <ContextMenuSubContent
                    className={
                      submenuPosition === 'upwards'
                        ? 'submenu-upwards'
                        : 'submenu-downwards'
                    }
                  >
                    <DropDown
                      items={assignItem}
                      onChange={onChangeAssign}
                      iconSize='20'
                      iconViewBox='0 0 20 20'
                      onClose={() => {}}
                      isSearch={true}
                      isContextMenu={true}
                      style={{ marginTop: -4 }}
                    />
                  </ContextMenuSubContent>
                </ContextMenu.Portal>
              </ContextMenu.Sub>
              <ContextMenu.Sub>
                <ContextMenuSubTrigger
                  onMouseEnter={(e) => handleMouseEnter(e, setSubmenuPosition)}
                >
                  <div>
                    <SVGIcon
                      name='context-snooze-icon'
                      width='12'
                      height='12'
                      viewBox='0 0 12 12'
                      className='svg-icon'
                    />
                    Snooze
                  </div>
                  <SVGIcon
                    name='context-arrow-icon'
                    width='10'
                    height='10'
                    viewBox='0 0 10 10'
                  />
                </ContextMenuSubTrigger>
                <ContextMenu.Portal>
                  <ContextMenuSubContent
                    className={
                      submenuPosition === 'upwards'
                        ? 'submenu-upwards'
                        : 'submenu-downwards'
                    }
                  >
                    <>
                      {showDropDown && (
                        <DropDown
                          items={snoozeItem}
                          iconSize='12'
                          iconViewBox='0 0 12 12'
                          onClose={() => setShowDropDown(false)}
                          isContextMenu={true}
                          isSnooze={true}
                          style={{ minWidth: 260, marginTop: -4 }}
                          onChange={handleDropDownChange}
                        />
                      )}
                      {showDatePicker && (
                        <DatePickerModal
                          onClose={handleDatePickerClose}
                          isContextMenu={true}
                        />
                      )}
                    </>
                  </ContextMenuSubContent>
                </ContextMenu.Portal>
              </ContextMenu.Sub>
              <ContextMenu.Sub>
                <ContextMenuSubTrigger
                  onMouseEnter={(e) => handleMouseEnter(e, setSubmenuPosition)}
                >
                  <div>
                    <SVGIcon
                      name='context-label-icon'
                      width='12'
                      height='12'
                      viewBox='0 0 12 12'
                      className='svg-icon'
                    />
                    Labels
                  </div>
                  <SVGIcon
                    name='context-arrow-icon'
                    width='10'
                    height='10'
                    viewBox='0 0 10 10'
                  />
                </ContextMenuSubTrigger>
                <ContextMenu.Portal>
                  <ContextMenuSubContent
                    className={
                      submenuPosition === 'upwards'
                        ? 'submenu-upwards'
                        : 'submenu-downwards'
                    }
                  >
                    <DropDown
                      items={labelItem}
                      iconSize='12'
                      iconViewBox='0 0 16 16'
                      onClose={() => {}}
                      handleClick={handleTicketLabel}
                      ticketLabelData={ticketDetail?.labels}
                      isSearch={true}
                      isContextMenu={true}
                      isCheckbox={true}
                      style={{ marginTop: -4 }}
                    />
                  </ContextMenuSubContent>
                </ContextMenu.Portal>
              </ContextMenu.Sub>
              <ContextMenu.Sub>
                <ContextMenuSubTrigger
                  onMouseEnter={(e) => handleMouseEnter(e, setSubmenuPosition)}
                >
                  <div>
                    <SVGIcon
                      name='priority-NONE'
                      width='12'
                      height='12'
                      viewBox='0 0 12 12'
                      className='svg-icon'
                    />
                    Priority
                  </div>
                  <SVGIcon
                    name='context-arrow-icon'
                    width='10'
                    height='10'
                    viewBox='0 0 10 10'
                  />
                </ContextMenuSubTrigger>
                <ContextMenu.Portal>
                  <ContextMenuSubContent
                    className={
                      submenuPosition === 'upwards'
                        ? 'submenu-upwards'
                        : 'submenu-downwards'
                    }
                  >
                    <DropDown
                      items={priorityItem}
                      onChange={onChangePriority}
                      iconSize='12'
                      iconViewBox='0 0 12 12'
                      onClose={() => {}}
                      isContextMenu={true}
                      style={{ marginTop: -4 }}
                    />
                  </ContextMenuSubContent>
                </ContextMenu.Portal>
              </ContextMenu.Sub>
            </div>
            {ticketDetail?.status !== TicketStatus.CLOSED ? (
              <ContextMenuItem>
                <div onClick={() => handleTicketStatus(TicketStatus.CLOSED)}>
                  <SVGIcon
                    name='close-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                    className='svg-icon'
                  />
                  Close
                </div>
              </ContextMenuItem>
            ) : (
              <ContextMenuItem>
                <div onClick={() => handleTicketStatus(TicketStatus.OPEN)}>
                  <SVGIcon
                    name='close-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                    className='svg-icon'
                  />
                  Re-open
                </div>
              </ContextMenuItem>
            )}
          </ContextMenuContent>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    </ContextMenuMainDiv>
  );
}
