import styled from 'styled-components';
import { colors } from '@/styles/colors';

export const MainDiv = styled.div`
  background-color: ${colors.bg_surface};
  height: 100vh;
`;
export const Div = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 884px;
  padding-top: 98px;
`;
export const IconDiv = styled.div`
  position: absolute;
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
