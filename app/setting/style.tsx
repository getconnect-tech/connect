import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

export const MainDiv = styled.div`
  display: flex;
  background-color: ${colors.bg_surface};
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  padding-top: 98px;
  gap: 32px;
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
export const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 662px;
  width: 100%;
  gap: 16px;
`;
export const Head = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const Description = styled.div`
  ${Typography.body_md_regular}
  color: ${colors.text_text_secondary};
`;
export const Title = styled.div`
  ${Typography.heading_lg_regular}
  color: ${colors.text};
`;
export const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 16px;
  gap: 16px;
  background-color: ${colors.bg_white};
  box-shadow:
    0px 0px 0px 0.5px ${colors.box_shadow},
    0px 2px 4px 0px ${colors.box_shadow};
`;
export const ProfileImage = styled.div`
  display: flex;
  gap: 12px;
`;
export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  p {
    ${Typography.body_md_regular};
    color: ${colors.text_text_secondary};
  }
`;
export const Link = styled.a`
  padding: 4px 0;
  ${Typography.body_md_medium};
  color: ${colors.text_link};
`;
export const ProfileInputs = styled.div`
  display: flex;
  gap: 12px;
`;
export const TextField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 260px;
  width: 100%;
`;
export const Label = styled.div`
  ${Typography.body_md_medium}
  color: ${colors.text};
`;
export const PasswordInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
