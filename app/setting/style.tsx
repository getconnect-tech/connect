/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

export const Main = styled.div`
  display: flex;
  background-color: ${colors.bg_surface};
  width: 100%;
  margin-left: 254px;
`;

export const MainDiv = styled.div`
  width: 100%;
`;

export const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 662px;
  width: 100%;
  gap: 6px;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: ${colors.bg_surface};
  z-index: 2;
  margin: 0 -4px;
  padding: 50px 5px 10px;
`;

export const Description = styled.div`
  ${Typography.body_md_regular}
  color: ${colors.text_text_secondary};
`;

export const Title = styled.div`
  ${Typography.heading_lg_regular}
  color: ${colors.text};
`;

export const ProfileDetail = styled.form`
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
  cursor: pointer;
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

export const checkmarkSVG = `
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
    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(
      checkmarkSVG,
    )}');
    background-size: 10px 10px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const NotificationCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 0 16px;
  background-color: ${colors.bg_white};
  box-shadow:
    0px 0px 0px 0.5px ${colors.box_shadow},
    0px 2px 4px 0px ${colors.box_shadow};
  padding: 0 16px;
`;

export const NotificationItem = styled.div`
  display: flex;
  border-bottom: 0.5px solid ${colors.border};
  padding: 12px 0;
  gap: 10px;
  align-items: center;
  p {
    ${Typography.body_md_medium};
    color: ${colors.text_link};
  }
`;

export const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MainCardDiv = styled.div`
  padding: 4px 0;
  background-color: ${colors.bg_white};
  box-shadow:
    0px 0px 0px 0.5px ${colors.box_shadow},
    0px 2px 4px 0px ${colors.box_shadow_2};
  border-radius: 12px;
  margin-bottom: 16px;
`;
export const EmailCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.bg_surface_secondary};
  border-radius: 12px;
  .line-div {
    height: 0.4px;
    margin: 0 16px;
    background: ${colors.border_hover};
  }
`;
