import styled from 'styled-components';
import { Typography } from '@/styles/typography';

const MainDiv = styled.div`
  max-width: 662px;
  width: 100%;
  border-radius: 12px;
  padding: 12px 12px 12px 8px;
  background-color: var(--bg-white);
  box-shadow: var(--shadow-card);
  margin: 12px 0;
  &:hover {
    box-shadow: var(--shadow-card-hover);
  }
  @media screen and (max-width: 449px) {
    max-width: 361px;
  }
`;
const MainCardDiv = styled.div`
  display: flex;
  gap: 12px;
`;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  width: 28px;
  height: 28px;
  padding: 7px;
  border-radius: 50%;
  background-color: var(--fill-danger);
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContentDiv = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
`;

const Title = styled.div`
  ${Typography.body_md_medium}
  color: var(--text);
`;

const Description = styled.div`
  ${Typography.body_md_regular}
  color: var(--text-text-secondary);
`;

const ButtonSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  a {
    ${Typography.body_sm_medium}
    color: var( --text-link);
  }
`;

export {
  MainDiv,
  MainCardDiv,
  ProfileDiv,
  RightSection,
  ContentDiv,
  Title,
  Description,
  ButtonSection,
};
