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
  .ant-picker-range {
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 3px 12px;
    background-color: var(--bg-surface-secondary);
    border-radius: 30px;
  }

  .ant-picker-panel-container {
    margin-top: 12px;
  }

  .ant-picker-dropdown {
    z-index: 1001;
  }
  .ant-picker.ant-picker-outlined {
    margin: 0;
  }
  .ant-picker .ant-picker-input > input {
    ${Typography.body_sm_regular}
    color: var(--text);
  }
  .ant-picker-dropdown
    .ant-picker-cell-in-view.ant-picker-cell-today
    .ant-picker-cell-inner::before {
    /* background-color: red; */
    border: 1px solid red !important;
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
  DatePickerHeader,
  HeaderText,
  PickerContainer,
};
