import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { EditorView, Decoration, DecorationSet } from 'prosemirror-view';
import {
  Schema,
  DOMParser as ProseMirrorDOMParser,
  DOMSerializer,
} from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import { mentionNode, getMentionsPlugin } from 'prosemirror-mentions';
import ReactDOMServer from 'react-dom/server';
import Avatar from '../avtar/Avtar';
import { getFirebaseUrlFromFile, isEmpty } from '@/helpers/common';
import { workspaceStore } from '@/stores/workspaceStore';

interface Props {
  valueContent?: string;
  // eslint-disable-next-line no-unused-vars
  setValueContent: (value: string) => void;
  className?: string;
  placeholder?: string;
  isInternalDiscussion?: boolean;
}

const ProsemirrorEditor = forwardRef((props: Props, ref) => {
  const {
    valueContent,
    setValueContent,
    placeholder = '',
    isInternalDiscussion = false,
  } = props;
  const editorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const placeholderPluginKey = new PluginKey('placeholderPlugin');

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
        const docIsEmpty =
          state.doc.childCount === 1 &&
          state.doc.firstChild?.isTextblock &&
          state.doc.firstChild?.content.size === 0;

        if (docIsEmpty) {
          // Show placeholder if the document is empty
          const placeholderDecoration = Decoration.widget(1, () => {
            // eslint-disable-next-line no-undef
            const placeholderRef = document.createElement('span');
            placeholderRef.textContent = placeholder; // Set your placeholder text
            placeholderRef.style.cssText = `color: var(--text-text-secondary);`;
            return placeholderRef;
          });
          return DecorationSet.create(state.doc, [placeholderDecoration]);
        }

        return DecorationSet.empty;
        // return this.getState(state);
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
      ).append(isInternalDiscussion ? { mention: mentionNode } : {}),
      marks: schema.spec.marks,
    });

    const getMentionSuggestionsHTML = (items: any[]) => {
      return ReactDOMServer.renderToString(
        <div className='suggestion-item-list'>
          {items.map((i) => (
            <div className='suggestion-item' key={i.id}>
              <Avatar imgSrc={i.profile_url || ''} name={i.name} size={20} />
              <span className='name'>{i.name}</span>
            </div>
          ))}
        </div>,
      );
    };

    const mentionPlugin = isInternalDiscussion
      ? getMentionsPlugin({
          mentionTrigger: '@',
          getSuggestions: (
            type: string,
            text: string,
            // eslint-disable-next-line no-unused-vars
            done: (items: any[]) => void,
          ) => {
            if (type === 'mention') {
              const users = workspaceStore?.currentWorkspace?.users?.map(
                (user) => ({
                  ...user,
                  name: user?.display_name,
                  profile_url: user?.profile_url,
                }),
              );
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
        })
      : null;

    const parser = new DOMParser();
    const doc = ProseMirrorDOMParser.fromSchema(mySchema).parse(
      parser.parseFromString(
        `<p>${valueContent ? valueContent : ''}</p>`,
        'text/xml',
      ).documentElement,
    );

    const plugins = [placeholderPlugin];
    if (mentionPlugin) {
      plugins.push(mentionPlugin);
    }

    const state = EditorState.create({
      doc,
      // plugins: plugins.concat(
      //   exampleSetup({ schema: mySchema, menuBar: false }),
      // ),
      plugins: [
        ...(plugins as Plugin<any>[]), // Type cast to ensure correct type compatibility
        ...(exampleSetup({
          schema: mySchema,
          menuBar: false,
        }) as Plugin<any>[]), // Ensure the types align
      ],
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
  }, [isInternalDiscussion]);

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
    addContent(content: string) {
      if (viewRef.current) {
        const { state, dispatch } = viewRef.current;
        const { schema, tr } = state; // Correctly accessing the schema from state

        // Parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        // Convert HTML to ProseMirror nodes using ProseMirror DOMParser
        const fragment = ProseMirrorDOMParser.fromSchema(schema).parse(
          doc.body,
        );

        // Insert the fragment into the document at the current selection
        const transaction = tr.replaceSelectionWith(fragment);
        dispatch(transaction); // Dispatch the transaction to update the editor
        viewRef.current.focus(); // Focus on the editor
      }
    },
  }));

  return (
    <div>
      {/* Content that will be parsed by ProseMirror */}
      <div id='content' ref={contentRef} style={{ display: 'none' }}></div>

      {/* ProseMirror editor will be initialized here */}
      <div id='editor' className={props.className} ref={editorRef}></div>
    </div>
  );
});

export default ProsemirrorEditor;
