import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  active?: boolean;
}

const LeftProfileSection = styled.div`
  min-width: 315px;
  border-right: var(--border-main);
  height: 100vh;
  overflow: auto;
`;

const NameSection = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: var(--border-main);
  top: 0;
  position: sticky;
  background-color: var(--bg-surface);
`;

const Name = styled.p`
  ${Typography.body_md_medium}
  color: var(--text-primary);
`;

const PersonalDetailSection = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: var(--border-main);
`;

const Title = styled.p`
  ${Typography.body_sm_semibold}
  color: var(--text-text-secondary);
  &.workspace-title {
    padding-left: 12px;
  }
`;

const InformationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InformationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Label = styled.p`
  ${Typography.body_md_medium}
  color: var(--text-text-secondary);
  min-width: 60px;
`;

const Value = styled.p`
  ${Typography.body_md_medium}
  color: var(--text-primary);
`;

const WorkSpaceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

const WorkspaceItemSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const ItemDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: var(--bg-surface-hover);
  }
`;

const TopDiv = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--bg-surface);
  z-index: 99;
  padding: 0 16px;
`;

const BottomDiv = styled.div`
  max-width: 662px;
  margin: 0 auto;
`;

const MainDiv = styled.div`
  width: 100%;
  margin-left: 223px;
  overflow: hidden;
  position: relative;
  display: flex;
  @media screen and (max-width: 449px) {
    margin-left: unset;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 0 4px;
  max-width: 662px;
  margin: 0 auto;
  @media screen and (max-width: 449px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 0 4px;
  }
`;

const IconAndTitle = styled.div`
  display: flex;
  align-items: center;
  .sidebar-icon {
    display: none;
    @media screen and (max-width: 449px) {
      display: flex;
      margin-right: 8px;
    }
  }
`;

const TabDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 30px;
  background-color: var(--bg-surface-secondary);
`;

const Tab = styled.p<Props>`
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

const RightSideSection = styled.div`
  width: 100%;
  overflow: auto;
`;

const EmailValue = styled.p`
  ${Typography.body_md_regular}
  color: var(--text-text-secondary);
  margin-top: 1px;
`;

const CountingText = styled.p`
  ${Typography.body_sm_regular}
  color: var(--text-text-secondary);
  padding: 2px 8px;
  border-radius: 30px;
  background-color: var(--bg-surface-secondary);
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export {
  LeftProfileSection,
  NameSection,
  Name,
  PersonalDetailSection,
  Title,
  InformationSection,
  InformationItem,
  Label,
  Value,
  WorkSpaceSection,
  WorkspaceItemSection,
  ItemDiv,
  Tab,
  TabDiv,
  IconAndTitle,
  TopDiv,
  BottomDiv,
  HeaderDiv,
  MainDiv,
  RightSideSection,
  EmailValue,
  CountingText,
  TitleSection,
};
