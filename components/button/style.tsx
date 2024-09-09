/* eslint-disable indent */
import styled, { css, keyframes } from 'styled-components';
import { Typography } from '@/styles/typography';

interface WrapButton {
  secondary: boolean;
  isDelete: boolean;
  isLoading?: boolean;
  width?: boolean;
  isLink?: boolean;
  variant?: 'large' | 'medium' | 'small';
}

interface Prop {
  isLoading?: boolean;
  isDelete?: boolean;
  width?: boolean;
}

const Buttons = styled.button<WrapButton>`
  display: flex;
  gap: 8px;
  justify-content: center;
  ${Typography.body_md_medium}
  padding: 8px 16px;
  border-radius: 20px;
  background-color: var(--brand);
  border: var(--border-primary);
  color: var(--text-white);
  white-space: nowrap;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--brand-fill-hover);
  }
  ${(props) =>
    props.secondary &&
    css`
      background-color: transparent;
      color: var(--text);
      border: var(--border-secondary);
      &:hover {
        background-color: var(--bg-surface-hover);
      }
    `}
  ${(props) =>
    props.width &&
    css`
      width: 100%;
    `}
  ${(props) =>
    props.disabled &&
    css`
      color: var(--text-disabled);
      border: var(--border-disabled);
      background-color: var(
        ${props.secondary
          ? 'transparent'
          : props.isLoading
            ? '--brand'
            : '--brand-disabled'}
      );
      &:hover {
        background-color: var(
          ${props.secondary
            ? 'transparent'
            : props.isLoading
              ? '--brand'
              : '--brand-disabled'}
        );
      }
    `}
    ${(props) =>
    props.isLink &&
    css`
      background-color: transparent;
      padding: 4px;
      color: var(${props.disabled ? '--text-disabled' : '--text-link'});
      border: none;
      svg {
        fill: var(${props.disabled ? '--text-disabled' : '--text-link'});
      }
      &:hover {
        color: var(
          ${props.disabled ? '--text-disabled' : '--brand-fill-hover'}
        );
        background-color: transparent;
        svg {
          fill: var(
            ${props.disabled ? '--text-disabled' : '--brand-fill-hover'}
          );
        }
      }
    `}
    ${(props) =>
    props.variant === 'large' &&
    css`
      ${Typography.body_md_medium}
    `}
    ${(props) =>
    props.variant === 'medium' &&
    css`
      ${Typography.body_sm_medium}
    `}
    ${(props) =>
    props.isDelete &&
    css`
      background-color: var(--fill-danger);
      color: var(--text-white);
      border: var(--border-danger);
      &:hover {
        background-color: var(--fill-danger);
      }
    `}
`;

const ButtonWrap = styled.div<Prop>`
  position: relative;
  display: inline-block;
  ${(props) =>
    props.isLoading &&
    css`
      ${Buttons} {
        color: transparent;
        &::before {
          position: absolute;
          transform: translate(-50%, -50%);
          content: '';
          width: 20px;
          height: 20px;
          border: var(--border-loading);
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: ${spin} 1s linear infinite;
          z-index: 1;
        }
      }
    `}
  ${(props) =>
    props.width &&
    css`
      width: 100%;
    `}
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export { Buttons, ButtonWrap, spin };
