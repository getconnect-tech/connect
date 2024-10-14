import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  isShowNavbar: boolean;
}

export const ItemDiv = styled.div<Props>`
  display: flex;
  border-bottom: var(--border-light);
  padding: 8px 12px;
  gap: 16px;
  justify-content: space-between;
  position: relative;
  &:last-child {
    border-bottom: none;
  }
  ${(props) =>
    props.isShowNavbar &&
    css`
      @media screen and (max-width: 449px) {
        min-width: 361px;
      }
    `}
  .submenu-upwards {
    bottom: calc(100% + 4px);
    top: auto;
  }

  .submenu-downwards {
    bottom: auto;
  }
`;

export const InnerDiv = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  svg {
    fill: var(--icon);
  }
`;

export const Name = styled.div`
  ${Typography.body_md_medium}
  color: var(--text);
`;
