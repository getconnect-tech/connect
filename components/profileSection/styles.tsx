import styled from 'styled-components';
import { Typography } from '@/styles/typography';

const MainDiv = styled.div`
  max-width: 315px;
  width: 100%;
  overflow: auto;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.p`
  ${Typography.body_md_medium}
  color: var(--text);
`;

const CompanyName = styled.p`
  ${Typography.body_sm_regular}
  color: var(--text-text-secondary);
  text-align: center;
  margin-top: 2px;
`;

const DetailsMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px 12px;
  @media screen and (max-width: 768px) {
    padding: 0 16px 12px;
    gap: 12px;
  }
`;

const DetailsProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px 12px;
  border-bottom: var(--border-main);
  @media screen and (max-width: 768px) {
    padding: 0 16px 12px;
  }
`;

const DetailsDiv = styled.div`
  display: flex;
  gap: 20px;
  p {
    ${Typography.body_md_medium}
    color: var(--text);
    word-wrap: break-word;
    max-width: 155px;
    @media screen and (max-width: 768px) {
      word-wrap: normal;
    }
  }
`;

const LeftDiv = styled.div`
  width: 100px;
  p {
    ${Typography.body_md_medium}
    color: var(--text-text-secondary);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-break: break-word;
  }
`;

const WorkDetailMainDiv = styled.div`
  border-bottom: var(--border-main);
`;

const EventMainDiv = styled.div`
  border-bottom: var(--border-main);
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 20px;
  cursor: pointer;
  position: relative;
  .icon {
    display: none;
  }
  &:hover .icon {
    display: flex;
  }
  @media screen and (max-width: 768px) {
    margin: 12px 16px;
    .icon {
      display: flex;
    }
  }
`;

const EventDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 12px;
  position: relative;
  @media screen and (max-width: 768px) {
    padding: 0 16px 12px;
  }
`;

const EventDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
  p {
    ${Typography.body_md_medium};
    color: var(--text-text-secondary);
  }
  h6 {
    ${Typography.body_sm_regular};
    color: var(--text-text-secondary);
    width: 20px;
    text-align: right;
  }
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--border-hover);
  z-index: 1;
  position: relative;
`;

const Line = styled.div`
  border-left: var(--border-main);
  height: 100%;
  position: absolute;
  top: 0;
  left: 28px;
  ${EventDiv}:first-child & {
    top: unset;
  }
  ${EventDiv}:last-child & {
    top: -6px;
  }
`;

const LineDiv = styled.div`
  height: 16px;
  margin-left: 28px;
  border-left: var(--border-main);
`;

const AIIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--brand);
  border-radius: 50%;
`;

const NameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AIText = styled.p`
  ${Typography.body_md_regular};
  color: var(--text);
`;

const DescriptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  h6 {
    ${Typography.body_md_medium};
    color: var(--text-text-secondary);
  }
  &.action-div {
    gap: 8px;
  }
  @media screen and (max-width: 768px) {
    gap: 4px;
  }
`;

const ActionsDiv = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Actions = styled.p`
  ${Typography.body_md_regular};
  color: var(--text-text-secondary);
  padding: 4px 12px;
  background-color: var(--bg-surface-secondary);
  border-radius: 30px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  span {
    ${Typography.body_md_medium};
    color: var(--text);
  }
`;

const ReplyButton = styled.button`
  ${Typography.body_md_regular};
  color: var(--text-text-secondary);
  padding: 4px 12px;
  background-color: var(--bg-surface-secondary);
  border-radius: 30px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: var(--bg-surface-secondary-hover);
    color: var(--text);
  }
`;

const QuestionMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReplyCard = styled.div`
  padding: 6px 12px;
  background-color: var(--bg-surface-secondary);
  ${Typography.body_md_regular};
  color: var(--text);
  border-radius: 0 8px 8px 8px;
  max-width: max-content;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  cursor: pointer;
`;

const ResponsiveMainDiv = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    padding: 8px 0 0;
  }
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;

  @media screen and (max-width: 768px) {
    padding: 12px 16px;
  }

  .refresh-icon {
    cursor: pointer;
  }
`;
export {
  MainDiv,
  ProfileDiv,
  Title,
  CompanyName,
  DetailsMainDiv,
  DetailsDiv,
  LeftDiv,
  WorkDetailMainDiv,
  TitleDiv,
  EventMainDiv,
  EventDetailDiv,
  EventDiv,
  Dot,
  Line,
  LineDiv,
  AIIcon,
  NameDiv,
  DetailsProfileDiv,
  AIText,
  DescriptionDiv,
  ActionsDiv,
  Actions,
  ReplyButton,
  QuestionMainDiv,
  ReplyCard,
  ResponsiveMainDiv,
  TopDiv,
};
