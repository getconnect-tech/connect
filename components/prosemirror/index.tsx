import { useEffect, useRef, useState } from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import {
  DOMSerializer,
  DOMParser as ProsemirrorDOMParser,
  Schema,
} from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { exampleSetup } from 'prosemirror-example-setup';
import { addListNodes } from 'prosemirror-schema-list';
import { tagNode, mentionNode, getMentionsPlugin } from 'prosemirror-mentions';
import { EditorDiv } from './style';

const ProseMirrorEditor = (props: any) => {
  const { users } = props || {};
  const editorRef = useRef<HTMLDivElement | null>(null); // Ref for editor div
  const [view, setView] = useState<EditorView | null>(null);
  console.log('view=-=-=-=--==-', view);

  useEffect(() => {
    if (!editorRef.current) return; // Wait for the editor div to be available

    const newSchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block')
        .append({ mention: mentionNode })
        .append({ tag: tagNode }),
      marks: schema.spec.marks,
    });

    const getMentionSuggestionsHTML = (items: any[]) =>
      '<div class="suggestion-item-list">' +
      items
        .map((i) => '<div class="suggestion-item">' + i.display_name + '</div>')
        .join('') +
      '</div>';

    const mentionPlugin = getMentionsPlugin({
      mentionTrigger: '@',
      getSuggestions: (
        type: string,
        text: string,
        // eslint-disable-next-line no-unused-vars
        done: (items: any[]) => void,
      ) => {
        setTimeout(() => {
          if (type === 'mention') {
            done(users);
          }
        }, 0);
      },
      getSuggestionsHTML: (items: any, type: any) => {
        if (type === 'mention') {
          return getMentionSuggestionsHTML(items);
        }
      },
    });

    const parser = new DOMParser();
    const doc = ProsemirrorDOMParser.fromSchema(newSchema).parse(
      parser.parseFromString(`<p></p>`, 'text/xml').documentElement,
    );

    const state = EditorState.create({
      doc,
      plugins: [mentionPlugin].concat(
        exampleSetup({ schema: newSchema, menuBar: false }),
      ),
    });

    // const editorView = new EditorView(editorRef.current, {
    //   state,
    //   handleDOMEvents: {
    //     input: () => {},
    //   },
    // });
    const editorView = new EditorView(editorRef.current, {
      state,
      dispatchTransaction(tr) {
        const newState = editorView.state.apply(tr);
        editorView.updateState(newState);

        // Convert the editor state to HTML and update the store
        const html: any = DOMSerializer.fromSchema(newSchema).serializeFragment(
          newState.doc.content,
        );
        const htmlString = Array.from(html)
          .map((node: any) => node.outerHTML)
          .join(''); // Convert the content to HTML string
        return htmlString;
        // editorStore.setContent(htmlString); // Update MobX store with the new HTML
      },
      handleDOMEvents: {
        input: () => {},
      },
    });

    setView(editorView);

    return () => {
      if (editorView) editorView.destroy(); // Clean up editor on unmount
    };
  }, [editorRef, users]);

  const getEditorContent = () => {
    if (view) {
      const fragment = DOMSerializer.fromSchema(
        view.state.schema,
      ).serializeFragment(view.state.doc.content);
      // eslint-disable-next-line no-undef
      const div = document.createElement('div');
      div.appendChild(fragment);
      return div.innerHTML;
    }
    return '';
  };

  console.log('users', users, getEditorContent());

  return <EditorDiv id='editor' ref={editorRef}></EditorDiv>;
};

export default ProseMirrorEditor;
