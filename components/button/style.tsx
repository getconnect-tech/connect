/* eslint-disable indent */
import styled, { css, keyframes } from 'styled-components';
import { colors } from '@/styles/colors';
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
  background-color: ${colors.brand};
  border: 1px solid ${colors.brand};
  color: ${colors.text_white};
  white-space: nowrap;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${colors.brand_fill_hover};
  }
  ${(props) =>
    props.secondary &&
    css`
      background-color: transparent;
      color: ${colors.text};
      border: 1px solid ${colors.border_input_border};
      &:hover {
        background-color: ${colors.bg_surface_hover};
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
      color: ${colors.text_disabled};
      border: 1px solid ${colors.brand_disabled};
      background-color: ${props.secondary
        ? 'transparent'
        : props.isLoading
          ? colors.brand
          : colors.brand_disabled};
      &:hover {
        background-color: ${props.secondary
          ? 'transparent'
          : props.isLoading
            ? colors.brand
            : colors.brand_disabled};
      }
    `}
    ${(props) =>
    props.isLink &&
    css`
      background-color: transparent;
      padding: 4px;
      color: ${props.disabled ? colors.text_disabled : colors.text_link};
      border: none;
      svg {
        fill: ${props.disabled ? colors.text_disabled : colors.brand};
      }
      &:hover {
        color: ${props.disabled
          ? colors.text_disabled
          : colors.brand_fill_hover};
        background-color: transparent;
        svg {
          fill: ${props.disabled
            ? colors.text_disabled
            : colors.brand_fill_hover};
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
      background-color: ${colors.fill_danger};
      color: ${colors.text_white};
      border-color: ${colors.fill_danger};
      &:hover {
        background-color: ${colors.fill_danger};
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
          border: 2px solid ${colors.text_white};
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
