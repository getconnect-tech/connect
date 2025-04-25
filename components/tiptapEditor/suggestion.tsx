import { ReactRenderer } from '@tiptap/react';
import tippy, { Instance as TippyInstance } from 'tippy.js';
import { Editor } from '@tiptap/core';
import { workspaceStore } from '@/stores/workspaceStore';
import MentionList from './mentionList';

// Define the type of the render function
interface MentionRenderProps {
  editor: Editor;
  query: string;
  range: { from: number; to: number };
  clientRect: (() => DOMRect) | null;
}

const suggestion: any = {
  items: ({ query }: { query: string }) => {
    const mentionUsers = workspaceStore?.currentWorkspace?.users || [];
    return mentionUsers
      ?.filter((item: any) => {
        const words =
          item?.display_name
            ?.split(' ')
            .map((word: string) => word.toLowerCase()) || [];
        return words.some((word: string) =>
          word.startsWith(query.toLowerCase()),
        );
      })
      ?.slice(0, 5);
  },

  render: () => {
    let component: any = null;
    let popup: TippyInstance[] | null = null;

    return {
      onStart: (props: MentionRenderProps) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component?.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
          theme: 'teamcamp',
          arrow: false,
        });
      },

      onUpdate(props: MentionRenderProps) {
        component?.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup?.[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: { event: KeyboardEvent }) {
        if (props.event.key === 'Escape') {
          popup?.[0].hide();
          return true;
        }

        return component?.ref?.onKeyDown(props) || false;
      },

      onExit() {
        popup?.[0].destroy();
        component?.destroy();
      },
    };
  },
};

export default suggestion;
