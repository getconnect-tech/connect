import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  min-width: 400px;
  width: 100%;
  gap: 12px;
  border-radius: 12px;
  background-color: ${colors.bg_white};
`;

export const ModalHeader = styled.div`
  border-bottom: 1px solid ${colors.border};
  padding: 10px 16px;
  ${Typography.body_md_semibold}
  color: ${colors.text};
`;

export const Content = styled.div`
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
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
export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 368px;
  width: 100%;
  input {
    padding: 8px 16px;
  }
`;
export const Label = styled.div`
  ${Typography.body_md_medium}
  color: ${colors.text};
`;
export const ButtonDiv = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 16px 12px 16px;
  align-items: center;
  justify-content: end;
`;
