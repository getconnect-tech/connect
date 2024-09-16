import styled, { css } from 'styled-components';

interface Props {
  size?: boolean;
  isActive?: boolean;
}

export const IconDiv = styled.div<Props>`
  width: ${(props) => (props.size ? `24px` : '28px')};
  height: ${(props) => (props.size ? `24px` : '28px')};
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: var(--icon);
  }
  &:hover {
    cursor: pointer;
    border-radius: 50px;
    background-color: var(--bg-surface-secondary-hover);
    svg {
      fill: var(--icon-hover);
    }
  }
  ${(props) =>
    props.isActive &&
    css`
      background-color: var(--bg-surface-secondary);
      border-radius: 50%;
    `}
`;
