import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const SlashCommandDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  overflow: auto;
  padding: 4px;
  max-width: 170px;
  min-width: 160px;
  position: relative;
  background: var(--bg-white);
  border-radius: 8px;
  box-shadow: var(--shadow-card);
  border: unset;
  .suggestion {
    color: var(--text);
    font-size: 13px;
    line-height: 20px;
    font-weight: 400;
  }
`;

export const SlashCommandItem = styled.div`
  align-items: center;
  background-color: transparent;
  display: flex;
  gap: 8px;
  text-align: left;
  width: 100%;
  border-radius: 8px;
  border: none;
  padding: 4px 8px;
  ${Typography.body_md_regular};
  cursor: pointer;
  color: var(--text);
  svg {
    fill: var(--icon);
  }

  &:hover {
    background: var(--bg-white-hover);
    path {
      fill: var(--icon-hover);
    }
  }
  &.is-selected {
    background: var(--bg-white-hover);
  }
`;
