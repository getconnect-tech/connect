import styled from 'styled-components';
import { Typography } from '@/styles/typography';

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
    }
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  p {
    cursor: pointer;
    background-color: var(--bg-surface-secondary);
    padding: 6px 12px;
    ${Typography.body_md_regular};
    color: var(--text);
    border-radius: 8px;
    word-wrap: break-word;
    max-width: 536px;
    div {
      white-space: normal;
      p {
        padding: 0;
        span {
          white-space: inherit;
          color: var(--text);
        }
        br {
          display: none;
        }
      }
    }
  }
  span {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
    white-space: nowrap;
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
  border-top: var(--border-main);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Title = styled.div`
  ${Typography.body_md_medium};
  color: var(--text);
`;

const DownloadButton = styled.div`
  ${Typography.body_md_medium};
  color: var(--text);
  cursor: pointer;
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
  .submenu-downwards {
    position: absolute;
    top: 100%;
    bottom: auto;
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
  }
  .reaction-icon-div {
    position: absolute;
    z-index: 11;
    margin-top: 20px;
    margin-left: 12px;
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

export {
  MainDiv,
  Div,
  IconDiv,
  ReactionCard,
  ReactionsMainDiv,
  Emoji,
  AddReactionButton,
  AttachmentMainDiv,
  TitleDiv,
  Title,
  DownloadButton,
  FileCardMainDiv,
  EmojiPickerDiv,
};
