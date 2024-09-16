/* eslint-disable indent */
/* eslint-disable max-len */
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';
interface Props {
  isApplyMsgModel?: boolean;
  isApplyCss?: boolean;
  isPlaceholdercolor?: boolean;
  isInlineToolbar?: boolean;
  isplaceholder?: boolean;
  isScrollbarnone?: boolean;
  isMessageMentionModal?: boolean;
}
const MentionTable = styled.div`
  :hover {
    background-color: var(--bg-surface-secondary);
    cursor: pointer;
  }
  .mentionEmpImage {
    border-radius: 50%;
  }
`;

const MentionList = styled.div`
  padding: 8px 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  .mentionEmpImage {
    border-radius: 50%;
  }
  p {
    margin: 0;
    color: var(--text-text-secondary);
    white-space: nowrap;
  }
`;

const TextMainDiv = styled.div<Props>`
  min-height: 44px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    background-color: transparent !important;
    color: var(--text) !important;
    max-width: 644px;
    width: 100%;
  }
  p {
    margin: 0;
    color: var(--text) !important;
    background-color: transparent !important;
    max-width: 644px;
    width: 100%;
  }
  ul,
  ol {
    color: var(--text) !important;
    background-color: transparent !important;
    max-width: 644px;
    width: 100%;
    margin-left: 20px;
    li {
      ::marker {
        color: var(--text) !important;
        background-color: transparent !important;
      }
    }
  }
  p > span {
    color: var(--text) !important;
    background-color: transparent !important;
    max-width: 644px;
    width: 100%;
  }
  a {
    color: var(--text);
    max-width: 644px;
    width: 100%;
  }
  #inlineRTE_rte-edit-view_options {
    border: var(--border);
    background: var(--bg-white);
  }
  position: relative;
  ${(props) =>
    props.isApplyCss &&
    css`
      > div > div > div {
        min-height: 40px;
      }
      height: 100%;
      min-height: 30px;
      max-height: 642px;
      overflow: scroll;
      ::-webkit-scrollbar {
        display: none;
      }
    `}
  > div > div > span {
    position: absolute;
    pointer-events: none;
    color: var(--text) !important;
    ${Typography.body_md_regular}
    ${(props) =>
      props.isApplyMsgModel &&
      css`
        padding-top: 6px;
        color: var(--text-text-secondary);
      `}
  }
  ${(props) =>
    props.isPlaceholdercolor &&
    css`
      > div > div > span {
        color: var(--text-text-secondary) !important;
        ${Typography.body_md_regular} !important;
        opacity: 1 !important;
      }
    `}
  .name {
    color: var(--text);
  }
  .time {
    color: var(--text-text-secondary);
  }
  .text {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: ${({ theme }) => theme.title};
    text-overflow: ellipsis;
    p {
      margin: 0;
      padding: 0;
      img {
        max-width: 300px;
        max-height: 300px;
        width: auto;
        height: auto;
      }
    }
  }
  .e-img-resize {
    display: none;
  }
  .inlineRTE_imgResize {
    display: none;
  }
  .e-resize,
  .e-img-focus {
    width: 100% !important;
    height: 100% !important;
    border: none !important;
    outline: none !important;
  }
  .e-rte-container {
    border: none;
  }
  .e-richtexteditor .e-rte-content .e-content,
  .e-richtexteditor .e-source-content .e-content {
    min-height: 40px;
    margin-bottom: 4px;
    max-height: 200px;
    overflow: auto;
  }
  .e-richtexteditor .e-rte-content .e-content pre {
    color: var(--text);
    margin: 0;
  }
  .e-rte-table td,
  .e-rte-table th {
    border: var(--border-main);
  }
`;

const Main = styled.div<Props>`
  #inlineRTE_rte-edit-view {
    color: var(--text);
    :focus-visible {
      outline: none;
    }
  }
  .e-richtexteditor.e-rte-tb-expand {
    border: none;
  }
  .e-richtexteditor {
    background: unset !important;
    height: unset !important;
  }
  .e-toolbar {
    background: unset;
  }
  .e-toolbar .e-toolbar-items {
    background: unset;
  }
  .e-richtexteditor.e-rte-tb-expand .e-rte-content,
  .e-richtexteditor.e-rte-tb-expand .e-source-content {
    border-bottom: none;
    border-top-color: var(--border);
  }
  .e-richtexteditor .e-rte-content,
  .e-richtexteditor .e-source-content {
    background: transparent;
  }
  .e-richtexteditor:not(.e-rte-toolbar-enabled) {
    border: none;
  }
  .e-richtexteditor .e-rte-content,
  .e-richtexteditor .e-source-content {
    overflow: unset;
  }

  ${(props) =>
    props.isInlineToolbar &&
    css`
      .e-richtexteditor .rte-placeholder {
        padding: 0;
      }
      .e-richtexteditor .e-rte-content .e-content,
      .e-richtexteditor .e-source-content .e-content {
        padding: 0;
      }
    `}
  ${(props) =>
    props.isScrollbarnone &&
    css`
      .e-richtexteditor .e-rte-content .e-content,
      .e-richtexteditor .e-source-content .e-content {
        ::-webkit-scrollbar {
          display: none;
        }
      }
    `}
  .e-toolbar .e-toolbar-item .e-tbar-btn {
    background: unset;
  }

  .e-toolbar .e-toolbar-item .e-tbar-btn .e-icons {
    color: var(--text-text-secondary);
    :hover {
      color: var(--text);
    }
  }
  .e-richtexteditor.e-rte-tb-expand .e-rte-content,
  .e-richtexteditor.e-rte-tb-expand .e-source-content {
    border-top: none;
  }
  .e-richtexteditor .e-rte-toolbar {
    border-bottom: var(--border-main);
  }
  .e-richtexteditor .e-rte-toolbar .e-toolbar-item .e-tbar-btn:hover .e-icons {
    color: var(--text);
  }
  .e-richtexteditor
    .e-rte-toolbar
    .e-toolbar-item.e-active
    .e-tbar-btn
    .e-icons {
    color: var(--text);
  }
  .e-richtexteditor .e-rte-toolbar .e-toolbar-item.e-active .e-tbar-btn {
    background: var(--bg-surface-secondary-hover);
  }
  .e-toolbar .e-toolbar-item .e-tbar-btn {
    min-height: unset;
    min-width: unset;
    padding: 2px !important;
    :hover {
      background: var(--bg-surface-secondary-hover);
    }
  }
  .e-toolbar .e-toolbar-item:not(.e-separator) {
    padding: 0 6px;
  }
  .e-rte-toolbar .e-undo::before {
    ${Typography.body_md_regular};
  }
  .e-rte-toolbar .e-redo::before {
    ${Typography.body_md_regular};
  }
  &.e-btn-icon .e-undo .e-icons {
    ${Typography.body_sm_regular};
  }
  .e-toolbar .e-toolbar-item.e-overlay {
    background: none;
  }
  .e-toolbar .e-toolbar-item .e-tbar-btn .e-icons.e-btn-icon {
    ${Typography.body_sm_regular};
  }
  #inlineRTE_toolbar_Undo {
    width: 20px !important;
    height: 20px !important;
  }
  #inlineRTE_toolbar_Redo {
    width: 20px !important;
    height: 20px !important;
  }
  .e-dialog {
    background: var(--bg-surface-secondary-hover);
    border: var(--border-main);
    top: 34px !important;
  }
  .e-dialog .e-dlg-header-content {
    border-bottom: var(--border-main);
  }
  .e-dialog .e-footer-content {
    border-top: var(--border-main);
  }
  .e-dlg-content {
    color: var(--text);
  }
  .e-rte-linkcontent .e-rte-label {
    margin-bottom: 6px !important;
  }
  .e-dlg-header {
    color: var(--text);
  }
  input.e-input {
    color: var(--text);
    border: none;
    ::placeholder {
      color: var(--text-text-secondary);
    }
  }
  .e-input:focus:not(.e-success):not(.e-warning):not(.e-error) {
    box-shadow: none;
    border: none;
  }
  .e-checkbox-wrapper .e-label {
    color: var(--text);
  }
  .e-checkbox-wrapper .e-checkbox:focus + .e-frame.e-check {
    box-shadow: unset;
    background-color: var(--brand);
    border-color: var(--border);
  }
  .e-checkbox-wrapper .e-checkbox:focus + .e-frame {
    border-color: var(--border);
    box-shadow: unset;
    background-color: var(--brand);
  }
  .e-checkbox-wrapper:hover .e-frame {
    background-color: var(--bg-surface);
  }
  .e-checkbox-wrapper .e-frame {
    background-color: var(--brand);
    border-color: var(--border);
  }
  .e-richtexteditor .e-rte-content .e-content a {
    color: var(--text-text-secondary);
    text-decoration: underline;
  }
  .e-richtexteditor .e-rte-content .e-content a:hover {
    text-decoration: underline;
  }
  .e-icon-dlg-close {
    color: var(--text);
  }
  .e-dialog .e-btn.e-dlg-closeicon-btn:hover span {
    color: var(--text);
  }
  .e-checkbox-wrapper .e-frame.e-check {
    background-color: var(--brand);
    border-color: var(--border);
  }
  .e-footer-content .e-btn.e-primary.e-flat:not([DISABLED]) {
    background-color: var(--brand);
    border-radius: 36px;
    color: var(--text-white);
    border: var(--border-main);
    :hover {
      border: var(--border-main);
    }
  }
  .e-checkbox-wrapper .e-checkbox:active + .e-frame.e-check {
    background-color: var(--brand);
    box-shadow: unset;
    border-color: var(--brand);
    color: var(--text);
  }
  ${(props) =>
    props.isplaceholder &&
    css`
      .e-richtexteditor .rte-placeholder {
        padding: 5px 0 0 0;
        ${Typography.body_md_regular};
      }
    `}
`;

const DummyDiv = styled.div`
  height: 75px;
`;
const Mentioncomponent = styled(MentionComponent)<Props>`
  #inlineRTE_rte-edit-view_options {
    margin: 0 0 10px;
    padding: 6px 0;
    border-radius: 8px;
    background-color: var(--bg-white);
    box-shadow: var(--shadow-card);
    max-height: 198px;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
    > li {
      height: 34px;
      > div {
        display: inline-flex;
        width: 100%;
      }
    }
  }
  .e-nodata {
    white-space: nowrap;
    color: var(--text);
    background: var(--bg-white);
    border-radius: 8px;
    ${Typography.body_sm_regular};
    padding: 0 12px;
    width: 155px;
    top: 5px;
    height: 44px;
    display: flex;
    align-items: center;
    box-shadow: var(--shadow-card);
    position: absolute;
  }
  .e-active {
    background-color: var(--bg-surface-active);
    cursor: pointer;
  }
  ${(props) =>
    props.isMessageMentionModal &&
    css`
      .e-nodata {
        top: -60px;
      }
    `}
`;

export {
  MentionTable,
  MentionList,
  TextMainDiv,
  Main,
  DummyDiv,
  Mentioncomponent,
};
