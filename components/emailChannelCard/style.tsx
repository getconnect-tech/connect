/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  isOpen?: boolean;
  isChecked?: boolean;
}

export const ProfileDetail = styled.div<Props>`
  display: flex;
  flex-direction: column;
  max-width: 662px;
  width: 100%;
  padding: 0px 16px 16px;
  gap: 16px;
  &:last-child {
    padding-bottom: 0px;
  }
  ${(props) =>
    props.isOpen &&
    css`
      background-color: var(--bg-white);
      border-radius: 12px;
      box-shadow: var(--shadow-card);
    `}
`;

export const Head = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0px;
  border-bottom: var(--border-light-hover);
  gap: 1px;
  &:last-child {
    border: none;
  }
`;

export const StepName = styled.div`
  ${Typography.body_sm_regular}
  color: var(--text-text-secondary);
  cursor: pointer;
`;

export const StepContent = styled.div`
  ${Typography.body_md_medium}
  color: var(--text);
`;

export const Description = styled.div`
  ${Typography.body_md_regular}
  color: var(--text);
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
  p {
    ${Typography.body_md_medium}
    color:var(--brand-fill-hover);
  }
  .input {
    max-width: 320px;
    ${Typography.body_md_medium};
    padding: 8px 16px;
  }
`;
export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  svg {
    fill: var(--icon-disabled);
    :hover {
      fill: var(--icon-active);
      cursor: pointer;
    }
  }
`;
export const CheckBox = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  p {
    ${Typography.body_md_regular}
    color: var(--text-text-secondary);
    ${(props) =>
      props.isChecked &&
      css`
        color: var(--text);
      `}
  }
`;
const checkmarkSVG = `
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.20006 8.67037C3.19946 8.67037 3.19886 8.67037 3.19766 8.67037C3.03746 8.66977 2.88506 8.60559 2.77286 8.49159L0.372863 6.05438C0.140063 5.81798 0.143064 5.43818 0.379464 5.20598C0.615864 4.97378 0.99506 4.97617 1.22786 5.21257L3.20366 7.21897L8.77647 1.64678C9.01107 1.41218 9.39026 1.41218 9.62486 1.64678C9.85946 1.88078 9.85946 2.26118 9.62486 2.49518L3.62486 8.49518C3.51206 8.60738 3.35906 8.67037 3.20006 8.67037Z" fill="white"/>
  </svg>
`;

export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: var(--bg-white);
  border: var(--border-secondary);
  border-radius: 4px;
  display: inline-block;
  position: relative;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: var(--brand);
    // eslint-disable-next-line prettier/prettier
    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(checkmarkSVG)}');
    background-size: 10px 10px;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
  }
`;
export const Table = styled.table`
  width: 100%;
  border-radius: 8px;
  border-collapse: collapse;
  overflow: hidden;
  .td-div {
    display: flex;
    align-items: center;
  }
  .copy-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 12px;
    svg {
      cursor: pointer;
      fill: var(--icon-disabled);
    }
    &:hover {
      background-color: var(--bg-surface-secondary);
      border-radius: 50%;
      svg {
        fill: var(--icon-active);
      }
    }
  }

  thead {
    background-color: var(--bg-white);
    border-bottom: var(--border-main);
  }

  th,
  td {
    padding: 12px;
    text-align: left;
  }

  th {
    ${Typography.body_md_medium}
    color: var(--text);
  }

  td {
    ${Typography.body_md_regular}
    color: var(--text-text-secondary);
    position: relative;
  }

  tr {
    border-bottom: var(--border-main);

    &:last-child {
      border-bottom: none;
    }
  }
`;
export const TableWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: var(--border-main);
`;

export const EmailAddressDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-radius: 30px;
  max-width: 519px;
  width: 100%;
  height: 36px;
  border: var(--border-secondary);
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-break: break-all;
    ${Typography.body_md_medium};
    color: var(--text);
  }
`;
