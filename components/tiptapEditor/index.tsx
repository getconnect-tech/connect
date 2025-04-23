import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BubbleMenu, Editor, EditorContent, Extension } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
// import Mention from '@tiptap/extension-mention';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import HardBreak from '@tiptap/extension-hard-break';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import History from '@tiptap/extension-history';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Typography from '@tiptap/extension-typography';
import Code from '@tiptap/extension-code';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import SVGIcon from '@/assets/icons/SVGIcon';
import { isEmpty } from '@/helpers/common';
import { ColorHighlighter } from './ColorHighlighter';
import { SmilieReplacer } from './SmilieReplacer';

interface Props {
  valueContent?: string;
  // eslint-disable-next-line no-unused-vars
  setValueContent?: (value: string) => void;
  isEditable?: boolean;
  placeHolder?: string;
}

function TiptapEditor(props: Props) {
  const {
    valueContent = '',
    setValueContent,
    isEditable = true,
    placeHolder,
  } = props || {};
  const [editor, setEditor] = useState<Editor | null>(null);
  const [currentCell, setCurrentCell] = useState<HTMLElement | null>(null);
  const [isUrlOpen, setIsUrlOpen] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  console.log('currentCell -0-0', currentCell);

  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = ({ editor }: { editor: Editor }) => {
      const { from } = editor.state.selection;
      const domAtPos = editor.view.domAtPos(from);
      const node = domAtPos.node;

      let cell: HTMLElement | null = null;

      // Ensure node is an HTMLElement before calling closest
      if (node instanceof HTMLElement) {
        cell = node.closest('td, th') as HTMLElement | null;
      } else if (node?.parentElement) {
        // If it's a text node, try parentElement
        cell = node.parentElement.closest('td, th');
      }

      if (cell && editor.isActive('table')) {
        setCurrentCell(cell);
      } else {
        setCurrentCell(null); // Hide when out of table
      }
    };

    editor.on('selectionUpdate', handleSelectionUpdate);

    return () => {
      editor.off('selectionUpdate', handleSelectionUpdate);
    };
  }, [editor]);

  // use effect function call
  useEffect(() => {
    if (isDropdownOpen) {
      adjustDropdownPosition();
      window.addEventListener('resize', adjustDropdownPosition);
      return () => {
        window.removeEventListener('resize', adjustDropdownPosition);
      };
    }
  }, [isDropdownOpen]);

  // This function give us dropdown position where it's open top or bottom
  const adjustDropdownPosition = () => {
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    const dropdown = dropdownRef.current;
    if (buttonRect && dropdown) {
      const dropdownHeight = dropdown.offsetHeight;
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  };

  // Call empty function on cmd + enter to avoid extra enter event on send
  const CommandEnterShortcut = Extension.create({
    name: 'commandEnterShortcut',
    addKeyboardShortcuts() {
      return {
        'Mod-Enter': () => {
          // Call this function just to avoid enter on cmd+enter press
          return true;
        },
      };
    },
  });

  // Extensions for tiptap editor
  const extensions = [
    Underline,
    Image,
    Placeholder.configure({
      placeholder: placeHolder || 'Write something...', // Set the placeholder text here
    }),
    // Mention.configure({
    //   HTMLAttributes: {
    //     class: 'mention',
    //   },
    //   suggestion,
    // }),
    Bold,
    Italic,
    Strike,
    ListItem,
    Blockquote,
    HardBreak,
    HorizontalRule,
    History,
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6], // Define which heading levels to allow
    }),
    // CustomCodeBlockLowlight.configure({
    //   lowlight,
    //   isRead: !isEditable,
    // }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: 'https',
    }),
    // SnapEmbed,
    // FigmaEmbed,
    // LightshotEmbed,
    // YouTubeEmbed,
    // EmbedPluginExtension,
    Typography,
    ColorHighlighter,
    SmilieReplacer,
    Code,
    Document,
    Paragraph,
    Text,
    BulletList.configure({
      keepMarks: true,
      keepAttributes: false,
    }),
    OrderedList.configure({
      keepMarks: true,
      keepAttributes: false,
    }),
    // Commands.configure({
    //   suggestion: slashSuggestion({
    //     recordSnap,
    //     openGifModal,
    //     handleFileInput,
    //   }),
    // }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableCell,
    TableHeader,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    CommandEnterShortcut,
  ];

  useEffect(() => {
    const newEditor = new Editor({
      extensions,
      content: valueContent, // Set initial content here
      editable: isEditable, // Make the editor read-only
      onUpdate: ({ editor }) => {
        setValueContent?.(editor.getHTML());
      },
    });
    setEditor(newEditor);

    // Cleanup editor instance when component unmounts
    return () => {
      newEditor.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On URL added for selected text
  const onSubmitUrlForm = useCallback(
    (e: React.SyntheticEvent) => {
      if (editor) {
        e.preventDefault();
        if (urlValue === null) {
          return;
        }
        if (urlValue === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink().run();
          return;
        }
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: urlValue })
          .run();
        setUrlValue('');
        setIsUrlOpen(false);
      }
    },
    [editor, urlValue],
  );

  // On redirect to added URL
  const onClickRedirectToUrl = useCallback(() => {
    if (!isEmpty(urlValue)) window.open(urlValue, '_blank');
  }, [urlValue]);

  // On Click Remove URL
  const onClickRemoveUrl = useCallback(() => {
    if (editor) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      setUrlValue('');
      setIsUrlOpen(false);
    }
  }, [editor]);

  // toggle dropdown
  const toggleDropdown = useCallback(() => {
    setDropdownOpen(!isDropdownOpen);
  }, [isDropdownOpen]);

  // On Click Set link tooltip icon
  const setLink = useCallback(() => {
    if (editor) {
      const previousUrl = editor.getAttributes('link').href;
      setUrlValue(previousUrl ? previousUrl : '');
      setIsUrlOpen(true);
    } else {
      console.warn('Editor is null');
    }
  }, [editor]);

  return (
    <div>
      {editor &&
        (isUrlOpen ? (
          <>
            <BubbleMenu
              editor={editor}
              tippyOptions={{
                duration: 50,
                onHide: () => {
                  // dispatch(setIsBubbleMenuOpen(false));
                  setUrlValue('');
                  setIsUrlOpen(false);
                },
                onShow: () => {
                  // dispatch(setIsBubbleMenuOpen(true));
                },
              }}
              shouldShow={({ editor }) => {
                // Only show if there is text selected and it's not an image
                const isImage = editor.isActive('image');
                const { from, to } = editor.state.selection;
                const hasSelection = from !== to;
                return hasSelection && !isImage;
              }}
            >
              <div className='link-menu'>
                <form onSubmit={onSubmitUrlForm}>
                  <input
                    placeholder='Enter URL'
                    value={urlValue}
                    onChange={(e) => {
                      setUrlValue(e.target.value);
                    }}
                  />
                </form>
                <div className='line-div' />
                <div className='icon-div' onClick={onClickRedirectToUrl}>
                  <SVGIcon
                    name='share-link'
                    width='18px'
                    height='18px'
                    viewBox='0 0 18 18'
                    stroke='var(--text-secondary)'
                  />
                </div>
                <div className='icon-div' onClick={onClickRemoveUrl}>
                  <SVGIcon
                    name='delete-icon'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='var(--text-secondary)'
                  />
                </div>
              </div>
            </BubbleMenu>
          </>
        ) : (
          <>
            <BubbleMenu
              editor={editor}
              tippyOptions={{
                duration: 50,
                onHide: () => {
                  // dispatch(setIsBubbleMenuOpen(false));
                },
                onShow: () => {
                  // dispatch(setIsBubbleMenuOpen(true));
                },
              }}
              shouldShow={({ editor }) => {
                // Only show if there is text selected and it's not an image
                const isImage = editor.isActive('image');
                const { from, to } = editor.state.selection;
                const hasSelection = from !== to;
                return hasSelection && !isImage;
              }}
            >
              <div className='bubble-menu'>
                <button
                  ref={buttonRef}
                  onClick={toggleDropdown}
                  className='heading-dropdown'
                >
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className={`heading-dropdown-menu ${dropdownPosition}`}
                    >
                      <button
                        onClick={() => {
                          editor.chain().focus().setHeading({ level: 1 }).run();
                          setDropdownOpen(false);
                        }}
                      >
                        Huge
                      </button>
                      <button
                        onClick={() => {
                          editor.chain().focus().setHeading({ level: 2 }).run();
                          setDropdownOpen(false);
                        }}
                      >
                        Large
                      </button>
                      <button
                        onClick={() => {
                          editor.chain().focus().setParagraph().run();
                          setDropdownOpen(false);
                        }}
                      >
                        Normal
                      </button>
                      <button
                        onClick={() => {
                          editor.chain().focus().setHeading({ level: 4 }).run();
                          setDropdownOpen(false);
                        }}
                      >
                        Small
                      </button>
                    </div>
                  )}
                  <SVGIcon
                    name='Heading-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                  />
                  <SVGIcon
                    name='dropdown-icon'
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                  />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <SVGIcon
                    name='bold-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                  />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <SVGIcon
                    name='italic-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                  />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <SVGIcon
                    name='underline-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                  />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                  <SVGIcon
                    name='strikethrough-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                  />
                </button>

                <button
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                >
                  <SVGIcon
                    name='blockquote-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                  />
                </button>
                <button onClick={setLink}>
                  <SVGIcon
                    name='link-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                  />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleCode().run()}
                >
                  <SVGIcon
                    name='inline-code-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                  />
                </button>
                {/* <button
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                  <SVGIcon
                    name='code-block-icon'
                     width='12'
                       height='12'
                         viewBox='0 0 12 12'
                  
                  />
                </button> */}
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                >
                  <SVGIcon
                    name='bullet-list-icon'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                  />
                </button>
              </div>
            </BubbleMenu>
          </>
        ))}
      {/* {currentCell && <TableToolbar editor={editor} />} */}
      <EditorContent editor={editor} />
    </div>
  );
}

export default TiptapEditor;
