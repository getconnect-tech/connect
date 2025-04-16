import styled from 'styled-components';
import { Typography } from '@/styles/typography';

const LeftProfileSection = styled.div`
  width: 315px;
  border-right: var(--border-main);
  height: 100vh;
`;

const NameSection = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: var(--border-main);
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
    padding: 0 8px;
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
  padding: 12px;
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
  padding: 8px;
  cursor: pointer;
  border-radius: 30px;
  &:hover {
    background-color: var(--bg-surface-hover);
  }
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
};
