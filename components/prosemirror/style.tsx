import styled from 'styled-components';

const EditorDiv = styled.div`
  max-height: 240px;
  min-height: 40px;
  width: 100%;
  font-size: 14px !important;
  color: var(--text) !important;
  font-family: unset !important;
  white-space: normal;
  p {
    word-break: break-word;
  }
  &:focus-visible {
    outline: none !important;
  }
  .ProseMirror.ProseMirror-example-setup-style {
    max-height: 240px;
    min-height: 40px;
    overflow: auto;
    &:focus-visible {
      outline: none !important;
    }
  }
  .ProseMirror ul {
    display: inline-block;
    margin-left: 20px;
  }
  .ProseMirror ol {
    display: inline-block;
    margin-left: 20px;
  }
`;

export { EditorDiv };
