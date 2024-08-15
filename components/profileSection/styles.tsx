import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

const MainDiv = styled.div`
  max-width: 315px;
  width: 100%;
  overflow: auto;
`;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px 16px;
`;

const Title = styled.p`
  ${Typography.body_md_medium}
  color: ${colors.text};
`;

const CompanyName = styled.p`
  ${Typography.body_sm_regular}
  color: ${colors.text_text_secondary};
  text-align: center;
  margin-top: 2px;
`;

const DetailsMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px 12px;
`;

const DetailsProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px 12px;
  border-bottom: 1px solid ${colors.border};
`;

const DetailsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  p {
    ${Typography.body_sm_medium}
    color: ${colors.text};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-wrap: break-word;
    max-width: 155px;
  }
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100px;
  p {
    ${Typography.body_sm_medium}
    color: ${colors.text_text_secondary};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-break: break-word;
  }
`;

const WorkDetailMainDiv = styled.div`
  border-bottom: 1px solid ${colors.border};
`;

const EventMainDiv = styled.div`
  border-bottom: 1px solid ${colors.border};
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
`;

const EventDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 12px;
  position: relative;
`;

const DotLine = styled.div``;

const EventDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
  p {
    ${Typography.body_sm_medium};
    color: ${colors.text_text_secondary};
  }
  h6 {
    ${Typography.body_sm_medium};
    color: ${colors.text_text_secondary};
    width: 20px;
    text-align: right;
  }
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${colors.border_hover};
  z-index: 1;
  position: relative;
`;

const Line = styled.div`
  border-left: 1px solid ${colors.border};
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
  border-left: 1px solid ${colors.border};
`;

const AIIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.brand};
  border-radius: 50%;
`;

const NameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AIText = styled.p`
  ${Typography.body_sm_medium};
  color: ${colors.text};
`;

const DescriptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  h6 {
    ${Typography.body_sm_medium};
    color: ${colors.text_text_secondary};
  }
`;

const ActionsDiv = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Actions = styled.p`
  ${Typography.body_sm_regular};
  color: ${colors.text_text_secondary};
  padding: 4px 12px;
  background-color: ${colors.bg_surface_secondary};
  border-radius: 30px;
  cursor: pointer;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  span {
    ${Typography.body_sm_medium};
    color: ${colors.text};
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
  DotLine,
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
};
