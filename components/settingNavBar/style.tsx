import styled, { css } from 'styled-components';
import { colors } from '@/styles/colors';
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
`;
export const IconDiv = styled.div`
  position: fixed;
  width: 28px;
  height: 28px;
  top: 20px;
  right: 20px;
  padding: 6px;
  svg {
    fill: ${colors.icon};
  }
  &:hover {
    cursor: pointer;
    border-radius: 50px;
    background-color: ${colors.bg_surface_secondary_hover};
    svg {
      fill: ${colors.icon_hover};
    }
  }
`;
export const TopBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${colors.border};
  gap: 6px;
  padding-bottom: 12px;
`;
export const Title = styled.div`
  padding: 4px 12px;
  ${Typography.body_sm_semibold}
  color: ${colors.text_text_secondary};
`;
export const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;
export const Item = styled.div<Props>`
  display: flex;
  padding: 4px 4px 4px 12px;
  ${Typography.body_md_regular}
  color: ${colors.text_text_secondary};
  &:hover {
    cursor: pointer;
    border-radius: 50px;
    color: ${colors.text};
    background-color: ${colors.bg_surface_active};
  }
  ${({ active }) =>
    active &&
    css`
      border-radius: 50px;
      color: ${colors.text};
      background-color: ${colors.bg_surface_active};
    `}
`;
export const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  gap: 6px;
`;
export const NavBarMainDiv = styled.div``;
