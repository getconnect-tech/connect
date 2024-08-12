import styled from 'styled-components';
import { Typography } from '../../styles/typography';
import { colors } from '@/styles/colors';

const Main = styled.div`
  display: flex;
  background-color: ${colors.bg_surface};
  height: 100vh;
`;

const TopDiv = styled.div`
  position: sticky;
  top: 0;
  background-color: ${colors.bg_surface};
  z-index: 999;
  border-bottom: 1px solid ${colors.border};
`;

const BottomDiv = styled.div`
  max-width: 702px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 86px);
  padding: 0 20px;
`;

const MainDiv = styled.div`
  width: 100%;
  margin-left: 223px;
  height: 100vh;
  overflow: auto;
  border-right: 1px solid ${colors.border};
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  padding: 7px 20px;
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.div`
  ${Typography.body_md_medium}
  color: ${colors.text};
`;

const StatusDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 9px 20px;
  border-top: 1px solid ${colors.border};
  position: relative;
`;

const InputDiv = styled.div`
  display: flex;
  gap: 12px;
  position: sticky;
  bottom: 0;
  padding: 0 0 20px;
  background-color: ${colors.bg_surface};
  z-index: 1;
`;

const Input = styled.div`
  background-color: ${colors.bg_white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  textarea {
    outline: none;
    border: none;
    max-height: 40px;
    height: 100%;
    width: 100%;
    ${Typography.body_md_regular};
    ${colors.text};
    resize: none;
    ::placeholder {
      ${colors.text_text_secondary}
    }
  }
`;

const CenterDiv = styled.div`
  flex: 1;
  padding: 20px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-bottom: 20px;
`;

const InputIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  .send-icon {
    background-color: ${colors.bg_surface_secondary};
    border-radius: 50%;
    &:hover {
      background-color: ${colors.bg_surface_secondary_hover};
    }
  }
`;

const ActivityDiv = styled.div`
  display: flex;
  gap: 12px;
`;

const Message = styled.p`
  ${Typography.body_md_regular};
  color: ${colors.text};
  border-left: 1px solid ${colors.border};
  padding-left: 18px;
  margin-left: -23px;
  span {
    ${Typography.body_md_regular};
    color: ${colors.text_text_secondary};
  }
  svg {
    margin: 0 8px 3px;
  }
`;

const LineDiv = styled.div`
  border-left: 1px solid ${colors.border};
  height: 20px;
  margin-left: 9px;
`;

export {
  Main,
  MainDiv,
  HeaderDiv,
  Title,
  TopDiv,
  BottomDiv,
  LeftDiv,
  StatusDiv,
  InputDiv,
  Input,
  InputIcon,
  CenterDiv,
  ActivityDiv,
  Message,
  LineDiv,
};
