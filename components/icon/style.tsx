import styled from 'styled-components';
import { colors } from '@/styles/colors';

interface Props {
  size?: boolean;
}

export const IconDiv = styled.div<Props>`
  width: ${(props) => (props.size ? `24px` : '28px')};
  height: ${(props) => (props.size ? `24px` : '28px')};
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
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
