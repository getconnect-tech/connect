import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  min-width: 500px;
  width: 100%;
  border-radius: 12px;
  background-color: ${colors.bg_white};
  gap: 12px;
`;

export const Header = styled.div`
  display: flex;
  padding: 10px 16px;
  ${Typography.body_md_semibold}
  color: ${colors.text};
  border-bottom: 1px solid ${colors.border};
`;

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  gap: 12px;
`;

export const TextField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  .input {
    padding: 8px 16px;
  }
  .rich-text {
    border: 1px solid ${colors.border};
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
        background-color: ${colors.bg_surface_secondary};
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
      background-color: ${colors.bg_surface_secondary};
    }
  }
`;

export const Label = styled.div`
  ${Typography.body_md_medium}
  color: ${colors.text};
`;

export const BottomDiv = styled.div`
  display: flex;
  gap: 8px;
  justify-content: end;
  padding: 8px 16px 12px;
`;
