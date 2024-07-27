import { colors } from "@/styles/colors";
import styled, { css } from "styled-components";
import { Typography } from "../../styles/typography";

interface Props {
  active?: boolean;
}

const Main = styled.div`
  display: flex;
  background-color: ${colors.bg_surface};
  height: 100vh;
`;

const MainDiv = styled.div`
  max-width: 662px;
  margin: 0 auto;
  padding: 24px 0;
  width: 100%;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 6px;
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
  ${(props) =>
    props.active &&
    css`
      background-color: ${colors.bg_white};
      border-radius: 30px;
    `}
`;

export { Main, MainDiv, HeaderDiv, Title, TabDiv, Tab };
