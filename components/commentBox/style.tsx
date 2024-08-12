/* eslint-disable indent */
/* eslint-disable max-len */
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import styled, { css } from 'styled-components';
interface Props {
  isShowHover?: boolean;
  loading?: boolean;
  isModel?: boolean;
  isApplyMinHeight?: string;
  isApplyMaxHeight?: string;
  isApplyMargin?: string;
  isApplyMsgModel?: boolean;
  isApplyCss?: boolean;
  isFileCard?: boolean;
  ishideicon?: boolean;
  isPlaceholdercolor?: boolean;
  isActive?: boolean;
  isInlineToolbar?: boolean;
  isplaceholder?: boolean;
  isPaddingright?: boolean;
  isScrollbarnone?: boolean;
  iscommentModelPadding?: boolean;
  isResponsiveMinHeight?: string;
  iscreateTask?: boolean;
  isMessageMentionModal?: boolean;
}
const MentionTable = styled.div`
  :hover {
    background-color: ${({ theme }) => theme.projectnamehover};
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
    color: ${({ theme }) => theme.title};
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    white-space: nowrap;
  }
`;

const FileBoxContainer = styled.div<Props>`
  // max-width: max-content;
  //   display: inline-block;
  //   padding: 10px;
  //   background-color: #DFDCDC;
  //   border: 1px solid #ccc;
  //   border-radius: 5px;
  //   margin: 5px;
  cursor: pointer;
  .file-box {
    max-width: max-content;
    display: inline-flex;
    padding: 5px;
    background-color: ${({ theme }) => theme.secondarybackground};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 8px;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.03);
    align-items: center;
    gap: 4px;
    /* width: 208px; */
    ${(props) =>
      props.isFileCard &&
      css`
        margin: 4px 0;
        padding: 10px 16px;
        gap: 16px;
      `}
  }
  .textarea {
    width: 130px;
  }
  .h4 {
    font-family: 'Inter';
    font-size: 13px;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.title};
    margin: 0 0 4px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    white-space: inherit;
    word-break: break-all;
  }
  .p {
    font-family: 'Inter';
    font-size: 11px;
    line-height: normal;
    font-weight: 400;
    color: ${({ theme }) => theme.lighttext};
    margin: 0;
  }
  .svg {
    width: 32px;
    height: 32px;
  }
  .image-div {
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  @media (max-width: 449px) {
    .p {
      padding-top: 0;
    }
  }
`;

const FileName = styled.span`
  margin-right: 10px;
`;

const CloseButton = styled.span`
  color: ${({ theme }) => theme.lighttext};
  cursor: pointer;
  padding-left: 12px;
`;

const TextMainDiv = styled.div<Props>`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    background-color: transparent !important;
    color: ${({ theme }) => theme.title} !important;
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.title} !important;
    background-color: transparent !important;
  }
  ul,
  ol {
    color: ${({ theme }) => theme.title} !important;
    background-color: transparent !important;
    li {
      ::marker {
        color: ${({ theme }) => theme.title} !important;
        background-color: transparent !important;
      }
    }
  }
  p > span {
    color: ${({ theme }) => theme.title} !important;
    background-color: transparent !important;
  }
  .figma-main-div {
    pointer-events: none;
    -webkit-user-modify: read-only;
    position: relative;
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 8px;
    padding: 12px;
    background-color: ${({ theme }) => theme.secondarybackground};
    border: 1px solid ${({ theme }) => theme.primary};
    width: fit-content;
  }
  .figma-desc-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .figma-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }
  .figma-link-div {
    pointer-events: all !important;
    padding: 5px 16px;
    background-color: ${({ theme }) => theme.secondarybackground};
    color: ${({ theme }) => theme.title};
    border: 1px solid ${({ theme }) => theme.border};
    cursor: pointer;
    text-decoration: none;
    border-radius: 36px;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    white-space: nowrap;
    &:hover {
      background-color: ${({ theme }) => theme.background};
      border-radius: 36px;
    }
  }
  .figma-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
  .figma-description {
    color: ${({ theme }) => theme.title};
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
  }
  .figma-filename {
    color: ${({ theme }) => theme.lighttext};
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
  }
  .figma-icon {
    width: 24px;
    height: 24px;
  }
  .figma-preview-image {
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.border};
    max-width: 100%;
    width: auto;
    max-height: 419px;
    height: auto;
    margin: 0 auto;
    display: flex;
  }
  .figma-right-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
  .figma-animation {
    height: 24px;
    display: flex;
    .refresh-icon-spin {
      animation-name: spin;
      animation-duration: 1000ms;
      animation-iteration-count: infinite;

      -webkit-animation-name: spin;
      -webkit-animation-duration: 1000ms;
      -webkit-animation-iteration-count: infinite;
    }
    @-ms-keyframes spin {
      from {
        -ms-transform: rotate(0deg);
      }
      to {
        -ms-transform: rotate(360deg);
      }
    }
    @-moz-keyframes spin {
      from {
        -moz-transform: rotate(0deg);
      }
      to {
        -moz-transform: rotate(360deg);
      }
    }
    @-webkit-keyframes spin {
      from {
        -webkit-transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  .refresh-icon {
    width: 18px;
    height: 18px;
    max-width: 100%;
    max-height: 18px;
    cursor: pointer;
    margin: 3px;
  }

  a {
    color: ${({ theme }) => theme.description};
  }

  #inlineRTE_rte-edit-view_options {
    border: ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.inputBackground};
  }
  position: relative;
  ${(props) =>
    props.isApplyCss &&
    css`
      > div > div > div {
        min-height: 100px;
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
    color: ${({ theme }) => theme.description} !important;
    font-size: 15px;
    ${(props) =>
      props.isApplyMsgModel &&
      css`
        padding-top: 6px;
        color: ${({ theme }) => theme.lighttext};
      `}
  }
  ${(props) =>
    props.isPlaceholdercolor &&
    css`
      > div > div > span {
        color: ${({ theme }) => theme.modalplaceholder} !important;
        font-size: 15px !important;
        font-weight: 400;
        line-height: 18px !important;
        opacity: 1 !important;
      }
    `}
  .screen-recording-custom-main-div {
    -webkit-user-modify: read-only;
    border: 1px solid ${({ theme }) => theme.primary};
    border-radius: 8px;
    padding: 8px;
    max-width: 354px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    background-color: ${({ theme }) => theme.secondarybackground};
  }
  .screen-recording-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .e-rte-video .e-video-inline {
    width: 355px !important;
  }
  .screen-recording-name {
    color: ${({ theme }) => theme.title};
    font-family: 'Inter';
    font-size: 12px;
    font-weight: 500;
    line-height: 150%;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .screen-recording-right-div {
    display: flex;
    gap: 12px;
  }
  .open-video-icon {
    max-width: 100%;
    max-height: 100%;
  }
  .video-more-icon {
    max-width: 100%;
    max-height: 100%;
  }
  .inbox-video {
    width: 353px;
    height: auto;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.border};
  }
  .screen-recording-animation {
    width: 16px;
    height: 16px;
  }
  .screen-recording-more {
    width: 16px;
    height: 16px;
  }
  .inbox-image {
    position: relative;
  }
  .video-icon {
    position: absolute;
    top: 45%;
    left: 45%;
  }
  .prnt-desc-div {
    display: flex;
    gap: 2px;
    align-items: center;
  }
  .prnt-icon {
    margin: 0;
  }
  .prnt-url-link {
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    font-family: 'Inter';
    color: ${({ theme }) => theme.description};
  }
  .prnt-text {
    line-height: 18px;
    padding: 0 4px;
    :hover {
      background-color: ${({ theme }) => theme.projectnamehover};
      border-radius: 4px;
    }
  }
  .prnt-preview-main-div {
    -webkit-user-modify: read-only;
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: fit-content;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.primary};
    padding: 7px;
    background-color: ${({ theme }) => theme.secondarybackground};
    position: relative;
    z-index: 9;
  }
  .print-screen {
    border-radius: 6px;
    max-width: 100%;
    width: auto;
    max-height: 200px;
    height: auto;
    display: flex;
    background: #d9d9d9;
    box-shadow: 0px 1.333px 10px 0px rgba(0, 0, 0, 0.03);
    margin: 0 auto;
    /* border: 1px solid ${({ theme }) => theme.border}; */
  }
  .threaddiv {
    padding: 6px 8px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.tableheader};
    width: 100%;
    max-width: fit-content;
  }
  .content {
    display: flex;
    flex-direction: row;
    gap: 9px;
  }
  .line {
    width: 1px;
    background-color: ${({ theme }) => theme.modalplaceholder};
    border: 1px solid ${({ theme }) => theme.modalplaceholder};
    height: auto;
    border-radius: 3px;
  }
  .rightdiv {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .header {
    display: flex;
    flex-direction: row;
    gap: 50px;
    justify-content: space-between;
  }
  .leftheader {
    display: flex;
    flex-direction: row;
    gap: 9px;
    align-items: center;
  }
  .rightheader {
    cursor: pointer;
    height: 18px;
    .svgicon {
      stroke: ${({ theme }) => theme.title};
      fill: ${({ theme }) => theme.title};
    }
    :hover {
      background-color: ${({ theme }) => theme.projectnamehover};
      border-radius: 4px;
    }
  }
  .name {
    color: ${({ theme }) => theme.title};
    font-size: 13px;
    font-weight: 600;
  }
  .time {
    color: ${({ theme }) => theme.lighttext};
    font-size: 13px;
    font-weight: 400;
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
      font-size: 13px;
      margin: 0;
      padding: 0;
      font-weight: 500;
      line-height: 16px;
      img {
        max-width: 300px;
        max-height: 300px;
        width: auto;
        height: auto;
        @media (max-width: 449px) {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
        }
      }
    }
  }
  .imagediv {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
  }
  .filetext {
    color: ${({ theme }) => theme.title};
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    margin-top: 2px;
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
  .video-icon {
    width: 30px !important;
    height: 30px !important;
  }
  .prnt-icon {
    width: 20px !important;
    height: 20px !important;
  }
  .e-richtexteditor .e-rte-content .e-content pre {
    color: ${({ theme }) => theme.title};
    margin: 0;
  }
  .e-rte-table td,
  .e-rte-table th {
    border: 1px solid ${({ theme }) => theme.border};
  }
  @media (max-width: 449px) {
    .screen-recording-name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-break: break-all;
    }
    .e-rte-image.e-imginline {
      padding: 0;
    }
    .open-video-icon {
      margin-bottom: 3px;
    }
    .video-more-icon {
      margin-bottom: 3px;
    }
    .figma-main-div {
      padding: 8px;
      gap: 6px;
      .ant-image .ant-image-img {
        border-radius: 6px !important;
      }
    }
    .figma-icon {
      width: 18px;
      height: 18px;
      margin: 0;
    }
    .figma-header {
      flex-direction: column;
      align-items: baseline;
      gap: 6px;
    }
    .figma-text {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
    .figma-desc-div {
      align-items: flex-start;
    }
    .figma-link-div {
      margin-left: 11px;
    }
    .refresh-icon {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 0;
    }
    .text {
      word-break: break-all;
      p {
        img {
          width: 100%;
          border-radius: 4px;
        }
      }
    }
    .header {
      gap: 12px;
    }
    .threaddiv {
      max-width: -webkit-fill-available;
    }
    .rightdiv {
      gap: 4px;
      width: 100%;
    }
    .screen-recording-custom-main-div {
      max-width: -webkit-fill-available;
    }
  }
`;

const FooterIcon = styled.div<Props>`
  display: flex;
  align-items: center;
  border-radius: 5px;

  ${(props) =>
    props.isShowHover &&
    css`
      :hover {
        background: #ededed;
      }
    `}
  ${(props) =>
    props.loading &&
    css`
      pointer-events: none;
    `}
      ${(props) =>
    props.isModel &&
    css`
      position: absolute;
      right: 118px;
      bottom: -57px;
    `}
    .svg {
    fill: ${({ theme }) => theme.lighttext};
  }
  ${(props) =>
    props.iscreateTask &&
    css`
      display: none;
    `}
  &:hover svg path {
    fill: ${({ theme }) => theme.title};
  }
  @media (max-width: 449px) {
    .svg {
      padding: 0;
    }
    ${(props) =>
      props.isModel &&
      css`
        width: max-content;
        bottom: -87px;
        left: 0;
      `}
  }
  .fillColor {
    fill: ${({ theme }) => theme.lighttext};
    cursor: pointer;
  }
  .fill-Color {
    stroke: ${({ theme }) => theme.lighttext};
  }
  .attachment-fill-Color {
    fill: ${({ theme }) => theme.lighttext};
    cursor: pointer;
  }
  ${(props) =>
    props.isActive &&
    css`
      svg path {
        fill: ${({ theme }) => theme.title};
      }
    `}
`;
const SvgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  .svg {
    path {
      fill: ${({ theme }) => theme.lighttext};
    }
  }
  :hover {
    background: ${({ theme }) => theme.projectnamehover};
    border-radius: 50%;
    .svg {
      path {
        fill: ${({ theme }) => theme.title};
      }
    }
  }
`;
const Icon = styled.div<{ disable: boolean }>`
  display: flex;
  align-items: center;
  ${(props) =>
    props.disable &&
    css`
      pointer-events: none;
    `}
`;

const FooterIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  .svg-icon {
    cursor: pointer;
  }
  .EmojiPickerReact .epr-header .epr-header-overlay {
    padding: 10px;
  }
  .dropdown-content {
    position: relative;
    top: auto;
    bottom: 0;
    z-index: 999;
  }
  .ant-dropdown .ant-dropdown-menu {
    background: ${({ theme }) => theme.secondarybackground};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.border};
    margin: 0px;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  }
  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item {
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    color: ${({ theme }) => theme.title};
  }
  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item:hover {
    background: ${({ theme }) => theme.projectnamehover};
    border-radius: 0;
  }
`;
const Line = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  height: 20px;
`;
const Top = styled.div<Props>`
  height: 14px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  ${(props) =>
    props.ishideicon &&
    css`
      display: none;
    `}
`;

const First = styled.div<Props>`
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .fill-color {
    fill: ${({ theme }) => theme.projectnamehover};
    :hover {
      fill: ${({ theme }) => theme.slider};
      path {
        stroke: ${({ theme }) => theme.title};
      }
    }
  }
  .svg {
    fill: ${({ theme }) => theme.lighttext};
  }
  &:hover svg path {
    fill: ${({ theme }) => theme.title};
  }
`;
const Main = styled.div<Props>`
  #inlineRTE_rte-edit-view {
    color: ${({ theme }) => theme.title};

    :focus-visible {
      outline: none;
    }
  }

  ${(props) =>
    props.isApplyMsgModel &&
    css`
      padding-right: 118px;
      @media (max-width: 449px) {
        padding-right: 0;
        .e-richtexteditor:not(.e-rte-toolbar-enabled) {
          padding-right: 108px;
        }
        #inlineRTE_rte-edit-view {
          padding-right: 0 !important;
        }
      }
    `}
  ${(props) =>
    props.isApplyMinHeight &&
    css`
      #inlineRTE_rte-edit-view {
        min-height: ${props.isApplyMinHeight}px;
      }
    `}
    ${(props) =>
    props.isPaddingright &&
    css`
      #inlineRTE_rte-edit-view {
        padding-right: 40px !important;
        padding-bottom: 5px;
      }
    `}
    ${(props) =>
    props.isApplyMaxHeight &&
    css`
      #inlineRTE_rte-edit-view {
        max-height: ${props.isApplyMaxHeight}px;
        min-height: ${props.isApplyMinHeight}px;
        padding-right: 28px;
        overflow-y: auto;
        margin-right: ${props.isApplyMargin}px;
        word-break: break-word;
        &::-webkit-scrollbar {
          background-color: ${({ theme }) =>
            theme.secondarybackground} !important;
          width: 6px !important;
          /* margin-bottom: 4px !important;
          border-radius: 7px !important;
          min-height: 20px !important; */
        }
        &::-webkit-scrollbar-thumb {
          background-color: ${({ theme }) => theme.threedot} !important;
          width: 6px !important;
          margin-bottom: 4px !important;
          border-radius: 7px !important;
          min-height: 20px !important;
        }
      }
    `}

    .e-richtexteditor:not(.e-rte-toolbar-enabled) .e-rte-content {
    /* margin-top: 20px !important; */
  }
  .e-richtexteditor.e-rte-tb-expand {
    border: none;
  }
  .e-richtexteditor .e-toolbar-wrapper {
    background: unset !important;
    height: unset !important;
  }
  .e-toolbar {
    background: unset;
  }
  .e-toolbar .e-toolbar-items {
    background: unset;
    @media (max-width: 449px) {
      width: 100%;
      justify-content: space-between;
    }
  }
  .e-richtexteditor.e-rte-tb-expand .e-rte-content,
  .e-richtexteditor.e-rte-tb-expand .e-source-content {
    border-bottom: none;
    border-top-color: ${({ theme }) => theme.border};
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
    color: ${({ theme }) => theme.description};
    :hover {
      color: ${({ theme }) => theme.title};
    }
  }
  .e-richtexteditor.e-rte-tb-expand .e-rte-content,
  .e-richtexteditor.e-rte-tb-expand .e-source-content {
    border-top: none;
  }
  .e-richtexteditor .e-rte-toolbar {
    border-style: none none solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.border};
  }
  .e-richtexteditor .e-rte-toolbar .e-toolbar-item .e-tbar-btn:hover .e-icons {
    color: ${({ theme }) => theme.title};
  }
  .e-richtexteditor
    .e-rte-toolbar
    .e-toolbar-item.e-active
    .e-tbar-btn
    .e-icons {
    color: ${({ theme }) => theme.title};
  }
  .e-richtexteditor .e-rte-toolbar .e-toolbar-item.e-active .e-tbar-btn {
    background: ${({ theme }) => theme.projectnamehover};
  }
  .e-toolbar .e-toolbar-item .e-tbar-btn {
    min-height: unset;
    min-width: unset;
    padding: 2px !important;
    :hover {
      background: ${({ theme }) => theme.projectnamehover};
    }
  }

  .e-richtexteditor .e-rte-toolbar.e-rte-tb-fixed.e-show,
  .e-richtexteditor
    .e-rte-toolbar.e-toolbar.e-extended-toolbar.e-rte-tb-fixed.e-show {
    @media (max-width: 449px) {
      display: none;
    }
  }
  .e-toolbar .e-toolbar-item:not(.e-separator) {
    padding: 0 6px;
  }
  .e-rte-toolbar .e-undo::before {
    font-size: 14px;
  }

  .e-rte-toolbar .e-redo::before {
    font-size: 14px;
  }
  &.e-btn-icon .e-undo .e-icons {
    line-height: 14px !important;
  }
  .e-toolbar .e-toolbar-item.e-overlay {
    background: none;
  }
  .e-toolbar .e-toolbar-item .e-tbar-btn .e-icons.e-btn-icon {
    line-height: 16px;
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
    background: ${({ theme }) => theme.secondarybackground};
    border: 1px solid ${({ theme }) => theme.border};
    top: 34px !important;
  }
  .e-dialog .e-dlg-header-content {
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
  .e-dialog .e-footer-content {
    border-top: 1px solid ${({ theme }) => theme.border};
  }
  .e-dlg-content {
    background: ${({ theme }) => theme.secondarybackground};
    color: ${({ theme }) => theme.title};
  }
  .e-rte-linkcontent .e-rte-label {
    margin-bottom: 6px !important;
  }
  .e-dlg-header {
    color: ${({ theme }) => theme.title};
  }
  input.e-input {
    background: ${({ theme }) => theme.secondarybackground};
    color: ${({ theme }) => theme.title};
    border: 1px solid ${({ theme }) => theme.border};
    ::placeholder {
      color: ${({ theme }) => theme.inputplaceholder};
    }
  }
  .e-input:focus:not(.e-success):not(.e-warning):not(.e-error) {
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.primary};
  }

  .e-checkbox-wrapper .e-label {
    color: ${({ theme }) => theme.title};
  }
  .e-checkbox-wrapper .e-checkbox:focus + .e-frame.e-check {
    box-shadow: unset;
    background-color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
  }
  .e-checkbox-wrapper .e-checkbox:focus + .e-frame {
    border-color: ${({ theme }) => theme.checkbox};
    box-shadow: unset;
    background-color: ${({ theme }) => theme.inputBackground};
  }
  .e-checkbox-wrapper:hover .e-frame {
    background-color: ${({ theme }) => theme.inputBackground};
  }
  .e-checkbox-wrapper .e-frame {
    background-color: ${({ theme }) => theme.inputBackground};
    border-color: ${({ theme }) => theme.checkbox};
  }
  .e-richtexteditor .e-rte-content .e-content a {
    color: ${({ theme }) => theme.description};
    text-decoration: underline;
  }
  .e-richtexteditor .e-rte-content .e-content a:hover {
    text-decoration: underline;
  }
  .e-icon-dlg-close {
    color: ${({ theme }) => theme.title};
  }
  .e-dialog .e-btn.e-dlg-closeicon-btn:hover span {
    color: ${({ theme }) => theme.title};
  }
  .e-checkbox-wrapper .e-frame.e-check {
    background-color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
  }
  .e-footer-content .e-btn.e-primary.e-flat:not([DISABLED]) {
    background-color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
    border-radius: 36px;
    color: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.primary};

    :hover {
      background-color: ${({ theme }) => theme.primaryhover};
      border: 1px solid ${({ theme }) => theme.primaryhover};
    }
  }
  .e-btn {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    padding: 8px 20px;
  }
  .e-footer-content .e-btn.e-flat:not([DISABLED]) {
    background-color: ${({ theme }) => theme.secondarybackground};
    color: ${({ theme }) => theme.title};
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 36px;

    &:hover {
      background-color: ${({ theme }) => theme.background};
    }
  }
  .e-checkbox-wrapper .e-checkbox:active + .e-frame.e-check {
    background-color: ${({ theme }) => theme.primary};
    box-shadow: unset;
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.title};
  }
  ${(props) =>
    props.isplaceholder &&
    css`
      .e-richtexteditor .rte-placeholder {
        padding: 5px 0 0 0;
        font-size: 15px !important;
        font-weight: 400;
        line-height: 18px;
      }
    `}
  @media  (max-width: 449px) {
    ${(props) =>
      props.isResponsiveMinHeight &&
      css`
        #inlineRTE_rte-edit-view {
          min-height: ${props.isResponsiveMinHeight}px;
        }
      `}
  }
`;
const Footerdiv = styled.div<Props>`
  ${(props) =>
    props.isApplyMsgModel &&
    css`
      position: absolute;
      right: 8px;
      bottom: 3px;
      @media (max-width: 449px) {
        bottom: 7px;
      }
    `}
  ${(props) =>
    props.isInlineToolbar &&
    css`
      padding: 0 16px;
    `}
`;
const Second = styled.div<Props>`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover svg path {
    fill: ${({ theme }) => theme.title};
  }
  ${(props) =>
    props.isActive &&
    css`
      svg path {
        fill: ${({ theme }) => theme.title};
      }
    `}
`;
const Last = styled.div<Props>`
  width: 18px;
  height: 18px;
  &:hover svg path {
    stroke: ${({ theme }) => theme.title};
  }
`;

const Record = styled.div<Props>`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover .svg-icon {
    path.stroke-color {
      stroke: #5fbb25;
    }
    path.fill-color {
      fill: #5fbb25;
    }
  }
`;
const Stop = styled.div<Props>`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  .stop-icon {
    path.stroke-color {
      stroke: ${({ theme }) => theme.redtext};
    }
    path.both-color {
      stroke: ${({ theme }) => theme.redtext};
      fill: ${({ theme }) => theme.redtext};
    }
  }
`;
const Third = styled.div`
  width: 18px;
  height: 18px;
  &:hover svg path {
    stroke: ${({ theme }) => theme.title};
  }
`;

const Emojis = styled.div`
  /* position: absolute;
  top: auto;
  bottom: 20px;
  z-index: 999;
  right: 0; */
  aside.EmojiPickerReact.epr-main {
    border: 1px solid ${({ theme }) => theme.border} !important;
    border-radius: 12px !important;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08) !important;
  }
  .EmojiPickerReact {
    background-color: ${({ theme }) => theme.secondarybackground};
  }
  .EmojiPickerReact .epr-category-nav > button.epr-cat-btn {
    background-image: url(https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/Template_images%2Femoji_svg_ref.svg?alt=media&token=7fd738ed-1e10-4c18-8f91-a0c4b6c7ef5f);
    /* background-position: 0 0; */
  }

  .EmojiPickerReact .epr-search-container input.epr-search {
    padding: 4px 8px !important;
    background-color: ${({ theme }) => theme.secondarybackground} !important;
    border-radius: 6px !important;
    border: 1px solid ${({ theme }) => theme.border} !important;
    color: ${({ theme }) => theme.title} !important;
    font-size: 12px !important;
    font-weight: 500 !important;
    line-height: normal !important;
    font-family: 'Inter' !important;
    height: 25px !important;
  }
  .EmojiPickerReact li.epr-emoji-category > .epr-emoji-category-label {
    font-size: 11px !important;
    font-weight: 600 !important;
    line-height: normal !important;
    font-family: 'Inter' !important;
    height: auto !important;
    padding-bottom: 6px !important;
    padding-top: 6px !important;
    color: ${({ theme }) => theme.lighttext}!important;
  }
  .EmojiPickerReact li.epr-emoji-category > .epr-emoji-category-label {
    background-color: ${({ theme }) => theme.secondarybackground};
  }
  .EmojiPickerReact button.epr-emoji:hover > * {
    border-radius: 6px !important;
    background-color: ${({ theme }) => theme.projectnamehover} !important;
  }
  .epr-emoji-list {
    border-right: 1px solid ${({ theme }) => theme.border} !important;
  }
  .EmojiPickerReact .epr-search-container input.epr-search::placeholder {
    color: ${({ theme }) => theme.modalplaceholder} !important;
  }
  .EmojiPickerReact .epr-body::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.threedot} !important;
    border-radius: 7px !important;
    min-height: 20px !important;
  }
  .EmojiPickerReact .epr-search-container input.epr-search:focus {
    border: 1px solid ${({ theme }) => theme.primary} !important;
  }
  .EmojiPickerReact button.epr-emoji:focus > * {
    border-radius: 6px !important;
    background-color: ${({ theme }) => theme.projectnamehover} !important;
  }
`;
const DummyDiv = styled.div`
  height: 75px;
`;
const Mentioncomponent = styled(MentionComponent)<Props>`
  #inlineRTE_rte-edit-view_options {
    margin: 0 0 10px;
    padding: 6px 0;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.secondarybackground};
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
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
    color: ${({ theme }) => theme.title};
    background: ${({ theme }) => theme.secondarybackground};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 8px;
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    padding: 0 12px;
    width: 155px;
    margin-left: -14px;
    top: 10px;
    height: 44px;
    display: flex;
    align-items: center;
  }
  .e-active {
    background-color: ${({ theme }) => theme.projectnamehover};
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

const FileIconDiv = styled.div`
  position: relative;
  .file-text {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 25%;
    left: 25%;
    width: 50%;
    font-weight: 700;
    color: ${({ theme }) => theme.title};
  }
`;

const Uploaddiv = styled.div<Props>`
  color: ${({ theme }) => theme.title};
  ${(props) =>
    props.iscommentModelPadding &&
    css`
      padding-left: 16px;
    `}
`;
export {
  MentionTable,
  MentionList,
  FileBoxContainer,
  FileName,
  CloseButton,
  TextMainDiv,
  FooterIcon,
  Icon,
  FooterIcons,
  Line,
  Top,
  First,
  Main,
  Footerdiv,
  Second,
  Last,
  Emojis,
  Third,
  DummyDiv,
  Mentioncomponent,
  Record,
  Stop,
  FileIconDiv,
  Uploaddiv,
  SvgDiv,
};
