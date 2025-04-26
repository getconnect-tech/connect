import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  isShowNavbar?: boolean;
}

const Main = styled.div`
  display: flex;
  background-color: var(--bg-surface);
  height: 100vh;
`;

const MainDiv = styled.div`
  width: 100%;
  margin-left: 223px;
  overflow: auto;
  position: relative;
  @media screen and (max-width: 449px) {
    margin-left: unset;
  }
`;

const TopDiv = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--bg-surface);
  z-index: 99;
  padding: 0 16px;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 0 4px;
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

const Title = styled.div`
  ${Typography.body_md_medium}
  color: var(--text);
  white-space: nowrap;
`;

const ChartMainDiv = styled.div`
  background-color: var(--white);
  padding: 16px;
  box-shadow: var(--shadow-card);
  border-radius: 12px;
`;

const BottomDiv = styled.div<Props>`
  margin-top: 12px;
  padding: 0 16px;
  ${(props) =>
    props.isShowNavbar &&
    css`
      @media screen and (max-width: 449px) {
        min-width: 361px;
      }
    `}
`;

export {
  MainDiv,
  Main,
  TopDiv,
  HeaderDiv,
  IconAndTitle,
  Title,
  ChartMainDiv,
  BottomDiv,
};
