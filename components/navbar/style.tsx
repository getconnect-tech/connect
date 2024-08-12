import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

interface Props {
  isActive?: boolean;
}

const MainDiv = styled.div`
  padding: 20px 16px;
  height: 100vh;
  background-color: ${colors.bg_surface};
  width: 223px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid ${colors.border};
  position: fixed;
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const OrganizationNameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  p {
    ${Typography.body_md_medium}
    color: ${colors.text};
    margin-right: 8px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  &:hover {
    cursor: pointer;
    background-color: ${colors.bg_surface_hover};
    border-radius: 30px;
  }
`;

const ItemMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const ItemDiv = styled.div<Props>`
  display: flex;
  align-items: center;
  padding: 4px 4px 4px 12px;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${({ isActive }) => isActive && colors.bg_surface_active};
  border-radius: ${({ isActive }) => isActive && '30px'};
  &:hover {
    background-color: ${colors.bg_surface_hover};
    border-radius: 30px;
  }
`;

const Title = styled.p<Props>`
  ${Typography.body_md_regular}
  color: ${({ isActive }) =>
    isActive ? colors.text : colors.text_text_secondary};
`;

const Label = styled.p`
  ${Typography.body_sm_medium}
  color: ${colors.text_text_secondary};
  padding: 0 12px;
`;

const CountText = styled.p`
  ${Typography.body_sm_regular}
  color: ${colors.text_text_secondary};
  background-color: ${colors.bg_surface_secondary};
  padding: 2px 8px;
  border-radius: 50%;
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ProfileDrop = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 4px;
  max-width: 191px;
  width: 100%;
  border-radius: 12px;
  background-color: ${colors.bg_white};
  box-shadow:
    0px 0px 0px 0.5px ${colors.box_shadow},
    0px 4px 8px 0px ${colors.box_shadow},
    0px 8px 24px 0px ${colors.box_shadow};
`;
const Frame1 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-bottom: 0.5px solid ${colors.border};
`;
const Frame2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
`;
const OrganizationProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 8px;
  p {
    ${Typography.body_md_medium};
    color: ${colors.text_text_secondary};
  }
  &:hover {
    cursor: pointer;
    background-color: ${colors.bg_white_hover};
    border-radius: 8px;
    p {
      color: ${colors.text};
    }
  }
`;
const Description = styled.div`
  ${Typography.body_sm_regular};
  color: ${colors.text_text_secondary};
`;
const ProfileItemDiv = styled.div`
  display: flex;
  padding: 4px 8px;
  gap: 8px;
  align-items: center;
  fill: ${colors.icon};
  p {
    ${Typography.body_md_regular}
    color: ${colors.text_text_secondary};
  }
  &:hover {
    fill: ${colors.icon_hover};
    cursor: pointer;
    background-color: ${colors.bg_white_hover};
    border-radius: 8px;
    p {
      color: ${colors.text};
    }
  }
`;
export {
  MainDiv,
  LogoDiv,
  ItemDiv,
  Title,
  ItemMainDiv,
  Label,
  TopDiv,
  CountText,
  LeftDiv,
  ProfileDrop,
  Frame1,
  Frame2,
  OrganizationProfile,
  Description,
  ProfileItemDiv,
  OrganizationNameDiv,
};
