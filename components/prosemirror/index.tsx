/* eslint-disable max-len */
/* eslint-disable no-undef */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
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
import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
import ReactDOM from 'react-dom';
import Avatar from '../avtar/Avtar';
import { getFirebaseUrlFromFile, isEmpty } from '@/helpers/common';
import { workspaceStore } from '@/stores/workspaceStore';
import SVGIcon from '@/assets/icons/SVGIcon';

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

  const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block').append({
      mention: mentionNode,
    }), // Add mention node
    // marks: schema.spec.marks,
    marks: schema.spec.marks.append({
      strikethrough: {
        parseDOM: [
          { tag: 's' },
          { tag: 'strike' },
          { style: 'text-decoration=line-through' },
        ],
        toDOM() {
          return ['s', 0];
        },
      },
      underline: {
        parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
        toDOM() {
          return ['u', 0];
        },
      },
    }),
  });

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

  // Add your link command logic here
  const setLink = (href: string) => (state: any, dispatch: any) => {
    const { schema } = state;
    const { from, to } = state.selection;

    if (!href) {
      return false;
    }

    const markType = schema.marks.link;
    if (dispatch) {
      dispatch(state.tr.addMark(from, to, markType.create({ href })));
    }
    return true;
  };

  // Remove bullet list command (converts to paragraph)
  // const removeBulletList = (state: any, dispatch: any) => {
  //   return lift(state, dispatch);
  // };

  function clearAllFormatting(
    state: EditorState,
    // eslint-disable-next-line no-unused-vars
    dispatch: (tr: Transaction) => void,
  ) {
    const { from, to } = state.selection;
    const tr = state.tr;

    // Remove all marks
    Object.keys(state.schema.marks).forEach((markName) => {
      const markType = state.schema.marks[markName];
      tr.removeMark(from, to, markType);
    });

    // Convert the block type to a paragraph
    const paragraphNode = state.schema.nodes.paragraph;
    if (paragraphNode) {
      tr.setBlockType(from, to, paragraphNode);
    }

    if (dispatch) {
      dispatch(tr);
    }
    return true;
  }

  class SelectionMenuBar {
    menu: HTMLDivElement;

    constructor(view: EditorView) {
      this.menu = document.createElement('div');
      this.menu.className = 'selection-menu-bar';
      this.menu.style.position = 'absolute';
      this.menu.style.display = 'none'; // Initially hidden
      view.dom.parentNode?.appendChild(this.menu);

      // Add buttons for formatting actions
      this.addMenuItems(view);
    }

    isInBulletList(state: EditorState) {
      const { $from } = state.selection;
      for (let i = $from.depth; i > 0; i--) {
        const node = $from.node(i);
        if (node.type === state.schema.nodes.bullet_list) {
          return true; // The selection is inside a bullet list
        }
      }
      return false;
    }

    addMenuItems(view: EditorView) {
      const menuItems = [
        {
          label: '',
          icon: 'Heading-icon',
          submenu: [
            {
              label: 'Huge',
              command: setBlockType(mySchema.nodes.heading, { level: 1 }),
            },
            {
              label: 'Large',
              command: setBlockType(mySchema.nodes.heading, { level: 2 }),
            },
            {
              label: 'normal',
              command: setBlockType(mySchema.nodes.heading, { level: 3 }),
            },
            {
              label: 'Small',
              command: setBlockType(mySchema.nodes.heading, { level: 4 }),
            },
          ],
        },
        {
          label: ``,
          command: toggleMark(mySchema.marks.strong),
          icon: 'bold-icon',
        },
        {
          label: ' ',
          command: toggleMark(mySchema.marks.em),
          icon: 'italic-icon',
        },
        {
          label: '',
          command: toggleMark(mySchema.marks.underline), // Ensure underline mark is referenced correctly
          icon: 'underline-icon', // Replace with the actual icon for underline
        },
        {
          label: 'Strikethrough',
          command: toggleMark(mySchema.marks.strikethrough),
          icon: 'strikethrough-icon', // Add the correct strikethrough icon here
        },
        // {
        //   label: 'H1',
        //   command: setBlockType(mySchema.nodes.heading, { level: 1 }),
        // },
        // {
        //   label: 'H2',
        //   command: setBlockType(mySchema.nodes.heading, { level: 2 }),
        // },
        // {
        //   label: 'Ordered List',
        //   command: wrapIn(mySchema.nodes.ordered_list),
        //   icon: 'bullet-list-icon',
        // },
        // { label: ' ', command: removeBulletList },
        {
          label: '',
          command: () => setLink('https://example.com'),
          icon: 'link-icon',
        },
        {
          label: '',
          command: wrapIn(mySchema.nodes.blockquote),
          icon: 'blockquote-icon',
        },
        {
          label: '',
          command: toggleMark(mySchema.marks.code),
          icon: 'code-block-icon',
        },
        { label: 'Bullet List', command: wrapIn(mySchema.nodes.bullet_list) },
        {
          label: 'Ordered List',
          command: wrapIn(mySchema.nodes.ordered_list),
        },
        {
          label: 'Clear Formatting',
          command: clearAllFormatting,
          icon: 'clear-format-icon',
        },
      ];

      menuItems.forEach((item) => {
        // Create a div for the menu item
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item'; // You can add your styles here

        // Create a container for the SVG icon
        const iconContainer = document.createElement('div');

        // Render the SVGIcon to the container
        ReactDOM.render(
          <SVGIcon
            name={item.icon}
            width='12'
            height='12'
            viewBox='0 0 12 12'
          />,
          iconContainer,
        );

        // Set the button label
        const labelElement = document.createElement('span');
        labelElement.textContent = item.label;

        // Append the icon and label to the menu item div
        menuItem.appendChild(iconContainer);
        menuItem.appendChild(labelElement);

        if (item.submenu) {
          // Create dropdown for heading options
          const dropdown = document.createElement('div');
          dropdown.className = 'dropdown hidden'; // Use hidden class to initially hide the dropdown

          // Append dropdown to menuItem (important for hover visibility)
          menuItem.appendChild(dropdown);

          // Create a container for the dropdown icon
          const dropdownIconContainer = document.createElement('div');
          dropdownIconContainer.className = 'dropdown-icon'; // Add class for dropdown icon

          // Render the SVGIcon to the dropdownIconContainer
          ReactDOM.render(
            <SVGIcon
              name={'dropdown-icon'}
              width='8'
              height='8'
              viewBox='0 0 8 8'
            />,
            dropdownIconContainer,
          );

          // Append the dropdown icon container to the menu item
          menuItem.appendChild(dropdownIconContainer);

          // Add submenu items for heading levels
          item.submenu.forEach((subitem) => {
            const subButton = document.createElement('div');
            subButton.textContent = subitem.label;
            subButton.onclick = () => {
              const { state, dispatch } = view;
              if (subitem.command) {
                subitem.command(state, dispatch); // Pass state and dispatch here
              }
            };
            dropdown.appendChild(subButton);
          });

          // Show/Hide dropdown on hover
          menuItem.onmouseover = () => {
            dropdown.classList.remove('hidden');
            dropdown.classList.add('visible');
          };
          menuItem.onmouseout = () => {
            dropdown.classList.remove('visible');
            dropdown.classList.add('hidden');
          };
        } else {
          // Regular button (without submenu)
          menuItem.onclick = () => {
            const { state, dispatch } = view;
            if (item.command) {
              item.command(state, dispatch); // Pass state and dispatch here
            }
          };
        }

        this.menu.appendChild(menuItem);
      });
    }

    update(view: EditorView) {
      const { state } = view;
      const { from, to } = state.selection;

      if (state.selection.empty) {
        this.menu.style.display = 'none';
        return;
      }

      this.menu.style.display = '';
      const start = view.coordsAtPos(from);
      const end = view.coordsAtPos(to);
      const box = this.menu.offsetParent!.getBoundingClientRect();
      const left = Math.max((start.left + end.left) / 2, start.left + 3);
      this.menu.style.left = `${left - box.left}px`;
      this.menu.style.top = `${start.top - box.top - this.menu.offsetHeight - 5}px`;
    }

    destroy() {
      this.menu.remove();
    }
  }

  const selectionSizePlugin = new Plugin({
    view(editorView) {
      return new SelectionMenuBar(editorView);
    },
  });

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

    const plugins = [placeholderPlugin, selectionSizePlugin];
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
