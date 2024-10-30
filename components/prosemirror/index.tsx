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
  MarkType,
  Fragment,
} from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes, wrapInList } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import { mentionNode, getMentionsPlugin } from 'prosemirror-mentions';
import ReactDOMServer from 'react-dom/server';
import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
import ReactDOM from 'react-dom';
import { getFirebaseUrlFromFile, isEmpty } from '@/helpers/common';
import { workspaceStore } from '@/stores/workspaceStore';
import SVGIcon from '@/assets/icons/SVGIcon';
import Avatar from '../avtar/Avtar';

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
      link: {
        attrs: {
          href: {},
          title: { default: null },
        },
        inclusive: false,
        parseDOM: [
          {
            tag: 'a[href]',
            getAttrs(dom: any) {
              return {
                href: dom.getAttribute('href'),
                title: dom.getAttribute('title'),
              };
            },
          },
        ],
        toDOM(node) {
          return ['a', { href: node.attrs.href, title: node.attrs.title }, 0];
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
  function setLink(url: string) {
    // eslint-disable-next-line no-unused-vars
    return (state: EditorState, dispatch: (tr: Transaction) => void) => {
      const { schema, selection } = state;
      const { from, to } = selection;

      // Get the link mark type from the schema
      const linkMark: MarkType = schema.marks.link;

      if (selection.empty) {
        // If no text is selected, do nothing or show an alert
        return false;
      }

      if (dispatch) {
        // Apply the link mark with the provided URL
        const tr = state.tr.addMark(from, to, linkMark.create({ href: url }));
        dispatch(tr);
      }

      return true;
    };
  }

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

  function wrapSelectedInBulletList(
    state: EditorState,
    // eslint-disable-next-line no-unused-vars
    dispatch: (tr: Transaction) => void,
  ) {
    const { $from, $to } = state.selection;
    const range = $from.blockRange($to);
    if (!range) return false;
    // If the selection is already inside a list, we can wrap the selected content
    const wrapping = wrapInList(state.schema.nodes.bullet_list)(
      state,
      dispatch,
    );
    if (wrapping) return true;
    const listItemType = state.schema.nodes.list_item;
    // Iterate through the selected content and wrap each block in a <li> node
    const contentToWrap = [];
    for (let i = range.startIndex; i < range.endIndex; i++) {
      const blockNode = range.parent.child(i);
      const listItem = listItemType.create(null, blockNode.content);
      contentToWrap.push(listItem);
    }
    const bulletList = state.schema.nodes.bullet_list.create(
      null,
      Fragment.fromArray(contentToWrap),
    );
    const tr = state.tr.replaceRangeWith(range.start, range.end, bulletList);
    dispatch(tr.scrollIntoView());
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
              label: 'Normal',
              command: setBlockType(mySchema.nodes.heading, { level: 3 }),
            },
            {
              label: 'Small',
              command: setBlockType(mySchema.nodes.heading, { level: 4 }),
            },
          ],
        },
        {
          label: '',
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
          command: toggleMark(mySchema.marks.underline),
          icon: 'underline-icon',
        },
        {
          label: '',
          command: toggleMark(mySchema.marks.strikethrough),
          icon: 'strikethrough-icon',
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
        {
          label: '',
          command: () => {
            const url = prompt('Enter the URL');
            if (url) {
              setLink(url)(view.state, view.dispatch);
            }
          },
          icon: 'link-icon',
        },
        {
          label: ' ',
          command: (state: any, dispatch: any) => {
            wrapSelectedInBulletList(state, dispatch);
          },
          icon: 'bullet-list-icon',
        },
        {
          label: ' ',
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
        // eslint-disable-next-line react/no-deprecated
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

          // Append dropdown to menuItem
          menuItem.appendChild(dropdown);

          // Create a container for the dropdown icon
          const dropdownIconContainer = document.createElement('div');
          dropdownIconContainer.className = 'dropdown-icon';

          // Render the SVGIcon to the dropdownIconContainer
          // eslint-disable-next-line react/no-deprecated
          ReactDOM.render(
            <SVGIcon
              name={'dropdown-icon'}
              width='8'
              height='8'
              viewBox='0 0 8 8'
            />,
            dropdownIconContainer,
          );

          menuItem.appendChild(dropdownIconContainer);

          // Create submenu items
          item.submenu.forEach((subitem) => {
            const subButton = document.createElement('div');
            subButton.textContent = subitem.label;

            // On submenu click, execute command and close dropdown
            subButton.onclick = (event) => {
              event.stopPropagation();
              const { state, dispatch } = view;

              if (subitem.command) {
                subitem.command(state, dispatch);
              }

              // Close the dropdown and remove active state
              dropdown.classList.add('hidden');
              menuItem.classList.remove('active-menu-item');
            };

            dropdown.appendChild(subButton);
          });

          // Toggle dropdown visibility on click
          menuItem.onclick = () => {
            const isDropdownOpen = !dropdown.classList.contains('hidden');
            if (isDropdownOpen) {
              dropdown.classList.add('hidden');
              menuItem.classList.remove('active-menu-item');
            } else {
              dropdown.classList.remove('hidden');
              menuItem.classList.add('active-menu-item');
            }
          };
        } else {
          // Regular button
          menuItem.onclick = () => {
            const { state, dispatch } = view;
            if (item.command) {
              item.command(state, dispatch);
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

      // Get the closest offset parent (container)

      const container = this.menu.offsetParent;

      // Check if container is null and handle it

      if (!container) {
        console.error('Container (offset parent) is null');

        return; // Exit if the container is null, or you can provide a fallback
      }

      const containerBox = container.getBoundingClientRect();

      // Default container width of 989px if not already defined

      const containerWidth = containerBox.width || 989; // Fallback to 989px if container width is not explicitly set

      // Calculate left position relative to the container

      let left = Math.max((start.left + end.left) / 2, start.left + 3);

      const menuRect = this.menu.getBoundingClientRect();

      // Ensure the menu stays within the container's width of 989px

      if (left + menuRect.width > containerBox.left + containerWidth) {
        left = containerBox.left + containerWidth - menuRect.width - 10; // Adjust to fit within the container
      }

      this.menu.style.left = `${left - containerBox.left}px`;

      // Calculate top position relative to the container

      let top = start.top - containerBox.top - this.menu.offsetHeight - 5;

      if (top < 0) {
        top = start.bottom - containerBox.top + 5; // Adjust to position below if above is out of bounds
      }

      this.menu.style.top = `${top}px`;
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

  // eslint-disable-next-line prefer-const, react-hooks/exhaustive-deps
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
