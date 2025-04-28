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
  position: relative;
  height: 200px;
`;

const TooltipDiv = styled.div`
  position: absolute;
  pointer-events: none;
  display: none;
  z-index: 100;
  transform: translateX(-50%);
  min-width: max-content;
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

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 6px;
  svg {
    cursor: pointer;
  }
`;

const TooltipContent = styled.div`
  position: absolute;
  top: 120%;
  left: -12px;
  background: var(--bg-white);
  color: var(--text);
  border-radius: 4px;
  box-shadow: var(--shadow-tooltip);
  padding: 4px 6px;
  ${Typography.body_sm_regular};
  z-index: 10;
  max-width: 165px;
  min-width: 165px;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: -7px;
    left: 12px; /* Adjust to center the arrow */
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid var(--bg-white);
  }
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
  TooltipContainer,
  TooltipContent,
};
