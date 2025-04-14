import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  active?: boolean;
  isShowNavbar?: boolean;
}

export const Main = styled.div`
  width: calc(100% - 240px);
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  margin-top: 64px;
  margin-left: 240px;
  position: fixed;
`;

export const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: auto;
`;

export const SplitViewContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

export const LeftPanel = styled.div`
  width: 300px;
  min-width: 300px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

export const RightPanel = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 104px);
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const GroupName = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

export const GroupLabel = styled.div`
  color: #666;
  font-size: 14px;
`;

export const GroupStats = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
  margin-bottom: 16px;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;

  span {
    color: #333;
    font-weight: 500;
  }
`;

export const GroupCustomTraits = styled.div`
  color: #666;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const ContactsSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

export const ContactsTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #333;
`;

export const ContactsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TopDiv = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

export const TabDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 30px;
  background-color: var(--bg-surface-secondary);
`;

export const Tab = styled.p<Props>`
  padding: 4px 8px;
  ${Typography.body_sm_regular}
  cursor: pointer;
  color: var(--text-text-secondary);
  ${(props) =>
    props.active &&
    css`
      background-color: var(--bg-white);
      border-radius: 30px;
      box-shadow: var(--shadow-tab);
      color: var(--text);
    `}
  @media screen and (max-width: 449px) {
    min-width: 92px;
    display: flex;
    justify-content: center;
  }
`;

export const BottomDiv = styled.div`
  flex: 1;
  overflow: auto;
  padding: 20px;
`; 