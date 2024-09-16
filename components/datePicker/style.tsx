/* eslint-disable indent */
import styled from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  isContextMenu?: boolean;
}

export const MainDiv = styled.div<Props>`
  max-width: 260px;
  width: 100%;
  position: ${({ isContextMenu }) => (isContextMenu ? 'relative' : 'absolute')};
  right: 0;
  border-radius: 12px;
  z-index: 11;
  .submenu-upwards {
    bottom: calc(100% - 118px);
    top: auto;
    position: ${({ isContextMenu }) =>
      isContextMenu ? 'relative' : 'absolute'};
    background-color: var(--bg-white);
    box-shadow: var(--shadow-dropdown);
    border-radius: 12px;
  }

  .submenu-downwards {
    top: calc(100% - 40px);
    bottom: auto;
    position: ${({ isContextMenu }) =>
      isContextMenu ? 'relative' : 'absolute'};
    background-color: var(--bg-white);
    box-shadow: var(--shadow-dropdown);
    border-radius: 12px;
  }
`;

export const Header = styled.div`
  padding: 8px 12px;
  border-bottom: var(--border-main);
  display: flex;
  align-items: center;
  p {
    ${Typography.body_md_medium};
    color: var(--text);
    text-align: center;
    margin-left: 69px;
  }
`;

export const CalendarDiv = styled.div`
  .react-calendar__navigation__arrow .react-calendar__navigation__next2-button {
    display: none;
    background-color: unset;
    border: none;
  }
  .react-calendar__navigation__label {
    background-color: unset;
    border: none;
    ${Typography.body_md_medium};
    color: var(--text);
  }
  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 18px 0;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
    background-color: unset;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__next2-button {
    display: none;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__prev2-button {
    display: none;
  }
  .react-calendar__month-view__weekdays {
    padding: 0 12px;
  }
  .react-calendar__month-view__weekdays__weekday {
    ${Typography.body_sm_regular};
    color: var(--text-text-secondary);
    padding: 8px 6px;
    text-align: center;
    abbr {
      text-decoration: none;
    }
  }
  .react-calendar__tile.react-calendar__month-view__days__day {
    width: 30px;
    height: 30px;
    ${Typography.body_sm_regular};
    cursor: pointer;
  }
  .react-calendar__tile.react-calendar__month-view__days__day:hover {
    background-color: var(--bg-white-hover);
    border-radius: 50%;
  }
  .react-calendar__month-view__days {
    padding: 0 12px;
    text-align: center;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__next-button {
    font-size: 22px;
    color: var(--icon);
    cursor: pointer;
    margin-top: -4px;
  }
  .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
    font-size: 22px;
    color: var(--icon);
    cursor: pointer;
    margin-top: -4px;
  }
  .react-calendar__tile--active:enabled {
    background: var(--brand);
    color: var(--text-white);
    border-radius: 50%;
  }
  .react-calendar__tile--active:enabled:hover {
    background: var(--brand);
    color: var(--text-white);
    border-radius: 50%;
  }
`;

export const InputMainDiv = styled.form`
  border-top: var(--border-main);
  margin-top: 12px;
  padding: 12px;
  .buttons {
    margin-top: 12px;
    gap: 8px;
    display: flex;
    justify-content: end;
  }
`;

export const Inputs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  .input {
    padding: 8px 16px;
    ${Typography.body_sm_medium};
    margin-top: 4px;
  }
`;

export const Label = styled.p`
  ${Typography.body_sm_medium};
  color: var(--text);
`;
