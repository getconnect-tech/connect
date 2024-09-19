/* eslint-disable indent */
import styled from 'styled-components';
import { Typography } from '../../styles/typography';
import { DropDownItem } from '@/components/dropDown/dropDown';

interface Props {
  modeSelectedItem?: DropDownItem;
  isMargin?: boolean;
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
  border-bottom: var(--border-main);
`;

const BottomDiv = styled.div`
  max-width: 702px;
  width: 100%;
  margin: 0 auto;
  height: calc(100% - 120px);
  overflow: auto;
  scroll-padding-bottom: 15px;
  padding-bottom: 10px;
`;

const MainDiv = styled.div`
  width: 100%;
  margin-left: 223px;
  border-right: var(--border-main);
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  padding: 7px 20px;
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.div`
  ${Typography.body_md_medium}
  color: var(--text);
`;

const StatusDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 9px 20px;
  border-top: var(--border-main);
  position: relative;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  .submenu-upwards {
    bottom: calc(100% - 50px);
    top: auto;
  }
  .submenu-downwards {
    top: 33px;
    bottom: auto;
    right: 20px;
  }
`;

const InputDiv = styled.div`
  position: sticky;
  bottom: 0;
  background-color: var(--bg-surface);
  z-index: 1;
  max-width: 702px;
  margin: 0 auto;
  padding: 0 0 20px;
  width: 100%;
  .input-main-div {
    display: flex;
    gap: 12px;
  }
  .line {
    height: 20px;
    border-left: var(--border-main);
    margin-left: 10px;
  }
  .avtar {
    position: absolute;
    top: 20px;
    z-index: 1;
  }
`;

const Input = styled.div<Props>`
  background-color: var(
    ${({ modeSelectedItem }) =>
      modeSelectedItem?.name === 'Internal' ? '--brand-disabled' : '--bg-white'}
  );
  border-radius: 12px;
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: var(--shadow-card);
  margin-left: 10px;
  margin-top: 8px;
  .attach-file-div {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 8px;
  }
`;

const CenterDiv = styled.div`
  padding: 20px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 20px;
  position: relative;
  flex-grow: 1;
`;

const InputIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  .send-icon {
    background-color: var(--bg-surface-secondary);
    border-radius: 50%;
    &:hover {
      background-color: var(--bg-surface-secondary-hover);
    }
  }
  .submenu-upwards {
    bottom: 60px;
    top: auto;
  }
  .submenu-downwards {
    top: 0;
    bottom: auto;
  }
  .drop-tag {
    display: flex;
    gap: 8px;
  }
`;

const ActivityDiv = styled.div`
  display: flex;
  gap: 12px;
  position: relative;
  .avtar {
    position: absolute;
    top: 14px;
    z-index: 1;
  }
  .avtar-internal {
    position: absolute;
    top: 6px;
    z-index: 1;
  }
`;

const Message = styled.p`
  ${Typography.body_md_regular};
  color: var(--text);
  border-left: var(--border-main);
  padding-left: 22px;
  margin-left: -22px;
  span {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
  }
  svg {
    margin: 0 8px 3px;
  }
`;

const LineDiv = styled.div`
  border-left: var(--border-main);
  height: calc(100% - 22px);
  margin-left: 10px;
  position: absolute;
  top: 34px;
`;

const IconDiv = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 8px;
  .icon {
    background-color: var(
      ${({ modeSelectedItem }) =>
        modeSelectedItem?.name === 'Internal'
          ? '--bg-surface-secondary-hover'
          : '--bg-surface-secondary'}
    );
  }
`;

const CenterMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: calc(100% - 82px);
`;
export {
  Main,
  MainDiv,
  HeaderDiv,
  Title,
  TopDiv,
  BottomDiv,
  LeftDiv,
  StatusDiv,
  InputDiv,
  Input,
  InputIcon,
  CenterDiv,
  ActivityDiv,
  Message,
  LineDiv,
  IconDiv,
  ButtonDiv,
  CenterMainDiv,
};
