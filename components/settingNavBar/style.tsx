import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';
interface Props {
  active?: boolean;
}
export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 190px;
  width: 100%;
  gap: 12px;
  margin-top: 50px;
  position: fixed;
`;
export const IconDiv = styled.div`
  position: fixed;
  width: 28px;
  height: 28px;
  top: 20px;
  right: 20px;
  padding: 6px;
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
`;
export const TopBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: var(--border-main);
  gap: 1px;
  padding-bottom: 12px;
`;
export const Title = styled.div`
  padding: 4px 12px;
  ${Typography.body_sm_semibold}
  color: var(--text-text-secondary);
  margin-bottom: 5px;
`;
export const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;
export const Item = styled.div<Props>`
  display: flex;
  padding: 4px 12px;
  ${Typography.body_md_regular}
  color: var(--text-text-secondary);
  &:hover {
    cursor: pointer;
    border-radius: 50px;
    color: var(--text);
    background-color: var(--bg-surface-active);
  }
  ${({ active }) =>
    active &&
    css`
      border-radius: 50px;
      color: var(--text);
      background-color: var(--bg-surface-active);
    `}
`;
export const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  gap: 1px;
`;
export const NavBarMainDiv = styled.div``;
