"use client";
import SVGIcon from "@/assets/icons/SVGIcon";
import {
  Errormessage,
  InputBox,
  InputDiv,
  Maindiv,
} from "./style";
import { ChangeEvent } from "react";
interface Props {
  title?: string;
  placeholder: string;
  hasError?: boolean;
  error?: string;
  className?: string;
  login?: boolean;
  value?: string;
  type?: "email" | "password" | "text" | "number";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  inputRef?: any;
  autoFocus?: boolean;
  iconName?: string;
  iconSize?: string;
  iconViewBox?: string;
  isIcon?: boolean;
}
const Input: React.FC<Props> = (Props) => {
  const {
    title,
    placeholder,
    hasError,
    error,
    className,
    type,
    onChange,
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
  } = Props;

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
            name="error-icon"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          />
          <p>{error}</p>
        </Errormessage>
      )}
    </Maindiv>
  );
};
export default Input;
