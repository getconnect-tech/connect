import Suggestion, { SuggestionOptions } from '@tiptap/suggestion';
import { Editor, Range, Extension } from '@tiptap/core';

type CommandProps = {
  editor: Editor;
  range: Range;
  // eslint-disable-next-line no-unused-vars
  props: { command: (params: { editor: Editor; range: Range }) => void };
};

type SuggestionConfig = {
  char: string;
  // eslint-disable-next-line no-unused-vars
  command: (params: CommandProps) => void;
};

export default Extension.create<{ suggestion: SuggestionConfig }>({
  name: 'slash-commands',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: CommandProps) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      } as SuggestionOptions),
    ];
  },
});
