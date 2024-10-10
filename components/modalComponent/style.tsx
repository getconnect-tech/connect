import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const MainDiv = styled.div`
  background-color: var(--bg-white);
  min-width: 400px;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  &.macro-main-div {
    min-width: 500px;
    max-width: 500px;
  }
  @media screen and (max-width: 449px) {
    min-width: 361px;
  }
  @media screen and (max-width: 320px) {
    min-width: 300px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-bottom: var(--border-main);
`;

export const Title = styled.div`
  ${Typography.body_md_semibold};
  color: var(--text);
`;

export const BottomDiv = styled.form`
  padding: 12px 16px;
  .email-label {
    margin-top: 12px;
  }
  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 8px;
  }
  .label-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    position: relative;
  }
  .icon-div {
    display: flex;
    justify-content: center;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .text-field {
    .input {
      padding: 8px 16px;
    }
    .prosemirror {
      border: var(--border-secondary);
      border-radius: 12px !important;
      padding: 0 16px !important;
      min-height: 195px;
      max-height: 195px;
      overflow: auto;
    }
    .rich-text {
      border: var(--border-main);
      border-radius: 12px;
      .e-richtexteditor .rte-placeholder {
        padding: 8px 16px;
      }
      .e-richtexteditor .e-rte-content .e-content {
        max-height: 160px;
        min-height: 160px;
        margin-bottom: 0;
        padding: 8px 16px;
      }
      .e-richtexteditor .e-toolbar-wrapper {
        background-color: unset;
        border-bottom: none;
      }
      .e-toolbar .e-toolbar-item .e-tbar-btn {
        padding: 6px !important;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        &:hover {
          background-color: var(--bg-surface-secondary);
        }
      }
      .e-toolbar .e-toolbar-item:not(.e-separator) {
        padding: 0;
        min-width: unset;
      }

      .e-toolbar .e-toolbar-items {
        display: flex;
        gap: 8px;
      }
      .e-toolbar .e-toolbar-item .e-tbar-btn :hover {
        background-color: unset;
      }
      .e-toolbar-wrapper {
        ::before {
          font-size: 12px;
          line-height: 12px;
          display: flex;
          align-items: center;
        }
      }
      .e-richtexteditor .e-rte-toolbar .e-toolbar-item.e-active .e-tbar-btn {
        background-color: var(--bg-surface-secondary);
      }
    }
  }
`;

export const Label = styled.div`
  ${Typography.body_md_medium};
  color: var(--text);
  margin-bottom: 4px;
  span {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
  }
`;

export const IconDiv = styled.div`
  background-color: var(--bg-surface-secondary);
  padding: 12px;
  border-radius: 50%;
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  cursor: pointer;
  svg {
    fill: var(--icon);
    &:hover {
      fill: var(--icon-hover);
    }
  }
`;
