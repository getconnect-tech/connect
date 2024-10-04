import styled, { css } from 'styled-components';
import { Typography } from '../../styles/typography';

interface Props {
  active?: boolean;
}

const Main = styled.div`
  display: flex;
  background-color: var(--bg-surface);
  height: 100vh;
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
  overflow: auto;
  position: relative;
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

const Title = styled.div`
  ${Typography.body_md_medium}
  color: var(--text);
  white-space: nowrap;
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

export {
  Main,
  MainDiv,
  HeaderDiv,
  Title,
  TabDiv,
  Tab,
  TopDiv,
  BottomDiv,
  IconAndTitle,
};
