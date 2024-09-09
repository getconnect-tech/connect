import styled from 'styled-components';
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
    border: var(--border-error);
    background-color: var(--fill-danger-secondary);
    .ant-alert-icon {
      color: var(--fill-danger);
    }
  }

  .ant-alert-success {
    border: var(--border-success);
    background-color: var(--fill-success-secondary);
    .ant-alert-icon {
      color: var(--text-success);
    }
  }

  .ant-alert-warning {
    border: var(--border-warning);
    background-color: var(--fill-warning-secondary);
    .ant-alert-icon {
      color: var(--text-warning);
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
    color: var(--text);
  }
`;
