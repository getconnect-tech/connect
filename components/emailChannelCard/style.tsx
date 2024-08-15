/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import styled, { css } from 'styled-components';
import { colors } from '@/styles/colors';
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
      background-color: ${colors.bg_white};
      border-radius: 12px;
    `}
`;

export const Head = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0px;
  border-bottom: 0.5px solid ${colors.border_hover};
  gap: 1px;
  &:last-child {
    border: none;
  }
`;

export const StepName = styled.div`
  ${Typography.body_sm_regular}
  color: ${colors.text};
  cursor: pointer;
`;

export const StepContent = styled.div`
  ${Typography.body_md_medium}
  color: ${colors.text};
`;

export const Description = styled.div`
  ${Typography.body_md_medium}
  color: ${colors.text};
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
  p {
    ${Typography.body_md_medium}
    color: ${colors.brand_fill_hover};
  }
  .input {
    max-width: 260px;
  }
`;
export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  &.copy-icon {
    position: relative;
    max-width: 519px;
  }
  svg {
    cursor: pointer;
    position: absolute;
    top: 49px;
    right: 16px;
  }
`;
export const CheckBox = styled.div<Props>`
  display: flex;
  gap: 8px;
  p {
    ${Typography.body_md_regular}
    color: ${colors.text_text_secondary};
    ${(props) =>
    props.isChecked &&
      css`
        color: ${colors.text};
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
  background-color: ${colors.bg_white};
  border: 1px solid ${colors.border_input_border};
  border-radius: 4px;
  display: inline-block;
  position: relative;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: ${colors.brand};
    // eslint-disable-next-line prettier/prettier
    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(checkmarkSVG)}');
    background-size: 10px 10px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
export const Table = styled.table`
  width: 100%;
  border-radius: 8px;
  border-collapse: collapse;
  overflow: hidden;

  thead {
    background-color: ${colors.bg_white};
    border-bottom: 1px solid ${colors.border};
  }

  th,
  td {
    padding: 12px;
    text-align: left;
  }

  th {
    ${Typography.body_sm_medium}
    color: ${colors.text};
  }

  td {
    ${Typography.body_sm_medium}
    color: ${colors.text};
    position: relative;
  }

  tr {
    border-bottom: 1px solid ${colors.border};

    &:last-child {
      border-bottom: none;
    }
  }
  svg {
    position: absolute;
    right: 12px;
    cursor: pointer;
  }
`;
export const TableWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${colors.border};
`;
