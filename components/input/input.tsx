/* eslint-disable no-unused-vars */
'use client';
import React from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import { Errormessage, InputBox, InputDiv, Maindiv } from './style';

interface Props {
  title?: string;
  placeholder: string;
  hasError?: boolean;
  error?: string;
  className?: string;
  login?: boolean;
  value?: string | number;
  type?: 'email' | 'password' | 'text' | 'number';
  variant?: 'large' | 'medium' | 'small';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  inputRef?: React.RefObject<HTMLInputElement>;
  autoFocus?: boolean;
  iconName?: string;
  iconSize?: string;
  iconViewBox?: string;
  isIcon?: boolean;
}

const Input: React.FC<Props> = ({
  placeholder,
  hasError,
  error,
  className,
  type,
  onChange,
  onKeyPress,
  value,
  disabled,
  style,
  inputRef,
  autoFocus,
  iconName,
  iconSize,
  iconViewBox,
  isIcon,
  variant,
  ...props
}) => {
  return (
    <Maindiv>
      <InputDiv>
        {isIcon && (
          <SVGIcon
            name={iconName}
            width={iconSize}
            height={iconSize}
            viewBox={iconViewBox}
          />
        )}
        <InputBox
          ref={inputRef}
          placeholder={placeholder}
          hasError={hasError}
          className={className}
          onChange={onChange}
          onKeyPress={onKeyPress}
          disabled={disabled}
          type={type}
          value={value}
          style={style}
          autoFocus={autoFocus}
          isIcon={isIcon}
          variant={variant}
          {...props}
        />
      </InputDiv>
      {hasError && (
        <Errormessage>
          <SVGIcon
            name='error-icon'
            width='14'
            height='14'
            viewBox='0 0 14 14'
          />
          <p>{error}</p>
        </Errormessage>
      )}
    </Maindiv>
  );
};

export default Input;
