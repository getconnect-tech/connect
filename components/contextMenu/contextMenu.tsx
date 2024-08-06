/* eslint-disable max-len */
import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import DropDown from '../dropDown/dropDown';
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuMainDiv,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
import { lableItem, priorityItem } from '@/helpers/raw';

interface Props {
  children: any;
}

export default function CustomContextMenu({ children }: Props) {
  const assignItem = [
    { name: 'Unassigned', icon: 'dropdown-unassign-icon' },
    {
      name: 'Sanjay M.',
      src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4',
      isName: true,
    },
    {
      name: 'Aniket',
      src: 'https://bearbuk.blob.core.windows.net/project/Profile_63c0ec5555376218700f12d5_2023041410225842.png',
      isName: true,
    },
    {
      name: 'Jemish',
      src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4',
      isName: true,
    },
    {
      name: 'Vatsal',
      src: 'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2F1708409574833_1712819712813.jpg?alt=media&token=42df7e19-9083-4c61-8b51-b43d5c3f4183',
      isName: true,
    },
  ];
  return (
    <ContextMenuMainDiv>
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenuContent>
            <ContextMenu.Sub>
              <ContextMenuSubTrigger>
                <div>
                  <SVGIcon
                    name='context-assign-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
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
                <ContextMenuSubContent className='ContextMenuSubContent'>
                  <DropDown
                    items={assignItem}
                    iconSize='20'
                    iconViewBox='0 0 20 20'
                    onClose={() => {}}
                    isSearch={true}
                    isContextMenu={true}
                  />
                </ContextMenuSubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
            <ContextMenuItem>
              <div>
                <SVGIcon
                  name='context-snooze-icon'
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                />
                Snooze
              </div>
              <SVGIcon
                name='context-arrow-icon'
                width='10'
                height='10'
                viewBox='0 0 10 10'
              />
            </ContextMenuItem>
            <ContextMenu.Sub>
              <ContextMenuSubTrigger>
                <div>
                  <SVGIcon
                    name='context-label-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
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
                <ContextMenuSubContent className='ContextMenuSubContent'>
                  <DropDown
                    items={lableItem}
                    iconSize='12'
                    iconViewBox='0 0 12 12'
                    onClose={() => {}}
                    isSearch={true}
                    isContextMenu={true}
                    isCheckbox={true}
                    style={{ maxWidth: 146 }}
                  />
                </ContextMenuSubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
            <ContextMenu.Sub>
              <ContextMenuSubTrigger>
                <div>
                  <SVGIcon
                    name='priority-no-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
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
                <ContextMenuSubContent className='ContextMenuSubContent'>
                  <DropDown
                    items={priorityItem}
                    iconSize='12'
                    iconViewBox='0 0 12 12'
                    onClose={() => {}}
                    isContextMenu={true}
                    style={{ maxWidth: 126 }}
                  />
                </ContextMenuSubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
          </ContextMenuContent>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    </ContextMenuMainDiv>
  );
}
