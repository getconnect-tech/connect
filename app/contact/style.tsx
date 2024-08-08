import styled, { css } from 'styled-components';
import { Typography } from '../../styles/typography';
import { colors } from '../../styles/colors';

interface Props {
  active?: boolean;
}

const Main = styled.div`
  display: flex;
  background-color: ${colors.bg_surface};
  height: 100vh;
`;

const TopDiv = styled.div`
  position: sticky;
  top: 0;
  background-color: ${colors.bg_surface};
  z-index: 999;
  margin-bottom: 12px;
`;

const BottomDiv = styled.div`
  max-width: 662px;
  margin: 0 auto;
`;

const MainDiv = styled.div`
  width: 100%;
  margin-left: 223px;
  height: 100vh;
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
  color: ${colors.text};
`;

const TabDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 30px;
  background-color: ${colors.bg_surface_secondary};
`;

const Tab = styled.p<Props>`
  padding: 4px 8px;
  ${Typography.body_sm_regular}
  cursor: pointer;
  color: ${colors.text_text_secondary};
  ${(props) =>
    props.active &&
    css`
      background-color: ${colors.bg_white};
      border-radius: 30px;
      box-shadow: 0px 1px 1px 0px ${colors.box_shadow};
      color: ${colors.text};
    `}
`;

const ListMainDiv = styled.div`
  background-color: ${colors.bg_white};
  padding: 4px 0;
  box-shadow:
    0px 0px 0px 0.5px ${colors.box_shadow},
    0px 2px 4px 0px ${colors.box_shadow_2};
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