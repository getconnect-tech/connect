import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  Schema,
  DOMParser as ProseMirrorDOMParser,
  DOMSerializer,
} from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';

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

  useEffect(() => {
    if (!editorRef.current || !contentRef.current) return;

    // Define schema with list nodes
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks,
    });

    // Initialize the EditorView when the component mounts
    const view = new EditorView(editorRef.current, {
      state: EditorState.create({
        doc: ProseMirrorDOMParser.fromSchema(mySchema).parse(
          contentRef.current,
        ),
        plugins: exampleSetup({ schema: mySchema }),
      }),
      // Capture the update event to handle editor state changes
      dispatchTransaction(transaction) {
        const newState = view.state.apply(transaction);
        view.updateState(newState);

        // Convert the editor content to HTML and update the state
        const contentNode = view.state.doc;
        const htmlString = convertNodeToHTML(contentNode, mySchema);
        setValueContent(htmlString);
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
        // setEditorHTML(''); // Clear the HTML state as well
        setValueContent('');
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
