import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

export const MainDiv = styled.div`
  background-color: ${colors.bg_white};
  min-width: 400px;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid ${colors.border};
`;

export const Title = styled.div`
  ${Typography.body_md_semibold};
  color: ${colors.text};
`;

export const BottomDiv = styled.form`
  padding: 12px 16px;
  .email-label {
    margin-top: 12px;
  }
  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 8px;
  }
  .label-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    position: relative;
  }
  .icon-div {
    display: flex;
    justify-content: center;
  }
`;

export const Label = styled.div`
  ${Typography.body_md_medium};
  color: ${colors.text};
  margin-bottom: 4px;
  span {
    ${Typography.body_md_regular};
    color: ${colors.text_text_secondary};
  }
`;

export const IconDiv = styled.div`
  background-color: ${colors.bg_surface_secondary};
  padding: 12px;
  border-radius: 50%;
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  cursor: pointer;
`;
