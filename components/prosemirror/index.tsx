import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { EditorState, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  Schema,
  DOMParser as ProseMirrorDOMParser,
  DOMSerializer,
} from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { mentionNode, getMentionsPlugin } from 'prosemirror-mentions';
import { getFirebaseUrlFromFile, isEmpty } from '@/helpers/common';
import { workspaceStore } from '@/stores/workspaceStore';

interface Props {
  // eslint-disable-next-line no-unused-vars
  setValueContent: (value: string) => void;
}

const ProsemirrorEditor = forwardRef((props: Props, ref) => {
  const { setValueContent } = props;
  const editorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Helper function to convert ProseMirror Node to HTML string
  const convertNodeToHTML = (node: any, schema: any) => {
    const fragment = DOMSerializer.fromSchema(schema).serializeFragment(
      node.content,
    );
    // eslint-disable-next-line no-undef
    const div = document.createElement('div');
    div.appendChild(fragment);
    return div.innerHTML;
  };

  const placeholderPluginKey = new PluginKey('placeholderPlugin');

  // eslint-disable-next-line prefer-const
  let placeholderPlugin = new Plugin({
    key: placeholderPluginKey, // Assign the key here
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc);

        // Use the plugin key to get meta information
        const action = tr.getMeta(placeholderPluginKey);

        if (action && action.add) {
          // eslint-disable-next-line no-undef
          const widget = document.createElement('placeholder');
          const deco = Decoration.widget(action.add.pos, widget, {
            id: action.add.id,
          });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(
            set.find(
              undefined,
              undefined,
              (spec) => spec.id === action.remove.id,
            ),
          );
        }
        return set;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });

  const startImageUpload = useCallback(
    (view: any, file: any, uploadPath: string, fileName: string) => {
      const id = {};
      // Replace the selection with a placeholder
      const tr = view.state.tr;
      if (!tr.selection.empty) tr.deleteSelection();
      tr.setMeta(placeholderPlugin, { add: { id, pos: tr.selection.from } });
      view.dispatch(tr);

      getFirebaseUrlFromFile(file, uploadPath, fileName)
        .then((url) => {
          // const pos = findPlaceholder(view.state, id);
          const pos = tr.selection.from;
          if (pos === null) return;

          // Replace the placeholder with the uploaded image
          view.dispatch(
            view.state.tr
              .replaceWith(
                pos,
                pos,
                view.state.schema.nodes.image.create({ src: url }),
              )
              .setMeta(placeholderPlugin, { remove: { id } }),
          );
        })
        .catch(() => {
          view.dispatch(tr.setMeta(placeholderPlugin, { remove: { id } }));
        });
    },
    [placeholderPlugin],
  );

  useEffect(() => {
    if (!editorRef.current || !contentRef.current) return;

    // Define schema with list nodes
    const mySchema = new Schema({
      nodes: addListNodes(
        schema.spec.nodes,
        'paragraph block*',
        'block',
      ).append({ mention: mentionNode }), // Add mention node
      marks: schema.spec.marks,
    });

    const getMentionSuggestionsHTML = (items: any[]) =>
      '<div class="suggestion-item-list">' +
      items
        .map((i) => '<div class="suggestion-item">' + i.name + '</div>')
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
        if (type === 'mention') {
          // Filter users by the text typed after "@"
          const users = workspaceStore?.currentWorkspace?.users?.map((user) => {
            return { ...user, name: user?.display_name };
          });
          if (isEmpty(text)) done(users || []);
          else {
            const filteredUsers = users?.filter((user: any) =>
              user?.name?.toLowerCase().includes(text.toLowerCase()),
            );
            done(filteredUsers || []);
          }
        }
      },
      getSuggestionsHTML: (items: any, type: any) => {
        if (type === 'mention') {
          return getMentionSuggestionsHTML(items);
        }
      },
      // activeClass: 'suggestion-item-active',
    });

    const parser = new DOMParser();
    const doc = ProseMirrorDOMParser.fromSchema(mySchema).parse(
      parser.parseFromString(`<p></p>`, 'text/xml').documentElement,
    );

    const state = EditorState.create({
      doc,
      plugins: [mentionPlugin].concat(
        exampleSetup({ schema: mySchema, menuBar: false }),
      ),
    });

    const view = new EditorView(editorRef.current, {
      state,
      dispatchTransaction(transaction) {
        const newState = view.state.apply(transaction);
        view.updateState(newState);
        // Convert the editor content to HTML and update the state
        const contentNode = view.state.doc;
        const htmlString = convertNodeToHTML(contentNode, mySchema);
        setValueContent(htmlString);

        const html: any = DOMSerializer.fromSchema(mySchema).serializeFragment(
          newState.doc.content,
        );
        const htmlStringNode = Array.from(html)
          .map((node: any) => node.outerHTML)
          .join(''); // Convert the content to HTML string
        return htmlStringNode;
      },
      handleDOMEvents: {
        input: () => {},
      },
    });

    viewRef.current = view;

    // Clean up the editor when the component unmounts
    return () => {
      view.destroy();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    clearEditor() {
      if (viewRef.current) {
        // Create an empty document and set it to the editor state
        const emptyState = EditorState.create({
          doc: viewRef.current.state.schema.topNodeType.createAndFill()!,
          plugins: viewRef.current.state.plugins,
        });
        viewRef.current.updateState(emptyState);
        setValueContent('');
      }
    },
    uploadFile(file: any, uploadPath: string, fileName: string) {
      if (file && viewRef.current?.state.selection.$from.parent.inlineContent) {
        viewRef.current.focus();
        startImageUpload(viewRef.current, file, uploadPath, fileName);
      }
    },
  }));

  return (
    <div>
      {/* Content that will be parsed by ProseMirror */}
      <div id='content' ref={contentRef} style={{ display: 'none' }}></div>

      {/* ProseMirror editor will be initialized here */}
      <div id='editor' ref={editorRef}></div>
    </div>
  );
});

export default ProsemirrorEditor;
