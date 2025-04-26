import { ReactRenderer } from '@tiptap/react';
import tippy, { Instance, Props } from 'tippy.js';
import CommandsList, { CommandsListHandle } from './commandList';
interface SuggestionProps {
  handleFileInput: () => void;
}
const slashSuggestion: any = (props: SuggestionProps) => {
  const { handleFileInput } = props;
  return {
    items: ({ query }: { query: string }) =>
      [
        {
          iconName: 'heading1-icon',
          title: 'Heading 1',
          command: ({ editor, range }: any) => {
            editor
              .chain()
              .focus()
              .deleteRange({ from: range.from, to: range.to + query.length })
              .setNode('heading', { level: 1 })
              .run();
          },
        },
        {
          iconName: 'heading2-icon',
          title: 'Heading 2',
          command: ({ editor, range }: any) => {
            editor
              .chain()
              .focus()
              .deleteRange({ from: range.from, to: range.to + query.length })
              .setNode('heading', { level: 2 })
              .run();
          },
        },
        {
          iconName: 'heading3-icon',
          title: 'Heading 3',
          command: ({ editor, range }: any) => {
            editor
              .chain()
              .focus()
              .deleteRange({ from: range.from, to: range.to + query.length })
              .setNode('heading', { level: 3 })
              .run();
          },
        },
        {
          iconName: 'bulleted-list-icon',
          title: 'Bullet List',
          command: ({ editor, range }: any) => {
            editor
              .chain()
              .focus()
              .deleteRange({ from: range.from, to: range.to + query.length })
              .toggleBulletList()
              .run();
          },
        },
        {
          iconName: 'number-list-icon',
          title: 'Number List',
          command: ({ editor, range }: any) => {
            editor
              .chain()
              .focus()
              .deleteRange({ from: range.from, to: range.to + query.length })
              .toggleOrderedList()
              .run();
          },
        },
        {
          iconName: 'check-list-icon',
          title: 'Checklist',
          command: ({ editor, range }: any) => {
            editor
              .chain()
              .focus()
              .deleteRange({ from: range.from, to: range.to + query.length })
              .toggleTaskList()
              .run();
          },
        },
        {
          //Remain to implement
          // iconName: 'attach-file-icon',
          title: 'Attach File',
          command: ({ editor, range }: any) => {
            editor
              .chain()
              .focus()
              .deleteRange({ from: range.from, to: range.to + query.length })
              .run();
            handleFileInput();
          },
        },
        {
          iconName: 'slash-code-block-icon',
          title: 'Code Block',
          command: ({ editor, range }: any) => {
            editor
              .chain()
              .focus()
              .deleteRange({ from: range.from, to: range.to + query.length })
              .toggleCodeBlock()
              .run();
          },
        },
        {
          iconName: 'divider-icon',
          title: 'Divider',
          command: ({ editor, range }: any) => {
            editor
              .chain()
              .focus()
              .deleteRange({ from: range.from, to: range.to + query.length })
              .insertContent('<hr /><p></p>')
              .run();
          },
        },
        {
          iconName: 'block-quote-icon',
          title: 'Block Quote',
          command: ({ editor, range }: any) => {
            editor
              .chain()
              .focus()
              .deleteRange({ from: range.from, to: range.to + query.length })
              .toggleBlockquote()
              .run();
          },
        },
        {
          iconName: 'table-icon',
          title: 'Table',
          command: ({ editor, range }: any) => {
            editor
              .chain()
              .focus()
              .deleteRange({ from: range.from, to: range.to + query.length })
              .insertTable({ rows: 3, cols: 3 })
              .run();
          },
        },
      ].filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      ),

    render: () => {
      let component: ReactRenderer<CommandsListHandle> | null = null;
      let popup: Instance<Props>[] | null = null;

      return {
        onStart: (props: any) => {
          const { editor, clientRect } = props || {};
          component = new ReactRenderer(CommandsList, { editor, props });

          popup = tippy('body', {
            getReferenceClientRect: clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          });
        },

        onUpdate: ({ query }: any) => {
          if (component) {
            component.updateProps({
              items: slashSuggestion({ handleFileInput }).items({ query }),
            });
          }
        },

        onKeyDown: (props: any) => {
          return component?.ref?.onKeyDown(props.event) ?? false;
        },

        onExit: () => {
          popup?.[0]?.destroy();
          component?.destroy();
          popup = null;
          component = null;
        },
      };
    },
  };
};

export default slashSuggestion;
