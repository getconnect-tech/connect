import styled from 'styled-components';

const EditorDiv = styled.div`
  max-height: 240px;
  min-height: 40px;
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
`;

export { EditorDiv };
