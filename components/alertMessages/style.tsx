import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

export const AlertmessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 111;
  left: 50%;
  transform: translateX(-50%);
  top: 12px;
  gap: 8px;
  margin: auto;
  position: absolute;
  .alert-div {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    .icon-class {
      display: none;
    }
    &:hover .icon-class {
      display: inline-flex;
    }
  }

  .ant-alert {
    padding: 6px !important;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
  }

  .ant-alert-error {
    border: 1px solid ${colors.error_border};
    background-color: ${colors.fill_danger_secondary};
    .ant-alert-icon {
      color: ${colors.fill_danger};
    }
  }

  .ant-alert-success {
    border: 1px solid ${colors.success_border};
    background-color: ${colors.fill_success_seconday};
    .ant-alert-icon {
      color: ${colors.fill_success};
    }
  }

  .ant-alert-warning {
    border: 1px solid ${colors.warning_border};
    background-color: ${colors.fill_warning_secondary};
    .ant-alert-icon {
      color: ${colors.fill_warning};
    }
  }
  .ant-alert .ant-alert-icon {
    margin-inline-end: 0;
  }

  .anticon svg {
    display: flex;
    width: 20px;
    height: 20px;
  }

  .ant-alert-message {
    ${Typography.body_md_medium}
    color: ${colors.text};
  }
`;
