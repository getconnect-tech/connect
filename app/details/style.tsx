/* eslint-disable indent */
import styled, { css } from 'styled-components';
import { DropDownItem } from '@/components/dropDown/dropDown';
import { Typography } from '../../styles/typography';

interface Props {
  modeSelectedItem?: DropDownItem;
  isMargin?: boolean;
  isProfileSection?: boolean;
}

const Main = styled.div<Props>`
  display: flex;
  background-color: var(--bg-surface);
  height: ${({ isProfileSection }) => (isProfileSection ? '100%' : '100vh')};
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
  height: calc(100% - 114px);
  overflow: auto;
  scroll-padding-bottom: 15px;
  padding-bottom: 20px;
  @media screen and (max-width: 449px) {
    padding-bottom: unset;
  }
`;

const MainDiv = styled.div`
  width: 100%;
  margin-left: 223px;
  border-right: var(--border-main);
  @media screen and (max-width: 449px) {
    margin-left: unset;
  }
  @media screen and (max-width: 768px) {
    min-height: 100vh;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  padding: 7px 20px;
  .sidebar-icon {
    display: none;
  }
  @media screen and (max-width: 768px) {
    padding: 7px 16px;
    .sidebar-icon {
      display: flex;
      margin-right: 8px;
    }
  }
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

const StatusDiv = styled.div<Props>`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 9px 20px;
  border-top: var(--border-main);
  position: relative;
  @media screen and (max-width: 449px) {
    padding: 9px 16px;
    flex-direction: column;
    align-items: flex-start;
  }
  ${(props) =>
    props.isProfileSection &&
    css`
      display: none;
    `}
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
  @media screen and (max-width: 449px) {
    flex-wrap: wrap;
  }
`;

const InputDiv = styled.div`
  position: sticky;
  bottom: 0;
  background-color: var(--bg-surface);
  z-index: 11;
  max-width: 702px;
  margin: 0 auto;
  padding: 0 0 12px;
  width: 100%;
  .input-main-div {
    display: flex;
    gap: 12px;
  }
  .line {
    height: 20px;
    border-left: var(--border-main);
    margin-left: 10px;
    margin-top: -8px;
    @media screen and (max-width: 449px) {
      display: none;
    }
  }
  .avtar {
    position: absolute;
    top: 12px;
    z-index: 1;
    @media screen and (max-width: 449px) {
      display: none;
    }
  }
`;

const Input = styled.div<Props>`
  background-color: var(
    ${({ modeSelectedItem }) =>
      modeSelectedItem?.name === 'Internal' ? '--brand-disabled' : '--bg-white'}
  );
  border-radius: 12px;
  width: 100%;
  padding: 6px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: var(--shadow-card);
  margin-left: 10px;
  .prosemirror-commentbox {
    max-height: 300px;
    overflow: auto;
  }
  .loading-text {
    ${Typography.body_sm_regular};
    margin-bottom: 10px;
  }
  .attach-file-div {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 8px;
  }
  @media screen and (max-width: 449px) {
    margin-left: unset;
  }
`;

const CenterDiv = styled.div`
  padding: 20px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 20px;
  position: relative;
  @media screen and (max-width: 449px) {
    gap: 0;
  }
`;

const InputIcon = styled.div<Props>`
  display: flex;
  justify-content: space-between;
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
  .send-icon {
    background-color: var(--bg-surface-secondary);
    border-radius: 50%;
    &:hover {
      background-color: var(--bg-surface-secondary-hover);
    }
  }
  .submenu-upwards {
    bottom: 52px;
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
    z-index: 111;
    @media screen and (max-width: 449px) {
      display: none;
    }
  }
  .avtar-internal {
    position: absolute;
    top: 6px;
    z-index: 111;
    @media screen and (max-width: 449px) {
      display: none;
    }
  }
  .avtar-activity {
    z-index: 111;
    @media screen and (max-width: 449px) {
      margin-left: 12px;
      z-index: 1;
    }
  }
`;

const Message = styled.p<{ hideAvatarLine?: boolean }>`
  ${Typography.body_md_regular};
  color: var(--text);
  padding-left: 22px;
  margin-left: -22px;
  span {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
  }
  svg {
    margin: 0 8px 3px;
  }
  @media screen and (max-width: 449px) {
    padding-left: 18px;
    ${(props) =>
      !props.hideAvatarLine &&
      css`
        border-left: var(--border-main);
      `}
    ${(props) =>
      props.hideAvatarLine &&
      css`
        margin-bottom: 20px;
      `}
  }
`;

const LineDiv = styled.div`
  border-left: var(--border-main);
  height: calc(100% - 22px);
  margin-left: 10px;
  position: absolute;
  top: 34px;
  @media screen and (max-width: 449px) {
    margin-left: 22px;
    height: 20px;
    position: relative;
    top: unset;
  }
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
  padding: 0 16px;
  height: calc(100% - 82px);
  background-color: var(--bg-surface);
  @media screen and (max-width: 449px) {
    height: calc(100% - 117px);
  }
`;

const CrossIcon = styled.div`
  position: absolute;
  cursor: pointer;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 6px;
  right: 8px;
  border-radius: 50%;
  &:hover {
    background-color: var(--bg-surface-secondary);
  }
`;

const SignatureMainDiv = styled.div`
  border-radius: 6px;
  margin: 0 -8px 12px;
  position: relative;
  &:hover {
    background-color: var(--bg-white-hover);
  }
`;

const SignatureText = styled.p`
  ${Typography.body_sm_regular}
  color: var(--text);
  a {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const SignatureInnerDiv = styled.div`
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  SignatureMainDiv,
  SignatureText,
  SignatureInnerDiv,
  CrossIcon,
};
