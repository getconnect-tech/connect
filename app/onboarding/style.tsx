import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';
interface Props {
  isNext: boolean;
}
export const MainDiv = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  background-color: var(--bg-surface);
  overflow: auto;
`;
export const OnBoardScreen = styled.div<Props>`
  display: flex;
  flex-direction: column;
  max-width: 372px;
  width: 100%;
  gap: 32px;
  justify-content: center;
  ${(props) =>
    props.isNext &&
    css`
      max-width: 500px;
    `}
  @media screen and (max-width: 449px) {
    padding: 16px;
    max-width: unset;
  }
`;
export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const Title = styled.div<Props>`
  ${Typography.heading_heading_semibold};
  color: var(--text);
  ${(props) =>
    props.isNext &&
    css`
      padding: 0 92px;
    `}
  @media screen and (max-width: 449px) {
    padding: 0 40px;
  }
`;
export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
export const CenterCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  background-color: var(--bg-white);
  box-shadow: var(--shadow-card);
  border-radius: 12px;
  width: 100%;
`;
export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 12px;
`;
export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  h2 {
    ${Typography.body_md_semibold}
    color: var(--text);
  }
  p {
    ${Typography.body_md_regular}
    color: var(--text-text-secondary);
    text-align: center;
  }
`;
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const TextField = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  ${(props) =>
    props.isNext &&
    css`
      flex-direction: row;
      align-items: center;
      gap: 12px;
    `}
  @media screen and (max-width: 449px) {
    gap: 8px;
  }
`;
export const Label = styled.div`
  ${Typography.body_md_medium}
  color: var(--text);
  width: 100%;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const Steps = styled.div`
  padding: 8px 0;
  ${Typography.body_md_regular}
  color: var(--text-text-secondary);
`;
export const CenterCardNext = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  background-color: var(--bg-white);
  box-shadow: var(--shadow-card);
`;
export const NextProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media screen and (max-width: 449px) {
    gap: 16px;
  }
`;
export const Icon = styled.div`
  max-width: 24px;
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background-color: var(--bg-surface-hover);
    border-radius: 50px;
  }
`;
export const LabelDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 20px);
  padding-top: 20px;
`;
export const BottomFrame = styled.div`
  display: flex;
  ${Typography.body_md_medium}
  color:var(--text-link);
  align-items: center;
  span {
    color: var(--text-text-secondary);
    margin-right: 4px;
  }
`;
export const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -8px;
  gap: 12px;
`;

export const TimeZoneContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DropdownDiv = styled.div`
  position: relative;
  .timezone-dropdown {
    min-width: 332px;
    @media screen and (max-width: 449px) {
      min-width: 100%;
    }
  }
`;

export const InputDiv = styled.div`
  width: 50%;
  .time-picker {
    border: 1px solid var(--border);
    border-radius: 8px;
  }
`;

export const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 18px;
  border-radius: 30px;
  border: var(--border-secondary);
  background-color: var(--bg-white);
  ${Typography.body_md_medium};
  color: var(--text-primary);
`;

export const TimeContentDiv = styled.div`
  display: flex;
  gap: 12px;
`;
