import styled from 'styled-components';
import { Typography } from '@/styles/typography';

const Main = styled.div`
  width: 100%;
  @media screen and (max-width: 449px) {
    margin-bottom: 20px;
  }
`;

const MainDiv = styled.div`
  padding-left: 22px;
  margin-left: 10px;
  position: relative;
  .emoji-icon {
    display: none;
  }
  &:hover {
    .emoji-icon {
      display: flex;
      @media screen and (max-width: 449px) {
        display: none;
      }
    }
  }
  @media screen and (max-width: 449px) {
    padding-left: unset;
    margin-left: unset;
  }
`;

const Div = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  div {
    font-size: 14px !important;
    font-family: unset !important;
    white-space: normal;
    p {
      br {
        display: none;
      }
      span {
        white-space: normal;
        color: var(--text);
      }
    }
    ul {
      margin-left: 0px;
    }
    ol {
      margin-left: 0px;
    }
  }
  .time {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
    white-space: nowrap;
    @media screen and (max-width: 449px) {
      display: none;
    }
  }
  .message {
    background-color: var(--bg-surface-secondary);
    padding: 6px 12px;
    border-radius: 8px;
    ${Typography.body_md_regular};
    cursor: pointer;
    color: var(--text);
    max-width: 536px;
    word-break: break-word;
    &.tiptap {
      max-height: unset;
    }
    @media screen and (max-width: 449px) {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
  @media screen and (max-width: 449px) {
    display: block;
  }
`;

const IconDiv = styled.div`
  width: 24px;
  height: 24px;
  box-shadow: var(--shadow-card);
  background-color: var(--bg-white);
  border-radius: 30px;
  position: absolute;
  bottom: -16px;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 35px;
  cursor: pointer;
  svg {
    fill: var(--icon);
  }
  &:hover {
    background-color: var(--bg-surface-hover);
    svg {
      fill: var(--icon-hover);
    }
  }
`;

const ReactionsMainDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 32px;
  padding-top: 6px;
  .submenu-upwards {
    bottom: calc(100% + 3px);
    top: auto;
    @media screen and (max-width: 449px) {
      margin-left: 4px;
    }
  }
  .submenu-downwards {
    bottom: auto;
    margin-top: 4px;
    @media screen and (max-width: 449px) {
      margin-left: 4px;
    }
  }
  @media screen and (max-width: 449px) {
    padding-left: unset;
    padding-top: 4px;
  }
`;

const ReactionCard = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: var(--bg-surface-secondary);
  padding: 2px 8px;
  border-radius: 30px;
  cursor: pointer;
  p {
    ${Typography.body_sm_regular};
    color: var(--text-text-secondary);
  }
  &:hover {
    background-color: var(--bg-surface-secondary-hover);
    p {
      color: var(--text);
    }
  }
`;

const Emoji = styled.div`
  ${Typography.body_md_regular};
`;

const AddReactionButton = styled.div`
  width: 24px;
  height: 24px;
  background-color: var(--bg-surface-secondary);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    fill: var(--icon);
  }
  &:hover {
    background-color: var(--bg-surface-secondary-hover);
    svg {
      fill: var(--icon-hover);
    }
  }
`;
const AttachmentMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  margin-bottom: 6px;
`;

const FileCardMainDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const EmojiPickerDiv = styled.div`
  .submenu-upwards {
    position: absolute;
    bottom: calc(100% + 33px);
    top: auto;
  }
  .responsive-upwards {
    @media screen and (max-width: 449px) {
      right: 0;
      bottom: calc(100% + 22px);
    }
  }
  .submenu-downwards {
    position: absolute;
    top: 100%;
    bottom: auto;
  }
  .responsive {
    @media screen and (max-width: 449px) {
      right: 0;
    }
  }
  .epr_-7mgpwf:hover {
    background-color: var(--bg-surface-hover);
  }
  .epr_1544oe:hover {
    background-position-y: unset;
  }
  .reaction-button-div {
    position: absolute;
    z-index: 11;
    margin-top: 4px;
    @media screen and (max-width: 449px) {
      margin-top: unset;
    }
  }
  .reaction-icon-div {
    position: absolute;
    z-index: 11;
    margin-top: 20px;
    margin-left: 12px;
    @media screen and (max-width: 449px) {
      margin-top: unset;
    }
  }
  .epr_-kg0voo {
    display: none;
  }
  .epr_rco1ad {
    display: none;
  }
  .epr_-bbny0t > button {
    display: none;
  }
  .epr_qyh4cg {
    display: none;
  }
  .epr-emoji-list {
    margin-left: unset;
    padding-left: unset;
  }
  .epr_-4ueg5a {
    width: 236px !important;
    height: 255px !important;
    box-shadow: var(--shadow-dropdown);
    border: none;
    border-radius: 12px;
  }
  .epr_-u8wwnq {
    height: 16px;
    min-height: unset;
  }
  .epr_xfdx0l {
    width: 16px;
    min-width: unset;
  }
  .epr_dkrjwv {
    padding: unset;
  }
  .epr_-tul3d0 {
    max-height: unset;
  }
  .epr_-a3ewa5 {
    max-width: unset;
  }
  .epr_-nv0gqw {
    height: 24px;
  }
  .epr_-5bhgbt {
    width: 24px;
  }
  .epr_llv3nn {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin: 0 8px;
    justify-content: flex-start;
  }
  .epr_-8ygbw8 {
    padding: unset;
    border-bottom: var(--border-main);
  }
  .epr_-6fvrrw {
    border-radius: 50%;
  }
  .epr_-8623pq {
    background-color: unset;
    border: none;
    height: 36px;
  }
  .epr_x558go:focus {
    border: none;
    background-color: unset;
  }
  .epr_jkst5z:focus {
    background-color: var(--bg-surface-hover);
    border-radius: 50%;
  }
  .epr_jkst5z:hover {
    background-color: var(--bg-surface-hover);
    border-radius: 50%;
  }
  .epr_gd8l4g {
    ${Typography.body_sm_medium};
    height: unset;
    padding: 4px 12px;
  }
`;

const NameMainDiv = styled.div`
  display: none;
  @media screen and (max-width: 449px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    p {
      ${Typography.body_md_regular};
      color: var(--text-text-secondary);
      white-space: nowrap;
      margin-bottom: unset !important;
    }
    .left-div {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .icon {
      fill: var(--icon);
    }
  }
`;

const Name = styled.h5`
  ${Typography.body_md_medium};
  color: var(--text);
`;

export {
  Main,
  MainDiv,
  Div,
  IconDiv,
  ReactionCard,
  ReactionsMainDiv,
  Emoji,
  AddReactionButton,
  AttachmentMainDiv,
  FileCardMainDiv,
  EmojiPickerDiv,
  NameMainDiv,
  Name,
};
