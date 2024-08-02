import { colors } from "@/styles/colors";
import { Typography } from "@/styles/typography";
import styled from "styled-components";

const MainDiv = styled.div`
  max-width: 315px;
  width: 100%;
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
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
  padding: 0 20px 20px;
`;

const DetailsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  p {
    ${Typography.body_sm_medium}
    color: ${colors.text};
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
    word-break: break-all;
  }
`;

const WorkDetailMainDiv = styled.div`
  border-top: 1px solid ${colors.border};
  border-bottom: 1px solid ${colors.border};
`;

const EventMainDiv = styled.div`
  border-bottom: 1px solid ${colors.border};
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 20px 12px;
  div {
    width: 24px;
    height: 24px;
  }
  svg {
    margin: 6px;
    cursor: pointer;
  }
`;

const EventDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
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
  LineDiv
};
