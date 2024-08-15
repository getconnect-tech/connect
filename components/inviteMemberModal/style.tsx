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
  }
`;

export const Label = styled.div`
  ${Typography.body_md_medium};
  color: ${colors.text};
  margin-bottom: 4px;
`;
