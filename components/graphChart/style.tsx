import styled from 'styled-components';
import { Typography } from '@/styles/typography';

const HeadingTitle = styled.p`
  ${Typography.body_md_medium}
  color: var(--text);
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MainChartDiv = styled.div`
  width: 100%;
`;

const ChartDiv = styled.div`
  height: 158px;
  position: relative;
`;

const TooltipDiv = styled.div`
  position: absolute;
  pointer-events: none;
  display: none;
  z-index: 100;
  transform: translateX(-50%);
  min-width: 80px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ValueTitle = styled.p`
  ${Typography.body_md_regular};
  color: var(--text);
  span {
    ${Typography.heading_lg_regular};
    color: var(--text);
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(307px, 1fr));
  gap: 32px;
`;

export {
  HeadingTitle,
  HeaderSection,
  MainChartDiv,
  ChartDiv,
  TooltipDiv,
  TopSection,
  ValueTitle,
  List,
};
