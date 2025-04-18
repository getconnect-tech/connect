import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  isShowNavbar: boolean;
}

const CardMainDiv = styled.div<Props>`
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border-light);
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:last-child {
    border-bottom: none;
  }
  @media screen and (max-width: 449px) {
    flex-direction: column;
    gap: 4px;
    align-items: baseline;
  }
  ${(props) =>
    props.isShowNavbar &&
    css`
      @media screen and (max-width: 449px) {
        min-width: 361px;
      }
    `}
  &:hover {
    background-color: var(--bg-white-hover);
  }
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  h6 {
    ${Typography.body_md_medium};
    color: var(--text);
  }
  p {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
  }
  .company-maindiv {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    @media screen and (max-width: 449px) {
      gap: 0;
    }
  }
`;

const CompanyDiv = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  p {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
  }
  @media screen and (max-width: 449px) {
    gap: 0;
  }
`;

const DotIcon = styled.div`
  width: 3px;
  height: 3px;
  background-color: var(--text-text-secondary);
  border-radius: 50%;
  @media screen and (max-width: 449px) {
    margin: 0 6px;
  }
`;

const CompanyNameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px;
  p {
    ${Typography.body_sm_regular};
    color: var(--text-text-secondary);
    margin-right: 10px;
  }
  &:hover {
    background-color: var(--bg-white-hover);
    border-radius: 30px;
    cursor: pointer;
    p {
      color: var(--text);
    }
  }
`;

const RightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  p {
    ${Typography.body_sm_regular};
    color: var(--text-text-secondary);
  }
  @media screen and (max-width: 449px) {
    padding-left: 40px;
  }
`;

export {
  CardMainDiv,
  LeftDiv,
  TitleDiv,
  CompanyDiv,
  DotIcon,
  CompanyNameDiv,
  RightDiv,
};
