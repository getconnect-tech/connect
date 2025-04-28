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

const DatePickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 24px;
`;

const HeaderText = styled.p`
  ${Typography.heading_lg_regular};
  color: var(--text);
`;

const PickerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  .rdrSelected,
  .rdrInRange,
  .rdrStartEdge,
  .rdrEndEdge {
    background-color: var(--bg-surface-secondary);
  }
  .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span,
  .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span,
  .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span,
  .rdrDay:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span {
    color: var(--text);
  }
  .rdrDateDisplayItemActive {
    border-color: var(--black);
  }
  .rdrDay .rdrDayHovered {
    border-color: var(--black);
  }
  .rdrDayToday .rdrDayNumber span:after {
    background-color: var(--black);
  }
  .rdrDateDisplayWrapper {
    background-color: var(--bg-white);
    border-bottom: 1px solid var(--border);
  }
  .rdrNextPrevButton {
    background-color: var(--bg-surface-secondary);
  }
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  background: var(--bg-white);
  border-radius: 4px;
  box-shadow: var(--shadow-dropdown);
  margin-top: 8px;
`;

const DateRangePickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background-color: var(--bg-surface-secondary);
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: var(--bg-surface-secondary-hover);
  }
`;

const DateRangeText = styled.p`
  ${Typography.body_sm_regular};
  color: var(--text);
`;

export {
  HeadingTitle,
  HeaderSection,
  MainChartDiv,
  ChartDiv,
  TooltipDiv,
  TopSection,
  ValueTitle,
  DatePickerHeader,
  HeaderText,
  PickerContainer,
  CalendarContainer,
  DateRangePickerContainer,
  DateRangeText,
};
