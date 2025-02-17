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
  &:last-child {
    border-bottom: none;
  }
  ${(props) =>
    props.isShowNavbar &&
    css`
      @media screen and (max-width: 449px) {
        min-width: 361px;
      }
    `}
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
  div {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const CompanyDiv = styled.div`
  display: flex;
  gap: 6px;
  p {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
  }
`;

const DotIcon = styled.div`
  width: 3px;
  height: 3px;
  background-color: var(--text-text-secondary);
  border-radius: 50%;
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
  .copy-icon {
    svg {
      fill: var(--icon-disabled);
    }
    &:hover {
      svg {
        fill: var(--icon-active);
      }
    }
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
