/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useCallback, useState } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { PriorityLevels } from '@prisma/client';
import DropDown from '../dropDown/dropDown';
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuMainDiv,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
import { labelItem, priorityItem } from '@/helpers/raw';
import { useStores } from '@/stores';
import { TicketDetailsInterface } from '@/utils/appTypes';
import { updateTicketDetails } from '@/services/clientSide/ticketServices';

interface Props {
  children: any;
  ticketDetail: TicketDetailsInterface;
  ticketIndex: number;
}

export default function CustomContextMenu(props: Props) {
  const { children, ticketDetail, ticketIndex } = props;
  const { ticketStore, workspaceStore } = useStores();
  const { currentWorkspace } = workspaceStore;
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

  const assignItem = [
    { name: 'Unassigned', icon: 'dropdown-unassign-icon' },
    ...(currentWorkspace?.users?.map((user) => ({
      name: user.display_name || '',
      src: '',
      isName: true,
      user_id: user.id,
    })) || []),
  ];

  const snoozeItem = [
    { name: 'Tomorrow', time: 'Wed, Jul 31' },
    { name: 'Next week', time: 'Tue, Aug 6' },
    { name: '3 days', time: 'Fri, Aug 2' },
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
        await updateTicketDetails(ticketDetail?.id, payload);
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
    const payload = { assignedTo: item?.user_id };
    try {
      const updatedTicketDetails = {
        ...(ticketDetail || {}),
        assigned_to: item?.user_id,
      };
      ticketStore.updateTicketListItem(ticketIndex, updatedTicketDetails);
      await updateTicketDetails(ticketDetail?.id, payload);
    } catch (e) {
      console.log('Error : ', e);
    }
  }, []);

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
                    <DropDown
                      items={snoozeItem}
                      iconSize='12'
                      iconViewBox='0 0 12 12'
                      onClose={() => {}}
                      isSearch={true}
                      isContextMenu={true}
                      isSnooze={true}
                      style={{ minWidth: 212, marginTop: -4 }}
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
                      iconViewBox='0 0 12 12'
                      onClose={() => {}}
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
            <ContextMenuItem>
              <div>
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
          </ContextMenuContent>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    </ContextMenuMainDiv>
  );
}
