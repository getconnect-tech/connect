import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuMainDiv,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';

interface Props {
  children: any;
}

export default function CustomContextMenu({ children }: Props) {
  return (
    <ContextMenuMainDiv>
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenuContent>
            <ContextMenuItem>
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
            </ContextMenuItem>
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
            <ContextMenuItem>
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
            </ContextMenuItem>
            <ContextMenuItem>
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
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    </ContextMenuMainDiv>
  );
}
