import React from "react";
import { Buttons, ButtonWrap } from "./style";
import SVGIcon from "@/assets/icons/SVGIcon";
import { colors } from "@/styles/colors";

interface Props {
  title?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "reset" | "submit" | "button";
  secondary?: boolean;
  iconSize?: string;
  iconName?: string;
  isDelete?: boolean;
  width?: boolean;
  iconColor?: string;
  iconViewBox?: string;
  className?: string;
  isLink?: boolean;
}

const Button: React.FC<Props> = (Props) => {
  const {
    title,
    disabled,
    type,
    onClick,
    secondary = false,
    iconSize,
    iconName,
    isLoading,
    isDelete = false,
    width,
    iconColor,
    iconViewBox,
    className,
    isLink,
    ...props
  } = Props;
  return (
    <ButtonWrap isLoading={isLoading} width={width} isDelete={isDelete}>
      <Buttons
        onClick={onClick}
        secondary={secondary}
        isDelete={isDelete}
        disabled={disabled || isLoading}
        isLoading={isLoading}
        type={type}
        className={className}
        width={width}
        isLink={isLink}
        {...props}
      >
        {iconName && (
          <SVGIcon
            name={iconName}
            height={iconSize}
            width={iconSize}
            viewBox={iconViewBox}
          />
        )}
        {title || ""}
      </Buttons>
    </ButtonWrap>
  );
};

export default Button;
