import React from 'react';
import { IconDiv } from './style';
import SVGIcon from '@/assets/icons/SVGIcon';

interface Props {
  onClick: () => void;
  iconName: string;
  iconSize: string;
  iconViewBox: string;
  size?: boolean;
  className?: string;
  isActive?: boolean;
}

function Icon({
  onClick,
  iconName,
  iconSize,
  iconViewBox,
  size,
  className,
  isActive = false,
}: Props) {
  return (
    <IconDiv
      onClick={onClick}
      size={size}
      className={className}
      isActive={isActive}
    >
      <SVGIcon
        name={iconName}
        width={iconSize}
        height={iconSize}
        viewBox={iconViewBox}
      />
    </IconDiv>
  );
}

export default Icon;
