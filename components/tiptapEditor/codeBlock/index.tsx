import React, { useCallback, useRef } from 'react';
import {
  NodeViewWrapper,
  NodeViewContent,
  ReactNodeViewRenderer,
} from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js'; // Import Highlight.js

// NodeView Component
const CodeBlockWithDropdown: React.FC<any> = ({
  node,
  updateAttributes,
  extension,
}) => {
  const languageRef = useRef(node.attrs.language || 'plaintext'); // Default to plaintext
  const languageOptions = [
    'Auto Detect',
    'bash',
    'cpp',
    'csharp',
    'clojure',
    'dart',
    'diff',
    'elixir',
    'graphql',
    'go',
    'haskell',
    'html',
    'java',
    'javascript',
    'json',
    'kotlin',
    'markdown',
    'ocaml',
    'perl',
    'php',
    'plaintext',
    'python',
    'r',
    'ruby',
    'rust',
    'css',
    'swift',
    'sql',
    'toml',
    'typescript',
    'yaml',
  ];

  const languageMapping: Record<string, string> = {
    vbscript: 'kotlin',
    pgsql: 'javascript',
    angelscript: 'typescript',
    xml: 'html',
    prolog: 'json',
    plaintext: 'plaintext',
    shell: 'bash',
    fsharp: 'graphql',
    'php-template': 'php',
    n1ql: 'sql',
    arduino: 'java',
    ini: 'toml',
    ceylon: 'swift',
    stylus: 'python',
    lisp: 'clojure',
    livescript: 'haskell',
    clean: 'markdown',
    routeros: 'ruby',
  };

  const getCorrectedLanguage = (detected: string) => {
    return languageOptions.includes(detected)
      ? detected
      : languageMapping[detected] || 'plaintext';
  };

  // const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const newLanguage = event.target.value;

  //   if (newLanguage === 'Auto Detect') {
  //     // Trigger auto-detection logic
  //     const codeContent = node.textContent || ''; // Get the current code content
  //     const detectedLanguage = hljs.highlightAuto(codeContent).language;
  //     const correctedLanguage = getCorrectedLanguage(detectedLanguage || 'plaintext');

  //     languageRef.current = correctedLanguage;
  //     updateAttributes({ language: correctedLanguage });
  //   } else {
  //     languageRef.current = newLanguage;
  //     updateAttributes({ language: newLanguage });
  //   }
  // };

  const handlePaste = (event: React.ClipboardEvent) => {
    const pastedContent = event.clipboardData.getData('text');
    if (!pastedContent) return;

    // Detect language using Highlight.js
    const detectedLanguage = hljs.highlightAuto(pastedContent).language;
    const correctedLanguage = getCorrectedLanguage(
      detectedLanguage || 'plaintext',
    );

    // Update language if it's different
    if (languageRef.current !== correctedLanguage) {
      languageRef.current = correctedLanguage;
      updateAttributes({ language: correctedLanguage });
    }
  };

  const copyText = useCallback(async () => {
    const codeContent = node.textContent || '';
    await navigator.clipboard.writeText(codeContent);
  }, [node.textContent]);

  return (
    <NodeViewWrapper className='code-block-with-dropdown'>
      <pre>
        <div className='code-block-header'>
          {/* {!isRead && (
            <div className='button-div'>
              <select value={languageRef.current} onChange={handleLanguageChange} className='language-dropdown'>
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === 'Auto Detect' ? 'Auto Detect' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
              <SVGIcon name='dropdown-icon' width='18' height='18' viewBox='0 0 24 24' fill='none' className='icon' />
            </div>
          )} */}
          {/* <div className='copy-icon' onClick={copyText}>
            <SVGIcon
              name='copy-icon'
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
              stroke='var(--text-secondary)'
            />
          </div> */}
        </div>
        <NodeViewContent as='code' onPaste={handlePaste} />
      </pre>
    </NodeViewWrapper>
  );
};

// Extend CodeBlockLowlight to Use Custom NodeView
const CustomCodeBlockLowlight: any = CodeBlockLowlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      isRead: false, // Default value
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockWithDropdown);
  },
});

export default CustomCodeBlockLowlight;
