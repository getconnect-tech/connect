/* eslint-disable no-unused-vars */
'use client';
import React from 'react';
import { Errormessage, InputBox, InputDiv, Maindiv } from './style';
import SVGIcon from '@/assets/icons/SVGIcon';

interface Props {
  title?: string;
  placeholder: string;
  hasError?: boolean;
  error?: string;
  className?: string;
  login?: boolean;
  value?: any;
  type?: 'email' | 'password' | 'text' | 'number';
  // eslint-disable-next-line no-unused-vars
  onChange?: any;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  inputRef?: any;
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
