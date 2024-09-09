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
  margin-bottom: 12px;
  padding: 0 20px;
`;

const BottomDiv = styled.div`
  max-width: 662px;
  margin: 0 auto;
`;

const MainDiv = styled.div`
  width: 100%;
  margin-left: 223px;
  overflow: auto;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 0 6px;
  max-width: 662px;
  margin: 0 auto;
`;

const Title = styled.div`
  ${Typography.body_md_semibold}
  color: var(--text);
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
`;

const ListMainDiv = styled.div`
  background-color: var(--bg-white);
  padding: 4px 0;
  box-shadow: var(--shadow-card);
  border-radius: 12px;
  max-width: 662px;
  margin: 4px auto 0;
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
  ListMainDiv,
};
